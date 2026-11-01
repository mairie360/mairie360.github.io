import Link from "next/link";
import { socialLinks } from "@/lib/showcase-data";
import { InstagramIcon, LinkedInIcon, Logo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Mairie360, accueil"><Logo width={60} /></Link>
          <p>Le numérique au service du collectif · © 2026</p>
        </div>
        <nav className="footer-links" aria-label="Informations du site">
          <Link href="/#contact">Contact</Link>
          <Link href="/confidentialite/">Confidentialité</Link>
          <Link href="/conditions-utilisation/">Conditions d’utilisation</Link>
          <span className="footer-socials">
            <a className="footer-social" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
              aria-label="Mairie360 sur LinkedIn (nouvel onglet)"><LinkedInIcon /></a>
            <a className="footer-social" href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Mairie360 sur Instagram (nouvel onglet)"><InstagramIcon /></a>
          </span>
        </nav>
      </div>
    </footer>
  );
}
