import { Header } from "@/components/header";
import { Arrow, Brand } from "@/components/icons";
import { ModulesExplorer } from "@/components/modules-explorer";
import { RolesExplorer } from "@/components/roles-explorer";
import { TownHallScene } from "@/components/town-hall-scene";

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
              Du tableau de bord aux workflows :
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
          <TownHallScene />
        </section>
        <div className="vision-line container">
          <p>Moins d’outils dispersés. Plus de liens entre vos services.</p>
        </div>
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
                Mairie360 est un projet en développement :
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
        <div className="commitments container">
          <p>
            Une démarche attentive à l’accessibilité, à la protection des
            données et à la sobriété numérique.
          </p>
        </div>
      </main>
      <footer className="footer container">
        <a
          href="#solution"
          className="brand-link"
          aria-label="Mairie360, retour en haut"
        >
          <Brand />
        </a>
        <p>Le numérique au service du collectif.</p>
        <p>© 2026 Mairie360</p>
      </footer>
    </>
  );
}
