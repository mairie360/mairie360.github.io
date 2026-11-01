export const contactAddress = "mairie360@gmail.com";
export const contactEndpoint = `https://formsubmit.co/ajax/${contactAddress}`;

export type ContactFields = { name: string; town: string; email: string; need: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2 || fields.name.trim().length > 100) {
    errors.name = "Indiquez votre nom et prénom (entre 2 et 100 caractères).";
  }
  if (fields.town.trim().length < 2 || fields.town.trim().length > 100) {
    errors.town = "Indiquez le nom de votre commune.";
  }
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Indiquez une adresse e-mail valide pour recevoir notre réponse.";
  }
  if (fields.need.trim().length > 5000) {
    errors.need = "Votre besoin doit contenir au plus 5 000 caractères.";
  }
  return errors;
}

export async function sendContact(fields: ContactFields, transport: typeof fetch = fetch): Promise<void> {
  if (Object.keys(validateContact(fields)).length) throw new Error("invalid-fields");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await transport(contactEndpoint, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "origin",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        name: fields.name.trim(),
        commune: fields.town.trim(),
        email: fields.email.trim(),
        besoin: fields.need.trim() || "Non précisé",
        _subject: "Mairie360 — Demande de démonstration",
        _template: "table",
        _url: "https://mairie360.fr/",
      }),
    });
    if (!response.ok) throw new Error("delivery-unconfirmed");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("success" in result) ||
      (result.success !== true && result.success !== "true")) {
      throw new Error("delivery-unconfirmed");
    }
  } finally {
    clearTimeout(timeout);
  }
}
