type Plausible = (event: string, options?: { props: Record<string, string> }) => void;

declare global {
  interface Window { plausible?: Plausible }
}

const eventProperties: Record<string, Record<string, readonly string[]>> = {
  "Offre vue": {},
  "CTA contact": { origine: ["hero", "offre", "mobile"], intention: ["beta", "demo"] },
  "Contact vu": {},
  "Contact commence": {},
  "Contact tentative": {},
  "Contact erreur": { etape: ["validation", "envoi"] },
  "Contact envoye": {},
};

export function getAnalyticsScriptUrl(value = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.origin === "https://plausible.io" && !url.username && !url.password && !url.search && !url.hash &&
      /^\/js\/pa-[\w-]+\.js$/.test(url.pathname) ? url.href : null;
  } catch { return null; }
}

export function trackEvent(event: string, properties: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function" ||
    !Object.hasOwn(eventProperties, event)) return;
  try {
    const props: Record<string, string> = {};
    for (const [key, allowed] of Object.entries(eventProperties[event])) {
      const value = properties[key];
      if (typeof value === "string" && allowed.includes(value)) props[key] = value;
    }
    if (Object.keys(props).length) window.plausible(event, { props });
    else window.plausible(event);
  } catch {
    // Audience collection must never interrupt a visitor's action.
  }
}
