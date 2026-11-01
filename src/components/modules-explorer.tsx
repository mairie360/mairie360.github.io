"use client";

import { modules } from "@/lib/showcase-data";
import { ModulePreview } from "./module-preview";
import { useTabSelection } from "./use-tab-selection";

export function ModulesExplorer() {
  const { selected, setSelected, onKeyDown } = useTabSelection(modules.length);
  return (
    <section className="platform" id="plateforme" aria-labelledby="platform-title">
      <div className="container">
        <p className="eyebrow">La plateforme</p>
        <h2 id="platform-title">Six modules, un seul espace de travail.</h2>
        <p className="section-lead platform-lead">Choisissez un module pour voir ce qu’il apporte à vos équipes.</p>
        {/* The tab and its preview change immediately, without transition (Figma "Animations" › 4). */}
        <div className="tabs-row" role="tablist" aria-label="Choisir un module">
          {modules.map((module, index) => (
            <button
              key={module.id}
              type="button"
              role="tab"
              id={`tab-${module.id}`}
              aria-selected={selected === index}
              aria-controls={`panel-${module.id}`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {module.label}
            </button>
          ))}
        </div>
        {modules.map((module, index) => (
          <div
            key={module.id}
            id={`panel-${module.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${module.id}`}
            hidden={selected !== index}
            tabIndex={0}
            className="plat-row"
          >
            <div className="plat-text">
              <p className="plat-replaces">Remplace : {module.replaces}</p>
              <h3>{module.title}</h3>
              <p className="plat-description">{module.description}</p>
              <ul className="plat-points">
                {module.benefits.map(benefit => (
                  <li key={benefit}>
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#70C1B3" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ModulePreview module={module.id} label={module.label} />
          </div>
        ))}
      </div>
    </section>
  );
}
