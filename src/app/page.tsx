import { Offer } from "@/components/offer";
import { Header } from "@/components/header";
import { TownHallScene } from "@/components/town-hall-scene";
import { Timeline } from "@/components/timeline";
import { Audiences } from "@/components/audiences";
import { ModulesBoard } from "@/components/modules-board";
import { ModulesExplorer } from "@/components/modules-explorer";
import { SupportSteps } from "@/components/support-steps";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { LandingFunnel } from "@/components/landing-funnel";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Mairie360 — Le logiciel en ligne pour les mairies",
  "Mairie360, le logiciel en ligne pour les mairies : projets, tâches, calendrier et messagerie dans un espace commun. Découvrez la bêta gratuite sur invitation et demandez une démonstration de 30 minutes.",
  "/",
);

export default function Home() {
  return (
    <div className="home-page">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header home />
      <main id="contenu">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">Votre mairie mérite un outil à sa mesure.</h1>
              <p>
                Le logiciel en ligne pour les mairies : projets, tâches, calendrier et messagerie dans un espace commun
                pour vos services.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact" data-contact-origin="hero" data-contact-intention="demo">
                  Prendre rendez-vous
                </a>
                <a className="button button-secondary" href="#plateforme">
                  Découvrir la plateforme
                </a>
              </div>
            </div>
            <TownHallScene />
          </div>
        </section>
        <Timeline />
        <Audiences />
        <ModulesBoard />
        <ModulesExplorer />
        <SupportSteps />
        <Offer />
        <ContactForm />
      </main>
      <SiteFooter />
      <LandingFunnel />
    </div>
  );
}
