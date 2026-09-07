import type { IconName } from "./icons";

export function ModulePreview({ module }: { module: IconName }) {
  if (module === "dashboard")
    return (
      <div className="preview">
        <div className="preview-heading">
          <h4>Votre activité du jour</h4>
          <p>Une vue d’ensemble pour votre équipe</p>
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-widget dashboard-project">
            <h5>Projet à suivre</h5>
            <div className="dashboard-project-heading">
              <p>Réaménagement de la place</p>
              <span className="preview-status">En cours</span>
            </div>
            <div className="dashboard-progress-label">
              <span>Avancement du projet</span>
              <strong>60 %</strong>
            </div>
            <div
              className="progress-track dashboard-progress"
              role="progressbar"
              aria-label="Avancement illustratif du projet"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={60}
            >
              <span />
            </div>
          </div>
          <div className="dashboard-widget">
            <h5>Tâches en attente</h5>
            <ul className="dashboard-tasks">
              <li>
                <p>Partager le compte rendu</p>
                <span>Priorité haute</span>
              </li>
              <li>
                <p>Préparer la concertation</p>
                <span>Priorité moyenne</span>
              </li>
            </ul>
          </div>
          <div className="dashboard-widget">
            <h5>Prochain rendez-vous</h5>
            <p className="dashboard-date">Jeudi · 09:00</p>
            <p className="dashboard-event-title">Point d’équipe</p>
            <p className="dashboard-event-place">Salle du conseil</p>
          </div>
        </div>
      </div>
    );
  if (module === "calendar")
    return (
      <div className="preview">
        <div className="preview-heading">
          <h4>Le calendrier de l’équipe</h4>
          <p>Une semaine dans votre collectivité</p>
        </div>
        <div className="calendar-preview">
          {[
            ["LUN.", "Point d’équipe", "09:00 · Direction générale"],
            ["MAR.", "Visite du chantier", "10:30 · Services techniques"],
            ["JEU.", "Réunion de concertation", "17:00 · Vie locale"],
          ].map(([day, title, detail]) => (
            <div className="calendar-event" key={day}>
              <span className="event-day">{day}</span>
              <div>
                <h5>{title}</h5>
                <p>{detail}</p>
              </div>
              <span className="event-line" />
            </div>
          ))}
        </div>
      </div>
    );
  if (module === "messages")
    return (
      <div className="preview">
        <div className="preview-heading">
          <h4>Une équipe, une conversation</h4>
          <p>Projet · Réaménagement de la place</p>
        </div>
        <div className="conversation">
          <div className="message">
            <span>Services techniques</span>
            <p>
              Le planning des interventions est prêt pour notre point d’équipe.
            </p>
          </div>
          <div className="message message-reply">
            <span>Direction générale</span>
            <p>
              Merci ! Nous pourrons le partager lors de la réunion de
              concertation.
            </p>
          </div>
          <p className="conversation-note">
            L’information circule. Le projet avance.
          </p>
        </div>
      </div>
    );
  if (module === "learning")
    return (
      <div className="preview">
        <div className="preview-heading">
          <h4>Votre espace de formation</h4>
          <p>Exemple de parcours</p>
        </div>
        <div className="course">
          <span className="course-category">Collaboration</span>
          <h5>Prendre en main les outils de votre collectivité</h5>
          <div className="course-progress">
            <span>Progression du parcours</span>
            <strong>1 chapitre sur 3</strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Progression illustrative du parcours"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={1}
          >
            <span />
          </div>
          <ol>
            <li className="chapter-complete">
              Découvrir son espace <span>Terminé</span>
            </li>
            <li>Organiser son quotidien</li>
            <li>Collaborer avec son équipe</li>
          </ol>
        </div>
      </div>
    );
  return (
    <div className="preview">
      <div className="preview-heading">
        <h4>Réaménagement de la place</h4>
        <p>Projet municipal</p>
      </div>
      <div className="kanban">
        {[
          ["À faire", "Préparer la concertation", "Vie locale"],
          ["En cours", "Planifier les interventions", "Services techniques"],
          ["Terminé", "Partager le compte rendu", "Direction générale"],
        ].map(([status, title, service], index) => (
          <div className={`kanban-column column-${index}`} key={status}>
            <h5>{status}</h5>
            <div className="task">
              <p>{title}</p>
              <span>{service}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
