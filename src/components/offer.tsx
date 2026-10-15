import { Arrow } from "./icons";
import styles from "./offer.module.css";

export function Offer() {
  return <section id="offre" className={`${styles.offer} container`} aria-labelledby="offer-title">
    <div>
      <p className="section-label">L’offre pour votre mairie</p>
      <h2 id="offer-title">Essayez Mairie360<br />avec votre équipe.</h2>
      <p className={styles.description}>Un logiciel en ligne pour vos projets, vos tâches, votre calendrier et vos échanges entre services. Il complète vos logiciels métiers municipaux.</p>
      <ol className={styles.steps}>
        <li>Présentez-nous votre mairie et les besoins de vos services.</li>
        <li>Après échange, nous préparons vos accès et vous transmettons le lien de la plateforme.</li>
        <li>Connectez-vous dans votre navigateur et testez une situation de travail avec notre équipe.</li>
      </ol>
    </div>
    <div className={styles.details}>
      <h3>La bêta, gratuitement.</h3>
      <p>Sur invitation, pour les agents et responsables municipaux. Une prise en main accompagnée, sans installation sur votre poste.</p>
      <ul>
        <li>Consultez la roadmap et contribuez aux priorités du produit.</li>
        <li>Recevez les nouvelles du projet et des invitations à des échanges dédiés.</li>
        <li>Découvrez les avant-premières et le badge contributeur à mesure de leur disponibilité.</li>
      </ul>
      <div className={styles.actions}>
        <a className="button button-primary" href="#contact" data-contact-origin="offre" data-contact-intention="beta">Participer à la bêta <Arrow /></a>
        <a className="text-link" href="#contact" data-contact-origin="offre" data-contact-intention="demo">Demander une démonstration <Arrow diagonal /></a>
      </div>
      <p className={styles.pricing}>Après la bêta, un abonnement payant par mairie est en préparation. Le tarif et les conditions vous seront communiqués avant tout engagement.</p>
    </div>
  </section>;
}
