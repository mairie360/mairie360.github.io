"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Arrow } from "./icons";
import { contactAddress, sendContact, validateContact, type ContactErrors } from "@/lib/contact";
import styles from "./contact-form.module.css";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const router = useRouter();
  const submitting = useRef(false);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    setStatus("idle");
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      trackEvent("Contact erreur", { etape: "validation" });
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    if (data.get("_honey")) {
      setStatus("error");
      return;
    }
    submitting.current = true;
    setStatus("sending");
    trackEvent("Contact tentative");
    try {
      await sendContact(fields);
      trackEvent("Contact envoye");
      router.push("/merci/");
    } catch {
      // Keep the visitor's message available to retry or copy into an email.
      submitting.current = false;
      setStatus("error");
      trackEvent("Contact erreur", { etape: "envoi" });
    }
  }

  return (
    <section className={`${styles.contact} container`} id="contact" aria-labelledby="contact-title">
      <div className={styles.intro}>
        <p className="section-label">Échangeons</p>
        <h2 id="contact-title">Parlons des besoins<br />de votre mairie.</h2>
        <p>Pour une démonstration ou la bêta gratuite, indiquez dans votre message votre mairie, votre fonction et vos disponibilités. Vous pouvez aussi poser une question à l’équipe.</p>
        <a className="text-link" href={`mailto:${contactAddress}`}>{contactAddress} <Arrow diagonal /></a>
      </div>
      <form className={styles.form} method="post" onSubmit={submit} noValidate aria-busy={status === "sending"}
        onInput={(event) => {
          const field = event.target;
          if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) &&
            ["name", "email", "message"].includes(field.name) && field.value.trim() && !started.current) {
            started.current = true;
            trackEvent("Contact commence");
          }
        }}>
        <p className={styles.hint}>Tous les champs sont obligatoires.</p>
        <fieldset disabled={!ready || status === "sending"}>
          <legend className="sr-only">Votre message à l’équipe Mairie360</legend>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="contact-name">Votre nom</label>
              <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100}
                aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {errors.name && <p className={styles.fieldError} id="contact-name-error">{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-email">Votre e-mail</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254}
                aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
              {errors.email && <p className={styles.fieldError} id="contact-email-error">{errors.email}</p>}
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-message">Votre message</label>
            <textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={5000}
              aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"} />
            <p className={styles.hint} id="contact-message-hint">Entre 10 et 5 000 caractères.</p>
            {errors.message && <p className={styles.fieldError} id="contact-message-error">{errors.message}</p>}
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="contact-website">Laisser ce champ vide</label>
            <input id="contact-website" name="_honey" tabIndex={-1} autoComplete="off" />
          </div>
          <p className={styles.privacy}>Vos informations servent à vous répondre. L’envoi est assuré par FormSubmit. <Link href="/confidentialite/">En savoir plus sur vos données</Link>.</p>
          <button className="button button-primary" type="submit">
            {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
            {status === "sending" ? <span className={styles.spinner} aria-hidden="true" /> : <Arrow />}
          </button>
        </fieldset>
        <p className="sr-only" role="status">{status === "sending" ? "Envoi de votre message en cours." : ""}</p>
        {status === "error" && <p className={styles.submitError} role="alert">L’envoi n’a pas pu être confirmé. Votre message est conservé dans le formulaire. Réessayez dans un instant ou écrivez directement à <a href={`mailto:${contactAddress}`}>{contactAddress}</a>.</p>}
        <noscript><p className={styles.submitError}>Pour utiliser le formulaire, activez JavaScript ou écrivez directement à <a href={`mailto:${contactAddress}`}>{contactAddress}</a>.</p></noscript>
      </form>
    </section>
  );
}
