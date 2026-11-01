import type { CSSProperties, ReactNode } from "react";
import { eras } from "@/lib/showcase-data";
import styles from "./timeline.module.css";

/** Background of each period and the colors of its dot on the rail (reference prototype). */
const periods: Record<string, { background: string; dot: string; ring: string }> = {
  "1993": { background: "linear-gradient(to bottom,#050805 0%,#050805 35%,#050805 65%,#023C3A 100%)", dot: "#7CFF6B", ring: "#050805" },
  "1999": { background: "linear-gradient(to bottom,#023C3A 0%,#007070 35%,#007070 65%,#6BA8B0 100%)", dot: "#C0C0C0", ring: "#000080" },
  "2008": { background: "linear-gradient(to bottom,#6BA8B0 0%,#D6E1F0 35%,#D6E1F0 65%,#E1E8F2 100%)", dot: "#F29A1F", ring: "#3A6BB5" },
  "2016": { background: "linear-gradient(to bottom,#E1E8F2 0%,#ECEFF3 35%,#ECEFF3 65%,#F6F7F9 100%)", dot: "#337AB7", ring: "#ECEFF3" },
};

function Cross() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4A79A" strokeWidth="2.4" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F7D71" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function Minitel() {
  return (
    <div className={styles.minitel}>
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.minitelBar}><span>3615 MAIRIE</span><span>0,98 F/min</span></div>
      <div className={styles.minitelTitle}>SERVICES MUNICIPAUX</div>
      <div>1 . Horaires du secrétariat</div>
      <div>2 . État civil : se présenter en mairie</div>
      <div>3 . Réserver une salle : voir accueil</div>
      <div className={styles.minitelPrompt}>Tapez votre choix puis <span>ENVOI</span></div>
    </div>
  );
}

function FirstSite() {
  return (
    <div className={styles.netscape}>
      <div className={styles.netscapeBar}>
        <span>Mairie - Accueil.htm - Netscape Navigator</span>
        <span aria-hidden="true" className={styles.netscapeButtons}><span /><span /></span>
      </div>
      <div className={styles.netscapePage}>
        <p className={styles.netscapeDate}>Dernière mise à jour : 14/03/1999</p>
        <p className={styles.netscapeTitle}>Bienvenue sur le site de votre commune</p>
        <table>
          <tbody>
            <tr><th>Pour...</th><th>Merci de...</th></tr>
            <tr><td>Consulter un dossier</td><td>Passer au bureau 2 (classeur bleu)</td></tr>
            <tr><td>Transmettre un document</td><td>Envoyer un fax au 02 XX XX XX XX</td></tr>
          </tbody>
        </table>
        <p className={styles.netscapeCounter}>Visiteur n° <span>004127</span> | Meilleur affichage en 800×600</p>
      </div>
    </div>
  );
}

function Intranet() {
  return (
    <div className={styles.intranet}>
      <div className={styles.intranetBar}><strong>Intranet de la commune</strong><span>Connecté : accueil</span></div>
      <div className={styles.intranetBody}>
        <div className={styles.intranetWarning}>Pour un fonctionnement optimal, utilisez Internet Explorer 7.</div>
        <div className={styles.intranetHeading}>Documents partagés</div>
        <div className={styles.intranetFiles}>
          <div>suivi_projets.xls</div>
          <div>suivi_projets_v2.xls</div>
          <div>suivi_projets_v3_FINAL.xls</div>
          <div>suivi_projets_v3_FINAL_def.xls</div>
        </div>
        <div className={styles.intranetError}>Erreur : la pièce jointe dépasse 2 Mo.</div>
      </div>
    </div>
  );
}

function Portal() {
  return (
    <div className={styles.portal}>
      <div className={styles.portalBar}>Portail Agent</div>
      <div className={styles.portalBody}>
        <div className={styles.portalApps}>
          {["Finances", "État civil", "Agenda", "Messagerie"].map((app, index) => (
            <div key={app}>{app}<div>identifiant n°{index + 1}</div></div>
          ))}
        </div>
        <div className={styles.portalSession}>Session expirée : veuillez vous reconnecter</div>
      </div>
    </div>
  );
}

const screens: Record<string, ReactNode> = { "1993": <Minitel />, "1999": <FirstSite />, "2008": <Intranet />, "2016": <Portal /> };

const appMenu: [string, string][] = [
  ["Tableau de bord", "#3C4F76"], ["Projets", "#3F9C8C"], ["Calendrier", "#D08A4C"],
  ["Messagerie", "#8E7BA0"], ["Workflows", "#C0607A"], ["Formations", "#5E8F5A"],
];

function Notification({ color, label, text, className, icon }: {
  color: string; label: string; text: string; className: string; icon: ReactNode;
}) {
  return (
    <div className={`${styles.notification} ${className}`}>
      <span className={styles.notificationBadge} style={{ background: color }}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <span>
        <span className={styles.notificationLabel} style={{ color }}>{label}</span>
        <span className={styles.notificationText}>{text}</span>
      </span>
    </div>
  );
}

function TodayApp() {
  return (
    <div className={styles.appStage} aria-hidden="true">
      <div className={styles.appWindow}>
        <div className={styles.appBar}>
          <span className={styles.appLights}><span /><span /><span /></span>
          <span className={styles.appUrl}>votre-commune.mairie360.fr</span>
        </div>
        <div className={styles.appBody}>
          <div className={styles.appMenu}>
            {appMenu.map(([label, color], index) => (
              <div key={label} className={index === 0 ? styles.appMenuCurrent : undefined}>
                <span style={{ background: color }} />{label}
              </div>
            ))}
          </div>
          <div className={styles.appContent}>
            <div className={styles.appGreeting}><span>Bonjour Camille</span><span>démo</span></div>
            <div className={`${styles.appCard} ${styles.appWide}`}>
              <div className={styles.appProject}><span>Réaménagement de la place</span><span>60 %</span></div>
              <div className={styles.appGauge}><div /></div>
            </div>
            <div className={styles.appCard}>
              <div className={styles.appLabel}>Activité de l’équipe</div>
              <div className={styles.appBars}>
                {[40, 62, 48, 78, 56, 70].map((height, index) => (
                  <div key={index} style={{ height: `${height}%`, background: index === 3 ? "#3C4F76" : "#D9DEE8" }} />
                ))}
              </div>
            </div>
            <div className={`${styles.appCard} ${styles.appToday}`}>
              <div className={styles.appLabel}>Aujourd’hui</div>
              <div><span style={{ color: "#D08A4C" }}>09:00</span> Point d’équipe</div>
              <div><span style={{ color: "#8E7BA0" }}>14:30</span> Commission</div>
            </div>
          </div>
        </div>
      </div>
      <Notification color="#D08A4C" label="Calendrier" text="Salle réservée jeudi" className={styles.notificationCalendar}
        icon={<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>} />
      <Notification color="#8E7BA0" label="Messagerie" text="Services techniques · 2 nouveaux" className={styles.notificationMessages}
        icon={<path d="M4 5h16v11H9l-5 4z" />} />
      <Notification color="#C0607A" label="Workflows" text="Bon de commande validé" className={styles.notificationWorkflows}
        icon={<path d="M5 12l5 5 9-10" />} />
    </div>
  );
}

export function Timeline() {
  return (
    <section className={styles.frise} aria-labelledby="timeline-title">
      <div className={styles.eraBg} style={{ background: "#050805" }}>
        <div className={styles.intro}>
          <p className={styles.introKicker}>Trente ans d’outils municipaux</p>
          <h2 id="timeline-title">Chaque génération a fait avancer les mairies. Et chacune a laissé ses contraintes.</h2>
          <p className={styles.introLead}>Vos équipes les connaissent bien : certaines sont encore là aujourd’hui.</p>
        </div>
      </div>

      <ol className={styles.eras}>
        {eras.map(era => {
          const period = periods[era.year];
          return (
            <li key={era.year} className={styles.eraBg} style={{ background: period.background }}>
              <div className={styles.era}>
                <div className={styles.rail}>
                  <span aria-hidden="true" className={styles.dot}
                    style={{ background: period.dot, border: `3px solid ${period.ring}` } as CSSProperties} />
                  <div className={styles.card}>
                    <div className={styles.year}>{era.year}</div>
                    <div className={styles.title}>{era.title}</div>
                    <div className={styles.label}>Les limites</div>
                    <ul className={styles.limits}>
                      {era.limits.map(limit => <li key={limit}><Cross /><span>{limit}</span></li>)}
                    </ul>
                  </div>
                </div>
                <div className={styles.stage} aria-hidden="true">{screens[era.year]}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles.band2026}>
        <div className={`${styles.era} ${styles.era2026}`}>
          <div className={styles.rail}>
            <span aria-hidden="true" className={styles.dot2026} />
            <div className={styles.card2026}>
              <div className={styles.cardHead}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, logo shown as is */}
                <img src="/images/mairie360-logo.png" alt="" width={42} height={32} />
                <span>2026</span>
              </div>
              <div className={styles.cardName}>Mairie360</div>
              <div className={`${styles.label} ${styles.labelToday}`}>Ce qui change</div>
              <ul className={styles.limits}>
                {["Des outils qui se parlent", "Un seul espace pour toute l’équipe", "Pensé pour les mairies"].map(item => (
                  <li key={item}><Check /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.stage}><TodayApp /></div>
        </div>
        <div className={styles.cta}>
          <a href="#plateforme" className="button button-pill">
            Découvrir la plateforme
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
              strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
