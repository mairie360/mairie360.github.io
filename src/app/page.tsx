import { Header } from "@/components/header";
import { Arrow } from "@/components/icons";
import { ModulesExplorer } from "@/components/modules-explorer";
import { RolesExplorer } from "@/components/roles-explorer";
import { TownHallScene } from "@/components/town-hall-scene";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { MobileCta } from "@/components/mobile-cta";
import { pageMetadata } from "@/lib/metadata";
import { Offer } from "@/components/offer";
import { LandingFunnel } from "@/components/landing-funnel";

export const metadata = pageMetadata(
  "Mairie360 — Vos équipes, mieux connectées",
  "Mairie360, le logiciel en ligne pour les mairies : projets, tâches, calendrier et messagerie. Découvrez la bêta gratuite et demandez une démonstration.",
  "/",
);

export default function Home() {
  return (
    <div className="home-page">
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
              Le logiciel en ligne pour les mairies : projets, tâches, calendrier
              et messagerie dans un espace commun pour vos services.
            </p>
            <div className="hero-actions">
              <a id="hero-primary-cta" className="button button-primary" href="#contact" data-contact-origin="hero" data-contact-intention="beta">
                Participer à la bêta <Arrow />
              </a>
              <a className="text-link" href="#offre">
                Découvrir l’offre <Arrow diagonal />
              </a>
            </div>
          </div>
          <TownHallScene />
        </section>
        <div className="vision-line container">
          <p>Moins d’outils dispersés. Plus de liens entre vos services.</p>
        </div>
        <Offer />
        <ModulesExplorer />
        <RolesExplorer />
        <section
          id="projet"
          className="project"
          aria-labelledby="project-title"
        >
          <div className="container project-layout">
            <div>
              <h2 id="project-title">
                Pensé pour les collectivités.
                <br />
                Construit avec ambition.
              </h2>
              <p>
                Mairie360 est un projet d’école porté par quatre étudiants d’Epitech :
                <br className="desktop-break" /> une plateforme modulaire pour
                simplifier le travail des équipes municipales.
              </p>
            </div>
            <a
              className="button button-light"
              href="https://github.com/mairie360"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suivre le projet sur GitHub <Arrow diagonal />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </div>
        </section>
        <ContactForm />
        <div className="commitments container">
          <p>
            Une démarche attentive à l’accessibilité, à la protection des
            données et à la sobriété numérique.
          </p>
        </div>
      </main>
      <SiteFooter />
      <MobileCta />
      <LandingFunnel />
    </div>
  );
}
