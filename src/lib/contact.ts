export const contactAddress = "mairie360@gmail.com";
export const contactEndpoint = `https://formsubmit.co/ajax/${contactAddress}`;

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2 || fields.name.trim().length > 100) {
    errors.name = "Indiquez votre nom (entre 2 et 100 caractères).";
  }
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Indiquez une adresse e-mail valide pour recevoir notre réponse.";
  }
  if (fields.message.trim().length < 10 || fields.message.trim().length > 5000) {
    errors.message = "Votre message doit contenir entre 10 et 5 000 caractères.";
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
        email: fields.email.trim(),
        message: fields.message.trim(),
        _subject: "Mairie360 — Nouveau message du site",
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
