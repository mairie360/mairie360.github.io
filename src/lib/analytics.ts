export type AnalyticsConsent = "accepted" | "rejected";
type ConsentRecord = { choice: AnalyticsConsent; at: number };
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: (IArguments | unknown[])[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export const analyticsConsentKey = "mairie360.analytics-consent.v1";
export const analyticsConsentEvent = "mairie360:analytics-consent";
export const analyticsPreferencesEvent = "mairie360:analytics-preferences";
const consentLifetime = 180 * 86400000;
let transientConsent: ConsentRecord | null = null;
let activeId: string | null = null;
let lastPage: string | null = null;

const events: Record<string, { name: string; properties?: Record<string, readonly string[]> }> = {
  "Offre vue": { name: "offer_view" },
  "CTA contact": { name: "contact_cta", properties: { origine: ["bandeau", "hero", "offre"], intention: ["demo", "beta"] } },
  "Contact vu": { name: "contact_view" },
  "Contact commence": { name: "contact_start" },
  "Contact tentative": { name: "contact_attempt" },
  "Contact erreur": { name: "contact_error", properties: { etape: ["validation", "envoi"] } },
  "Contact envoye": { name: "generate_lead" },
};
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

export function getAnalyticsMeasurementId(value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID): string | null {
  return typeof value === "string" && /^G-[A-Z0-9]{4,20}$/.test(value) ? value : null;
}

export function getAnalyticsConsent(now = Date.now()): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    let record: ConsentRecord | null;
    try {
      const raw = window.localStorage.getItem(analyticsConsentKey);
      record = transientConsent ?? (raw ? JSON.parse(raw) : null);
    } catch { record = transientConsent; }
    return record && ["accepted", "rejected"].includes(record.choice) &&
      typeof record.at === "number" && Number.isFinite(record.at) && record.at <= now &&
      now - record.at < consentLifetime ? record.choice : null;
  } catch { return null; }
}

export function setAnalyticsConsent(choice: AnalyticsConsent): void {
  if (typeof window === "undefined" || !["accepted", "rejected"].includes(choice)) return;
  const record = { choice, at: Date.now() };
  try { window.localStorage.setItem(analyticsConsentKey, JSON.stringify(record)); transientConsent = null; }
  catch { transientConsent = record; }
  if (choice === "rejected") stopAnalytics();
  window.dispatchEvent(new Event(analyticsConsentEvent));
}

export function subscribeAnalyticsConsent(notify: () => void): () => void {
  const changed = () => {
    if (getAnalyticsConsent() !== "accepted") stopAnalytics();
    notify();
  };
  window.addEventListener(analyticsConsentEvent, changed);
  window.addEventListener("storage", changed);
  window.addEventListener("focus", changed);
  return () => {
    window.removeEventListener(analyticsConsentEvent, changed);
    window.removeEventListener("storage", changed);
    window.removeEventListener("focus", changed);
  };
}

function pageContext(): Record<string, string> {
  const current = new URL(window.location.href);
  const known = ["/", "/confidentialite/", "/conditions-utilisation/", "/merci/", "/404", "/404.html"];
  const context: Record<string, string> = {
    page_location: current.origin + (known.includes(current.pathname) ? current.pathname : "/404"),
    page_title: document.title,
    page_referrer: "",
  };
  try { context.page_referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
  for (const [query, name] of [["utm_source", "campaign_source"], ["utm_medium", "campaign_medium"], ["utm_campaign", "campaign_name"]]) {
    const value = current.searchParams.get(query);
    if (value && /^[a-z0-9_-]{1,64}$/i.test(value)) context[name] = value;
  }
  return context;
}

export function startAnalytics(measurementId: string | null): boolean {
  const id = getAnalyticsMeasurementId(measurementId ?? "");
  if (!id || typeof window === "undefined" || typeof document === "undefined" || getAnalyticsConsent() !== "accepted") return false;
  if (activeId === id && window[`ga-disable-${id}`] === false) return true;
  try {
    activeId = id;
    window[`ga-disable-${id}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      // The Google tag distinguishes its command envelope from an array-method call.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", denied);
    window.gtag("consent", "update", { ...denied, analytics_storage: "granted" });
    const settings = {
      ...pageContext(), send_page_view: false,
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: consentLifetime / 1000, cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure",
    };
    // Optimized containers can initialize destinations before per-stream config.
    window.gtag("set", settings);
    window.gtag("js", new Date());
    window.gtag("config", id, settings);
    if (!document.getElementById("mairie-ga4")) {
      const script = document.createElement("script");
      script.id = "mairie-ga4"; script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
    return true;
  } catch { stopAnalytics(); return false; }
}

export function stopAnalytics(): void {
  if (typeof window === "undefined" || !activeId) return;
  window[`ga-disable-${activeId}`] = true;
  // Drop commands awaiting a blocked or slow tag, including previously queued leads.
  if (window.dataLayer) window.dataLayer.length = 0;
  try { window.gtag?.("consent", "update", denied); } catch { /* Tracking is optional. */ }
  try {
    const host = window.location.hostname.split(".");
    const domains = ["", ...host.map((_, index) => host.slice(index).join(".")).filter(value => value.includes("."))];
    for (const pair of document.cookie.split(";")) {
      const name = pair.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
        if (domain) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${domain}; SameSite=Lax`;
      }
    }
  } catch { /* Restricted storage must not block navigation. */ }
}

function sendEvent(name: string, properties: Record<string, string> = {}): boolean {
  if (typeof window === "undefined" || !activeId || window[`ga-disable-${activeId}`] ||
    getAnalyticsConsent() !== "accepted" || typeof window.gtag !== "function") return false;
  try {
    window.gtag("event", name, { ...pageContext(), ...properties, send_to: activeId });
    return true;
  } catch { return false; }
}

export function trackEvent(event: string, properties: Record<string, unknown> = {}): boolean {
  if (!Object.hasOwn(events, event)) return false;
  const spec = events[event];
  const safe: Record<string, string> = {};
  for (const [key, allowed] of Object.entries(spec.properties ?? {})) {
    const value = properties[key];
    if (typeof value === "string" && allowed.includes(value)) safe[key] = value;
  }
  return sendEvent(spec.name, safe);
}

export function trackPageView(pathname: string): boolean {
  if (pathname === lastPage) return false;
  if (!sendEvent("page_view")) return false;
  lastPage = pathname;
  return true;
}
