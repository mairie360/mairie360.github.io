import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

function loadAnalytics() {
  const filename = fileURLToPath(new URL("../src/lib/analytics.ts", import.meta.url));
  const loaded = new Module(filename);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return loaded.exports;
}

function browser(context) {
  const storage = new Map();
  const scripts = [];
  const cookies = new Map([["_ga", "old"], ["_ga_TEST123456", "old"], ["essential", "keep"]]);
  const events = new EventTarget();
  globalThis.window = {
    location: new URL("https://mairie360.fr/?email=private@example.com&utm_source=linkedin&utm_medium=social&utm_campaign=beta_2026#contact"),
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
  globalThis.document = {
    title: "Mairie360", referrer: "https://example.org/people?email=private@example.com",
    getElementById: id => scripts.find(script => script.id === id) ?? null,
    createElement: () => ({}), head: { appendChild: script => scripts.push(script) },
    get cookie() { return [...cookies].map(([name, value]) => `${name}=${value}`).join("; "); },
    set cookie(value) {
      const [pair] = value.split(";"); const [name, content] = pair.split("=");
      if (/max-age=0/i.test(value)) cookies.delete(name); else cookies.set(name, content);
    },
  };
  context.after(() => { delete globalThis.window; delete globalThis.document; });
  return { api: loadAnalytics(), storage, scripts, cookies };
}
const id = "G-TEST123456";

test("missing, malformed and Tag Manager IDs cannot configure Analytics", () => {
  const { getAnalyticsMeasurementId } = loadAnalytics();
  assert.equal(typeof getAnalyticsMeasurementId, "function");
  assert.equal(getAnalyticsMeasurementId(id), id);
  for (const value of [undefined, "", "GTM-PP7NJBJV", "UA-12345", "G-abc123", "G-TEST123456?email=private@example.com", "<script>"]) {
    assert.equal(getAnalyticsMeasurementId(value), null);
  }
});

test("no tag or interaction is queued before consent or after refusal", context => {
  const { api, scripts } = browser(context);
  assert.equal(typeof api.startAnalytics, "function");
  assert.equal(api.startAnalytics(id), false);
  assert.equal(api.trackEvent("Contact envoye"), false);
  api.setAnalyticsConsent("rejected");
  assert.equal(api.startAnalytics(id), false);
  assert.equal(api.trackEvent("Contact tentative"), false);
  assert.equal(scripts.length, 0);
  assert.equal(window.dataLayer, undefined);
});

test("acceptance loads one tag, keeps advertising denied and avoids automatic page views", context => {
  const { api, scripts } = browser(context);
  assert.equal(typeof api.setAnalyticsConsent, "function");
  api.setAnalyticsConsent("accepted");
  assert.equal(api.startAnalytics("GTM-PP7NJBJV"), false);
  assert.equal(api.startAnalytics(id), true); assert.equal(api.startAnalytics(id), true);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123456");
  // Google's tag distinguishes its command envelope from a dataLayer array-method call.
  assert.equal(Object.prototype.toString.call(window.dataLayer[0]), "[object Arguments]");
  const config = window.dataLayer.find(entry => entry[0] === "config");
  assert.equal(config[2].send_page_view, false);
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(config[2].allow_ad_personalization_signals, false);
  assert.equal(config[2].page_location, "https://mairie360.fr/");
  assert.equal(config[2].page_referrer, "https://example.org");
  assert.equal(config[2].campaign_source, "linkedin");
  const consent = window.dataLayer.find(entry => entry[0] === "consent" && entry[1] === "update");
  assert.equal(consent[2].analytics_storage, "granted");
  for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(consent[2][key], "denied");
});

test("only known funnel events and allowed categories reach the GA4 boundary", context => {
  const { api } = browser(context);
  assert.equal(typeof api.setAnalyticsConsent, "function");
  api.setAnalyticsConsent("accepted"); api.startAnalytics(id); window.dataLayer.length = 0;
  api.trackEvent("CTA contact", { origine: "offre", intention: "beta", email: "private@example.com" });
  api.trackEvent("Contact envoye", { message: "Private content" });
  api.trackEvent("Private event name", { email: "private@example.com" });
  assert.deepEqual(window.dataLayer.map(entry => entry[1]), ["contact_cta", "generate_lead"]);
  assert.equal(window.dataLayer[0][2].origine, "offre");
  assert.equal(window.dataLayer[0][2].intention, "beta");
  assert.equal(window.dataLayer[1][2].send_to, id);
  assert.doesNotMatch(JSON.stringify(window.dataLayer), /private@|Private content|email=/);
});

test("optimized destination initialization cannot add an automatic page view", context => {
  const { api } = browser(context);
  const automaticViews = [];
  let defaults;
  document.head.appendChild = () => {
    // Optimized Google containers initialize before applying per-stream config.
    defaults = Object.assign({}, ...window.dataLayer
      .filter(entry => entry[0] === "set").map(entry => entry[1]));
    if (defaults.send_page_view !== false) automaticViews.push("page_view");
  };
  api.setAnalyticsConsent("accepted");
  api.startAnalytics(id);
  api.trackPageView("/");
  const explicitViews = window.dataLayer.filter(entry => entry[0] === "event" && entry[1] === "page_view");
  assert.equal(automaticViews.length + explicitViews.length, 1);
  assert.equal(defaults.cookie_expires, 180 * 86400);
  assert.equal(defaults.allow_google_signals, false);
  assert.equal(defaults.allow_ad_personalization_signals, false);
  assert.equal(defaults.page_location, "https://mairie360.fr/");
  assert.equal(defaults.page_referrer, "https://example.org");
  assert.doesNotMatch(JSON.stringify(defaults), /private@|email=/);
});

test("a page is counted once per route and direct thank-you visits never generate leads", context => {
  const { api } = browser(context);
  assert.equal(typeof api.trackPageView, "function");
  api.setAnalyticsConsent("accepted"); api.startAnalytics(id); window.dataLayer.length = 0;
  assert.equal(api.trackPageView("/"), true); assert.equal(api.trackPageView("/"), false);
  window.location = new URL("https://mairie360.fr/merci/?email=private@example.com");
  assert.equal(api.trackPageView("/merci/"), true);
  assert.deepEqual(window.dataLayer.map(entry => entry[1]), ["page_view", "page_view"]);
  assert.doesNotMatch(JSON.stringify(window.dataLayer), /generate_lead|private@/);
});

test("revocation disables the loaded tracker, removes Analytics cookies and stops events", context => {
  const { api, cookies } = browser(context);
  assert.equal(typeof api.setAnalyticsConsent, "function");
  api.setAnalyticsConsent("accepted"); api.startAnalytics(id); api.trackEvent("Contact tentative");
  api.setAnalyticsConsent("rejected");
  assert.equal(window["ga-disable-G-TEST123456"], true);
  const before = window.dataLayer.length;
  assert.equal(api.trackEvent("Contact envoye"), false); assert.equal(window.dataLayer.length, before);
  assert.equal(cookies.has("_ga"), false); assert.equal(cookies.has("_ga_TEST123456"), false);
  assert.equal(cookies.get("essential"), "keep");
});

test("expired or malformed stored choices require a new decision", context => {
  const { api, storage } = browser(context);
  assert.equal(typeof api.getAnalyticsConsent, "function");
  api.setAnalyticsConsent("accepted"); assert.equal(api.getAnalyticsConsent(), "accepted");
  assert.equal(api.getAnalyticsConsent(Date.now() + 181 * 86400000), null);
  const key = [...storage.keys()][0];
  storage.set(key, '{"choice":"accepted","at":null}'); assert.equal(api.getAnalyticsConsent(), null);
  storage.set(key, '{broken'); assert.equal(api.getAnalyticsConsent(), null);
});

test("blocked storage and blocked analytics do not break the visitor's actions", context => {
  const { api } = browser(context);
  assert.equal(typeof api.getAnalyticsConsent, "function");
  window.localStorage = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); } };
  assert.equal(api.getAnalyticsConsent(), null);
  assert.doesNotThrow(() => api.setAnalyticsConsent("accepted"));
  assert.equal(api.getAnalyticsConsent(), "accepted"); api.startAnalytics(id);
  window.gtag = () => { throw Error("blocked"); };
  assert.doesNotThrow(() => api.trackEvent("Contact envoye")); assert.equal(api.trackEvent("Contact envoye"), false);
});

test("a refusal overrides a readable old acceptance when saving the new choice fails", context => {
  const { api } = browser(context);
  api.setAnalyticsConsent("accepted"); api.startAnalytics(id);
  window.localStorage.setItem = () => { throw Error("quota"); };
  api.setAnalyticsConsent("rejected");
  assert.equal(api.getAnalyticsConsent(), "rejected");
  assert.equal(api.startAnalytics(id), false);
  assert.equal(api.trackEvent("Contact envoye"), false);
});
