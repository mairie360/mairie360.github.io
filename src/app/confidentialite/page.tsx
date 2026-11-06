import { InformationPage } from "@/components/information-page";
import { pageMetadata } from "@/lib/metadata";
import { getAnalyticsMeasurementId } from "@/lib/analytics";

export const metadata = pageMetadata(
  "Confidentialité | Mairie360",
  "Comment fonctionne la confidentialité sur le site de Mairie360, projet d’école porté par quatre étudiants d’Epitech : navigation, cookies et hébergement.",
  "/confidentialite/",
);

export default function Privacy() {
  return (
    <InformationPage title="Confidentialité" updated="7 novembre 2026">
      <section>
        <h2>Le site de présentation</h2>
        <p>Mairie360 est un projet d’école porté par quatre étudiants d’Epitech. Cette page décrit le fonctionnement du site vitrine mairie360.fr dans sa version actuelle.</p>
        <p>Le site présente le projet et des exemples de modules. Il propose un formulaire pour contacter l’équipe, sans création de compte ni dépôt de documents. Les données affichées dans les démonstrations sont fictives.</p>
      </section>
      <section>
        <h2>Cookies et mesure d’audience</h2>
        {getAnalyticsMeasurementId() ? <>
          <p>Avec votre accord, nous utilisons Google Analytics 4 pour mesurer les visites, les pages vues et le parcours vers une demande de contact : consultation de l’offre et du formulaire, clic sur un bouton de rendez-vous, début de saisie, erreur et envoi confirmé.</p>
          <p>Aucun script Google Analytics n’est chargé avant votre acceptation. Vous pouvez refuser et continuer à utiliser le site et le formulaire. Vous pouvez modifier ou retirer votre accord à tout moment avec « Gérer les cookies » dans le pied de page.</p>
          <p>Votre choix est conservé pendant 180 jours dans le stockage local de ce navigateur. Si ce stockage est bloqué, le choix vaut seulement pour la page en cours. Après acceptation, Google Analytics peut déposer des cookies de mesure d’audience, configurés pour une durée maximale de 180 jours sans renouvellement automatique à chaque visite. Le retrait bloque la collecte et supprime les cookies Analytics accessibles à ce site dans ce navigateur.</p>
          <p>Les événements que nous ajoutons ne transmettent ni votre nom, ni votre commune, ni votre e-mail, ni le contenu des champs du formulaire. Les URL transmises excluent les paramètres libres et les fragments ; seuls des libellés de campagne autorisés peuvent être conservés. Nous désactivons les signaux Google et la personnalisation publicitaire dans cette intégration.</p>
          <p>Google reçoit également les informations techniques nécessaires aux requêtes et à la mesure. Les traitements, la conservation et les droits associés sont décrits dans la <a href="https://policies.google.com/privacy?hl=fr">politique de confidentialité de Google</a>. Les chiffres concernent les visites mesurées après acceptation ; ils ne recensent pas tous les visiteurs qui refusent le suivi.</p>
        </> : <p>Aucune mesure d’audience n’est activée dans cette version. Le suivi Google Analytics et les choix de cookies seront proposés uniquement après son activation. Aucun script Analytics n’est chargé et aucun cookie Analytics n’est déposé par le site.</p>}
        <p>Les images et la police de caractères sont servies avec le site, sans chargement depuis un service de polices ou de publicité tiers.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Le site est hébergé sur GitHub Pages. GitHub indique enregistrer l’adresse IP des visiteurs pour des raisons de sécurité, y compris lorsqu’ils ne sont pas connectés à un compte GitHub.</p>
        <p>Les modalités de ce traitement, la conservation, les transferts et les droits associés sont décrits dans la <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</a>. La <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">documentation de GitHub Pages</a> précise les données liées à l’hébergement.</p>
      </section>
      <section>
        <h2>Le formulaire de contact</h2>
        <p>Le formulaire demande votre nom et prénom, votre commune, votre adresse e-mail professionnelle et, si vous le souhaitez, votre besoin. Ces informations sont utilisées pour organiser une démonstration et vous répondre.</p>
        <p>Lorsque vous choisissez « Prendre rendez-vous », ces informations sont transmises à FormSubmit, le service qui les achemine vers notre boîte mairie360@gmail.com. Aucun envoi au service n’a lieu pendant la saisie.</p>
        <p>FormSubmit indique conserver les messages dans ses archives pendant 30 jours. Consultez sa <a href="https://formsubmit.co/privacy.pdf">politique de confidentialité</a> et sa <a href="https://formsubmit.co/documentation">documentation</a> pour les conditions de ce traitement.</p>
        <p>Le contenu du formulaire reste dans la page pendant la saisie et en cas d’erreur d’envoi. Il n’est pas enregistré dans le stockage local de votre navigateur ; quitter ou recharger la page peut l’effacer.</p>
      </section>
      <section>
        <h2>Nous contacter</h2>
        <p>Pour une question concernant le site ou vos données, vous pouvez écrire à <a href="mailto:mairie360@gmail.com">mairie360@gmail.com</a>.</p>
        <p>Si vous nous envoyez un e-mail, votre adresse et le contenu de votre message sont utilisés pour traiter votre demande et vous répondre. N’y joignez pas de dossier administratif ni de données sensibles.</p>
      </section>
      <section>
        <h2>Liens et évolutions</h2>
        <p>En suivant un lien vers GitHub ou un autre site, vous quittez mairie360.fr. Les règles du service visité s’appliquent alors à votre navigation.</p>
        <p>Si une mesure d’audience ou d’autres traitements sont ajoutés, cette page sera mise à jour pour les expliquer.</p>
      </section>
    </InformationPage>
  );
}
