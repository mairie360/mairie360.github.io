"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  analyticsPreferencesEvent, getAnalyticsConsent, setAnalyticsConsent, startAnalytics,
  stopAnalytics, subscribeAnalyticsConsent, trackPageView, type AnalyticsConsent,
} from "@/lib/analytics";
import styles from "./audience-analytics.module.css";

const serverConsent = () => null;

export function AnalyticsPreferences() {
  return <button type="button" className={styles.preferences} data-analytics-preferences
    onClick={() => window.dispatchEvent(new Event(analyticsPreferencesEvent))}>Gérer les cookies</button>;
}

export function AudienceAnalytics({ measurementId }: { measurementId: string | null }) {
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverConsent);
  const pathname = usePathname();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener(analyticsPreferencesEvent, open);
    return () => window.removeEventListener(analyticsPreferencesEvent, open);
  }, []);

  useEffect(() => {
    if (measurementId && consent === "accepted") {
      if (startAnalytics(measurementId)) trackPageView(pathname);
    } else stopAnalytics();
  }, [measurementId, consent, pathname]);

  function choose(choice: AnalyticsConsent) {
    setAnalyticsConsent(choice);
    if (preferencesOpen) document.querySelector<HTMLButtonElement>("[data-analytics-preferences]")?.focus({ preventScroll: true });
    setPreferencesOpen(false);
  }

  if (!measurementId || (consent !== null && !preferencesOpen)) return null;
  return <aside className={styles.banner} role="region" aria-labelledby="audience-choice-title">
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.title} id="audience-choice-title">Mesure d’audience</p>
        <p>Acceptez-vous les cookies Google Analytics pour mesurer les visites et les demandes de contact ?
          Le formulaire reste utilisable si vous refusez. <Link href="/confidentialite/">En savoir plus</Link>.</p>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("rejected")}>Refuser</button>
        <button type="button" onClick={() => choose("accepted")}>Accepter</button>
      </div>
    </div>
  </aside>;
}
