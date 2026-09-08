import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "./header";
import { SiteFooter } from "./site-footer";

export function InformationPage({ title, children, showUpdated = true }: { title: string; children: ReactNode; showUpdated?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main className="information-page container" id="contenu">
        <Link className="text-link" href="/">Retour à l’accueil</Link>
        <p className="section-label">Mairie360 · Le projet étudiant</p>
        <h1>{title}</h1>
        {showUpdated && <p className="information-date">Mis à jour le 8 septembre 2026</p>}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
