"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getAnalyticsConsent, subscribeAnalyticsConsent, trackEvent } from "@/lib/analytics";

const serverConsent = () => null;

export function LandingFunnel() {
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverConsent);
  useEffect(() => {
    if (consent !== "accepted") return;
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          if (trackEvent(entry.target.id === "offre" ? "Offre vue" : "Contact vu")) observer?.unobserve(entry.target);
        }
      }
    }, { threshold: 0.25 }) : null;
    for (const id of ["offre", "contact"]) {
      const section = document.getElementById(id);
      if (section) observer?.observe(section);
    }
    const clicked = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[data-contact-origin]") : null;
      if (link instanceof HTMLAnchorElement) trackEvent("CTA contact", {
        origine: link.dataset.contactOrigin, intention: link.dataset.contactIntention,
      });
    };
    document.addEventListener("click", clicked);
    return () => { observer?.disconnect(); document.removeEventListener("click", clicked); };
  }, [consent]);
  return null;
}
