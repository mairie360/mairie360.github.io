"use client";

import { modules } from "@/lib/showcase-data";
import { Check, ModuleIcon } from "./icons";
import { ModulePreview } from "./module-preview";
import { useTabSelection } from "./use-tab-selection";

export function ModulesExplorer() {
  const { selected, setSelected, onKeyDown } = useTabSelection(modules.length);
  const current = modules[selected];
  return (
    <section className="modules" id="modules" aria-labelledby="modules-title">
      <div className="container">
        <div className="section-intro">
          <div>
            <p className="section-label">Les modules</p>
            <h2 id="modules-title">
              Un espace commun.
              <br />
              Des outils qui se parlent.
            </h2>
          </div>
          <p>
            Retrouvez les outils du quotidien dans une plateforme pensée pour
            les collectivités.
          </p>
        </div>
        <div
          className="module-tabs"
          role="tablist"
          aria-label="Découvrir les modules"
        >
          {modules.map((module, index) => (
            <button
              key={module.id}
              role="tab"
              id={`tab-${module.id}`}
              aria-selected={selected === index}
              aria-controls={`panel-${module.id}`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <ModuleIcon name={module.id} />
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
          >
            {selected === index && (
              <div className="module-content">
                <div className="module-copy">
                  <h3>{current.title}</h3>
                  <p>{current.description}</p>
                  {current.development && (
                    <p className="development-note">Module en développement</p>
                  )}
                  <ul className="benefits">
                    {current.benefits.map((benefit) => (
                      <li key={benefit}>
                        <Check />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="demo-caption">
                    Aperçu illustratif — données de démonstration
                  </p>
                </div>
                <ModulePreview module={current.id} />
              </div>
            )}
          </div>
        ))}
        <p className="module-closing">
          Une plateforme modulaire, qui évolue avec les besoins des équipes.
        </p>
      </div>
    </section>
  );
}
