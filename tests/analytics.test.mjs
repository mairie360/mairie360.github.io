import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

const filename = fileURLToPath(new URL("../src/lib/analytics.ts", import.meta.url));
const loaded = new Module(filename);
loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { getAnalyticsScriptUrl, trackEvent } = loaded.exports;

test("only a configured HTTPS Plausible site script can activate collection", () => {
  assert.equal(getAnalyticsScriptUrl("https://plausible.io/js/pa-Test_123.js"), "https://plausible.io/js/pa-Test_123.js");
  for (const value of [undefined, "", "http://plausible.io/js/pa-test.js", "https://other.example/js/pa-test.js",
    "javascript:alert(1)", "https://plausible.io/js/pa-test.js?email=private@example.com"]) {
    assert.equal(getAnalyticsScriptUrl(value), null);
  }
});

test("audience events cannot transmit arbitrary properties or field contents", (context) => {
  const received = [];
  context.after(() => { delete globalThis.window; });
  globalThis.window = { plausible: (...args) => received.push(args) };
  trackEvent("CTA contact", { origine: "offre", intention: "beta", email: "private@example.com", message: "Private content" });
  trackEvent("Contact erreur", { etape: "validation", message: "Private content" });
  trackEvent("Contact envoye", { email: "private@example.com" });
  trackEvent("Contact commence", { origine: "private@example.com" });
  trackEvent("Private event name", { email: "private@example.com" });
  assert.deepEqual(received, [
    ["CTA contact", { props: { origine: "offre", intention: "beta" } }],
    ["Contact erreur", { props: { etape: "validation" } }],
    ["Contact envoye"],
    ["Contact commence"],
  ]);
});

test("missing or broken analytics cannot interrupt the contact flow", (context) => {
  context.after(() => { delete globalThis.window; });
  assert.doesNotThrow(() => trackEvent("Contact envoye"));
  globalThis.window = {};
  assert.doesNotThrow(() => trackEvent("Contact envoye"));
  globalThis.window.plausible = () => { throw new Error("blocked script"); };
  assert.doesNotThrow(() => trackEvent("Contact envoye"));
});
