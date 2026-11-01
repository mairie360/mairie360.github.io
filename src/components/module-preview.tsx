import type { ModuleName } from "./icons";

/* Illustrative previews with demo data, as in the reference prototype (Claude artifact). */

function Bar({ value, color, height = 8 }: { value: number; color: string; height?: number }) {
  return (
    <div className="pv-track" style={{ height }}>
      {value > 0 && <div style={{ width: `${value}%`, height, background: color }} />}
    </div>
  );
}

function Body({ module }: { module: ModuleName }) {
  switch (module) {
    case "dashboard":
      return (
        <div className="pv-grid-2">
          <div className="pv-card pv-wide">
            <div className="pv-label">Projet à suivre</div>
            <div className="pv-strong">Réaménagement de la place</div>
            <Bar value={60} color="#3C4F76" />
            <div className="pv-note">60 % · en cours</div>
          </div>
          <div className="pv-card">
            <div className="pv-label">Tâches en attente</div>
            <div className="pv-line">Partager le compte rendu</div>
            <div className="pv-text">Préparer la concertation</div>
          </div>
          <div className="pv-card">
            <div className="pv-label">Prochain rendez-vous</div>
            <div className="pv-text"><strong>Jeudi · 09:00</strong></div>
            <div className="pv-text">Point d’équipe</div>
          </div>
        </div>
      );
    case "projects":
      return (
        <div className="pv-kanban">
          {[["À faire", [["Devis éclairage", ""], ["Affichage public", ""]]],
            ["En cours", [["Plan de la place", "#3C4F76"], ["Concertation", "#3C4F76"]]],
            ["Terminé", [["Étude de faisabilité", "#2F7D71"]]]].map(([column, cards]) => (
            <div key={column as string} className="pv-column">
              <div className="pv-column-title">{column as string}</div>
              {(cards as string[][]).map(([card, color]) => (
                <div key={card} className="pv-ticket" style={color ? { borderLeft: `3px solid ${color}` } : undefined}>{card}</div>
              ))}
            </div>
          ))}
        </div>
      );
    case "calendar":
      return (
        <div className="pv-week">
          {["Lun", "Mar", "Mer", "Jeu", "Ven"].map(day => <div key={day} className="pv-day">{day}</div>)}
          {[["10:00 Accueil nouveaux agents", "#E7EAF1", "#3C4F76"], null, ["14:30 Commission travaux", "#E3F2EF", "#2F7D71"],
            ["09:00 Point d’équipe", "#E7EAF1", "#3C4F76"], ["18:00 Conseil municipal", "#ECECEC", "#383F51"]].map((event, index) => (
            <div key={index} className="pv-slot">
              {event && <div style={{ background: event[1], borderLeft: `3px solid ${event[2]}` }}>{event[0]}</div>}
            </div>
          ))}
        </div>
      );
    case "messages":
      return (
        <div className="pv-chat">
          <div className="pv-channels">
            <div className="is-current"># services-techniques</div>
            <div># accueil</div>
            <div># élus</div>
          </div>
          <div className="pv-thread">
            <div className="pv-card pv-message"><div className="pv-author">Nadia · services techniques</div><div>Les barrières pour la fête sont réservées pour samedi.</div></div>
            <div className="pv-card pv-message"><div className="pv-author">Thomas · accueil</div><div>Parfait, je préviens les associations.</div></div>
          </div>
        </div>
      );
    case "workflows":
      return (
        <div className="pv-flow">
          <div className="pv-flow-title">Demande de réservation de salle</div>
          {[["Demande reçue à l’accueil", "Fait", "done"], ["Validation du chef de service", "En cours", "current"],
            ["Confirmation envoyée au demandeur", "À venir", "next"]].map(([step, status, state], index) => (
            <div key={step} className={`pv-step is-${state}`}>
              <span className="pv-step-number">{index + 1}</span>
              <span className="pv-step-name">{step}</span>
              <span className="pv-step-status">{status}</span>
            </div>
          ))}
        </div>
      );
    case "learning":
      return (
        <div className="pv-courses">
          {[["Prendre en main Mairie360", "4 vidéos · 20 min", 100, "#2F7D71"], ["Créer un circuit de validation", "Guide + quiz", 40, "#3C4F76"],
            ["Protéger les données des habitants", "3 modules", 0, ""]].map(([title, detail, value, color]) => (
            <div key={title as string} className="pv-card pv-course">
              <div className="pv-course-title">{title}</div>
              <div className="pv-course-detail">{detail}</div>
              <Bar value={value as number} color={color as string} height={6} />
            </div>
          ))}
        </div>
      );
  }
}

export function ModulePreview({ module, label }: { module: ModuleName; label: string }) {
  return (
    <div className="plat-preview">
      <div className="plat-preview-head">
        <span>{label}</span>
        <span>données de démonstration</span>
      </div>
      <Body module={module} />
    </div>
  );
}
