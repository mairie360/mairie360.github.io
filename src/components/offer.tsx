import styles from "./offer.module.css";

export function Offer() {
  return (
    <section className={`home-section ${styles.offer}`} id="offre" aria-labelledby="offer-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <p className="eyebrow">L’offre pour votre mairie</p>
          <h2 id="offer-title">La bêta, gratuitement et sur invitation.</h2>
          <p className={styles.lead}>Pour les agents et responsables municipaux : découvrez Mairie360 avec votre équipe, sans installation sur votre poste.</p>
          <ol className={styles.steps}>
            <li>Présentez-nous votre commune et les besoins de vos services.</li>
            <li>Nous organisons une démonstration adaptée à votre mairie.</li>
            <li>Après la démonstration et sur invitation, nous préparons vos comptes et vous transmettons le lien pour accéder à la plateforme dans votre navigateur.</li>
          </ol>
        </div>
        <div className={styles.details}>
          <h3>Et après la bêta ?</h3>
          <p>Un abonnement payant par mairie est en préparation. Le tarif reste à confirmer ; les conditions vous seront communiquées avant tout engagement.</p>
          <a className="button button-primary" href="#contact" data-contact-origin="offre" data-contact-intention="beta">Participer à la bêta</a>
          <p className={styles.note}>Indiquez votre intérêt pour la bêta dans votre demande de rendez-vous.</p>
        </div>
      </div>
    </section>
  );
}
