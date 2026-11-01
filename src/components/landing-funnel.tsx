"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function LandingFunnel() {
  useEffect(() => {
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          trackEvent("Contact vu");
          observer?.unobserve(entry.target);
        }
      }
    }, { threshold: 0.25 }) : null;
    const contact = document.getElementById("contact");
    if (contact) observer?.observe(contact);
    const clicked = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[data-contact-origin]") : null;
      if (link instanceof HTMLAnchorElement) trackEvent("CTA contact", {
        origine: link.dataset.contactOrigin, intention: link.dataset.contactIntention,
      });
    };
    document.addEventListener("click", clicked);
    return () => { observer?.disconnect(); document.removeEventListener("click", clicked); };
  }, []);
  return null;
}
