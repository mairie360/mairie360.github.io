"use client";

import { roles } from "@/lib/showcase-data";
import { Arrow } from "./icons";
import { useTabSelection } from "./use-tab-selection";

export function RolesExplorer() {
  const { selected, setSelected, onKeyDown } = useTabSelection(
    roles.length,
    "vertical",
  );
  return (
    <section
      id="equipes"
      className="teams container"
      aria-labelledby="teams-title"
    >
      <p className="section-label">Vos équipes</p>
      <h2 id="teams-title">À chaque rôle, sa perspective.</h2>
      <div className="roles-layout">
        <div
          className="role-tabs"
          role="tablist"
          aria-label="Votre rôle dans la collectivité"
          aria-orientation="vertical"
        >
          {roles.map((role, index) => (
            <button
              key={role.id}
              role="tab"
              id={`tab-${role.id}`}
              aria-selected={selected === index}
              aria-controls={`panel-${role.id}`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {role.label}
              <Arrow />
            </button>
          ))}
        </div>
        {roles.map((role, index) => (
          <div
            key={role.id}
            id={`panel-${role.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${role.id}`}
            className="role-content"
            hidden={selected !== index}
            tabIndex={0}
          >
            <h3>{role.title}</h3>
            <p>{role.description}</p>
            <ul className="role-keywords">
              {role.keywords.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
