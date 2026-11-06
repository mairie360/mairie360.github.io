"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CodeIcon, FieldIcon, MailIcon, type FieldIconName } from "./icons";
import { contactAddress, sendContact, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";
import { copyText } from "@/lib/copy-text";
import { socialLinks } from "@/lib/showcase-data";
import styles from "./contact-form.module.css";
import { trackEvent } from "@/lib/analytics";

const fields: {
  name: keyof ContactFields;
  label: string;
  icon?: FieldIconName;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  maxLength: number;
  multiline?: boolean;
  full?: boolean;
}[] = [
  { name: "name", label: "Nom et prénom", icon: "user", placeholder: "Camille Martin", autoComplete: "name", maxLength: 100 },
  { name: "town", label: "Commune", icon: "home", placeholder: "Votre commune", autoComplete: "address-level2", maxLength: 100 },
  { name: "email", label: "E-mail professionnel", icon: "mail", placeholder: "prenom.nom@commune.fr", type: "email", autoComplete: "email", maxLength: 254, full: true },
  { name: "need", label: "Votre besoin", placeholder: "Ex. : simplifier la réservation des salles, mieux suivre nos projets…", maxLength: 5000, multiline: true, full: true },
];

/** How long the "Adresse copiée" toast stays on screen (Figma "Animations" › 4). */
const toastDuration = 2500;

export function ContactForm() {
  const router = useRouter();
  const submitting = useRef(false);
  const started = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReady(true);
    return () => clearTimeout(toastTimer.current);
  }, []);

  async function copyAddress() {
    await copyText(contactAddress);
    setCopied(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setCopied(false), toastDuration);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactFields = {
      name: String(data.get("name") ?? ""),
      town: String(data.get("town") ?? ""),
      email: String(data.get("email") ?? ""),
      need: String(data.get("need") ?? ""),
    };
    const nextErrors = validateContact(values);
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
      await sendContact(values);
      trackEvent("Contact envoye");
      router.push("/merci/");
    } catch {
      // Keep the visitor's answers available to retry or copy into an email.
      submitting.current = false;
      setStatus("error");
      trackEvent("Contact erreur", { etape: "envoi" });
    }
  }

  const disabled = !ready || status === "sending";

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.grid}>
        <div className={styles.head}>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Vous êtes une mairie&nbsp;? Parlons de votre commune.</h2>
          <p className={styles.lead}>
            Présentez-vous en une phrase : nous revenons vers vous pour organiser une démonstration adaptée à vos services.
          </p>
        </div>

        <form id="contact-form" className={styles.form} method="post" onSubmit={submit} noValidate
          aria-label="Demande de rendez-vous" aria-busy={status === "sending"}
          onInput={(event) => {
            const field = event.target;
            if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) &&
              fields.some(item => item.name === field.name) && field.value.trim() && !started.current) {
              started.current = trackEvent("Contact commence");
            }
          }}>
          <fieldset disabled={disabled}>
            <legend className="sr-only">Demande de démonstration</legend>
            {fields.map(field => {
              const id = `contact-${field.name}`;
              const error = errors[field.name];
              const common = {
                id,
                name: field.name,
                placeholder: field.placeholder,
                maxLength: field.maxLength,
                autoComplete: field.autoComplete,
                required: !field.multiline,
                "aria-invalid": Boolean(error),
                "aria-describedby": error ? `${id}-error` : undefined,
              };
              return (
                <div key={field.name}
                  className={`${styles.field}${field.full ? ` ${styles.full}` : ""}${field.multiline ? ` ${styles.area}` : ""}`}>
                  {field.icon && <span className={styles.icon} aria-hidden="true"><FieldIcon name={field.icon} /></span>}
                  <span className={styles.body}>
                    <label htmlFor={id}>
                      {field.label}
                      {field.multiline && <span className={styles.optional}> (facultatif)</span>}
                    </label>
                    {field.multiline ? <textarea rows={3} {...common} /> : <input type={field.type ?? "text"} {...common} />}
                    {error && <span className={styles.fieldError} id={`${id}-error`}>{error}</span>}
                  </span>
                </div>
              );
            })}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">Laisser ce champ vide</label>
              <input id="contact-website" name="_honey" tabIndex={-1} autoComplete="off" />
            </div>
          </fieldset>
          <p className="sr-only" role="status">{status === "sending" ? "Envoi de votre demande en cours." : ""}</p>
          <noscript>
            <p className={styles.submitError}>
              Pour utiliser le formulaire, activez JavaScript ou écrivez directement à{" "}
              <a href={`mailto:${contactAddress}`}>{contactAddress}</a>.
            </p>
          </noscript>
        </form>

        <div className={styles.ctas}>
          <button type="button" className={styles.card} onClick={copyAddress}
            aria-label={`Copier l’adresse e-mail ${contactAddress}`}>
            <span className={styles.cardIcon} style={{ background: "#E4E8F0", color: "#3C4F76" }}><MailIcon /></span>
            <span className={styles.cardText}><span className={styles.cardTitle}>Nous écrire</span><span className={styles.cardSub}>{contactAddress}</span></span>
          </button>
          <a className={styles.card} href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <span className={styles.cardIcon} style={{ background: "#E3F2EF", color: "#2F7D71" }}><CodeIcon /></span>
            <span className={styles.cardText}>
              <span className={styles.cardTitle}>Le projet</span>
              <span className={styles.cardSub}>Code ouvert sur GitHub<span className="sr-only"> (nouvel onglet)</span></span>
            </span>
          </a>
        </div>

        <div className={styles.submit}>
          <button className={styles.submitButton} type="submit" form="contact-form" disabled={disabled}>
            {status === "sending" ? "Envoi en cours…" : "Prendre rendez-vous"}
            {status === "sending" ? <span className={styles.spinner} aria-hidden="true" /> : (
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            )}
          </button>
        </div>

        <div className={styles.note2}>
          <span className={styles.demo}>Démonstration de 30 minutes, sans engagement.</span>
          <span className={styles.privacy}>
            Vos informations servent à vous répondre. L’envoi est assuré par FormSubmit.{" "}
            <Link href="/confidentialite/">En savoir plus sur vos données</Link>.
          </span>
          {status === "error" && (
            <p className={styles.submitError} role="alert">
              L’envoi n’a pas pu être confirmé. Vos réponses sont conservées dans le formulaire. Réessayez dans un instant
              ou écrivez directement à <a href={`mailto:${contactAddress}`}>{contactAddress}</a>.
            </p>
          )}
        </div>
        <p className={styles.note}>Mairie360 est porté par quatre étudiants d’Epitech, avec des communes partenaires.</p>
      </div>

      <div className={`${styles.toast}${copied ? ` ${styles.toastShown}` : ""}`} role="status" aria-live="polite">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#70C1B3" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
        <span>{copied ? `Adresse copiée : ${contactAddress}` : ""}</span>
      </div>
    </section>
  );
}
