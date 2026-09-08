import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Brand } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page introuvable | Mairie360",
  description: "Cette page n’existe pas ou a été déplacée. Retrouvez la présentation de Mairie360 et ses modules depuis l’accueil.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="not-found container">
      <Link className="brand-link" href="/" aria-label="Mairie360, accueil"><Brand /></Link>
      <main>
        <p className="section-label">Erreur 404</p>
        <h1>Cette page a pris<br />un autre chemin.</h1>
        <p>Le lien est peut-être ancien ou l’adresse contient une erreur. Retrouvez le projet et ses modules depuis l’accueil.</p>
        <Link className="button button-primary" href="/">Revenir à l’accueil <Arrow /></Link>
      </main>
      <p>Le numérique au service du collectif.</p>
    </div>
  );
}
