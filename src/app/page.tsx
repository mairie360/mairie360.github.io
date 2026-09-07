import Image from "next/image";
import { Header } from "@/components/header";
import { Arrow } from "@/components/icons";
import { ModulesExplorer } from "@/components/modules-explorer";
import { RolesExplorer } from "@/components/roles-explorer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <section
          className="hero container"
          id="solution"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <h1 id="hero-title">
              Votre mairie,
              <br />
              plus proche.
              <br />
              <span>
                Vos équipes,
                <br />
                mieux connectées.
              </span>
            </h1>
            <p>
              Projets, calendrier, échanges et formations :
              <br className="desktop-break" /> un espace commun pour les équipes
              de votre collectivité.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#modules">
                Découvrir les modules <Arrow />
              </a>
              <a className="text-link" href="#projet">
                Notre vision <Arrow diagonal />
              </a>
            </div>
          </div>
          <figure className="hero-figure">
            <Image
              src="/images/mairie-collectif.webp"
              alt="Une mairie et ses services réunis autour d’une place, illustration architecturale du collectif."
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 100vw, 65vw"
              priority
            />
            <figcaption>Le numérique au service du collectif.</figcaption>
          </figure>
        </section>
        <div className="vision-line container">
          <p>Moins d’outils dispersés. Plus de liens entre vos services.</p>
        </div>
        <ModulesExplorer />
        <RolesExplorer />
      </main>
    </>
  );
}
