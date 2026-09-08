import { Brand } from "./icons";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer container">
      <div className="footer-main">
        <Link href="/#solution" className="brand-link" aria-label="Mairie360, accueil"><Brand /></Link>
        <p>Le numérique au service du collectif.</p>
        <p>© 2026 Mairie360</p>
      </div>
      <div className="footer-details">
        <p>Un projet d’école porté par quatre étudiants d’Epitech.</p>
        <nav aria-label="Informations du site">
          <a href="mailto:mairie360@gmail.com">mairie360@gmail.com</a>
          <Link href="/confidentialite/">Confidentialité</Link>
          <Link href="/conditions-utilisation/">Conditions d’utilisation</Link>
        </nav>
      </div>
    </footer>
  );
}
