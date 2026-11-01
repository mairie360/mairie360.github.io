"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./icons";
import { headerVisibility } from "@/lib/header-visibility";

/**
 * Band fixed at the top that hides while scrolling down and comes back when scrolling up
 * (Figma "Animations — à implémenter" › 3). At the top of the page it is always visible on
 * desktop and hidden on the home page on phones (≤ 820 px), where it only appears when scrolling back up.
 */
export function Header({ home = false }: { home?: boolean }) {
  // Unknown until the first scroll check, so the server snapshot relies on the CSS defaults.
  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  const last = useRef(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = Math.max(window.scrollY, 0);
        const lastY = last.current;
        const phone = home && window.innerWidth <= 820;
        last.current = y;
        setVisible(current => headerVisibility({ y, lastY, phone, current: current ?? !phone }));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [home]);

  const anchor = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="header" data-visible={visible}>
      <div className="header-inner container">
        <Link href="/" className="brand-link" aria-label="Mairie360, accueil">
          <Logo />
        </Link>
        <nav className="navigation" aria-label="Navigation principale">
          <a href={anchor("mairies")}>Pour les mairies</a>
          <a href={anchor("plateforme")}>La plateforme</a>
          <a href={anchor("accompagnement")}>Accompagnement</a>
          <a className="button button-primary header-cta" href={anchor("contact")}
            data-contact-origin="bandeau" data-contact-intention="demo">
            Demander une démo
          </a>
        </nav>
      </div>
    </header>
  );
}
