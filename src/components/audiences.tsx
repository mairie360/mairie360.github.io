import type { ReactNode } from "react";
import { audiences } from "@/lib/showcase-data";

/** Colors of each card (frame, inner ring, icon background) and its 48×48 icon, from the reference prototype. */
const roleStyles: Record<string, { color: string; ring: string; soft: string; icon: ReactNode }> = {
  agents: {
    color: "#3C4F76", ring: "#B1B9C8", soft: "#E4E6EC",
    icon: <><circle cx="24" cy="13" r="6" /><path d="M13 31 a11 9 0 0 1 22 0" /><rect x="6" y="31" width="36" height="11" rx="2" /><path d="M17 36.5 h14" /></>,
  },
  managers: {
    color: "#2F7D71", ring: "#ACCBC6", soft: "#E2EDEB",
    icon: <><rect x="9" y="8" width="30" height="34" rx="3" /><rect x="17" y="4" width="14" height="7" rx="2" /><path d="M15 20 l3 3 l5 -5" /><path d="M27 21 h7" /><path d="M15 32 l3 3 l5 -5" /><path d="M27 33 h7" /></>,
  },
  elected: {
    color: "#383F51", ring: "#AFB2B9", soft: "#E3E4E7",
    icon: <><path d="M24 4 v8" /><path d="M24 4 h8 v5 h-8" /><path d="M6 20 L24 12 L42 20 Z" /><path d="M11 22 v14 M19 22 v14 M29 22 v14 M37 22 v14" /><path d="M6 40 h36" /></>,
  },
  administrators: {
    color: "#2E3D5C", ring: "#ABB1BE", soft: "#E2E4E8",
    icon: <><path d="M24 4 L40 10 V22 C40 32 33 39 24 43 C15 39 8 32 8 22 V10 Z" /><circle cx="24" cy="20" r="4.5" /><path d="M24 24.5 V33 M24 29 h4" /></>,
  },
};

export function Audiences() {
  return (
    <section className="home-section audiences" id="mairies" aria-labelledby="audiences-title">
      <div className="container">
        <p className="eyebrow">Pour les mairies</p>
        <h2 id="audiences-title">Conçu pour le quotidien d’une commune, pas pour une grande entreprise.</h2>
        <p className="section-lead audiences-lead">
          Mairie360 part du travail réel de vos équipes : préparer un conseil, suivre un chantier, réserver une salle,
          répondre aux habitants. Chacun y retrouve ce qui le concerne.
        </p>
        <ul className="roles-grid">
          {audiences.map(audience => {
            const role = roleStyles[audience.id];
            return (
              <li key={audience.id} className="role-card"
                style={{ border: `2px solid ${role.color}`, boxShadow: `inset 0 0 0 6px #FFFFFF, inset 0 0 0 7px ${role.ring}` }}>
                <span className="role-icon" aria-hidden="true" style={{ background: role.soft }}>
                  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke={role.color} strokeWidth="2.6"
                    strokeLinecap="round" strokeLinejoin="round">{role.icon}</svg>
                </span>
                <h3>{audience.label}</h3>
                <span className="role-tag">{audience.summary}</span>
                <p>{audience.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
