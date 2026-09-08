import { InformationPage } from "@/components/information-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Confidentialité | Mairie360",
  "Comment fonctionne la confidentialité sur le site de Mairie360, projet d’école porté par quatre étudiants d’Epitech : navigation, cookies et hébergement.",
  "/confidentialite/",
);

export default function Privacy() {
  return (
    <InformationPage title="Confidentialité">
      <section>
        <h2>Le site de présentation</h2>
        <p>Mairie360 est un projet d’école porté par quatre étudiants d’Epitech. Cette page décrit le fonctionnement du site vitrine mairie360.fr dans sa version actuelle.</p>
        <p>Le site présente le projet et des exemples de modules. Il ne comporte ni création de compte, ni formulaire de contact, ni dépôt de documents. Les données affichées dans les démonstrations sont fictives.</p>
      </section>
      <section>
        <h2>Cookies et mesure d’audience</h2>
        <p>Nous n’installons aucun outil de mesure d’audience ni traceur publicitaire sur ce site. Le code du site ne dépose pas de cookie et ne conserve pas vos choix de navigation dans le stockage de votre navigateur.</p>
        <p>Les images et la police de caractères sont servies avec le site, sans chargement depuis un service de polices ou de publicité tiers.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Le site est hébergé sur GitHub Pages. GitHub indique enregistrer l’adresse IP des visiteurs pour des raisons de sécurité, y compris lorsqu’ils ne sont pas connectés à un compte GitHub.</p>
        <p>Les modalités de ce traitement, la conservation, les transferts et les droits associés sont décrits dans la <a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</a>. La <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">documentation de GitHub Pages</a> précise les données liées à l’hébergement.</p>
      </section>
      <section>
        <h2>Nous contacter</h2>
        <p>Pour une question concernant le site ou vos données, vous pouvez écrire à <a href="mailto:mairie360@gmail.com">mairie360@gmail.com</a>.</p>
        <p>Si vous nous envoyez un e-mail, votre adresse et le contenu de votre message sont utilisés pour traiter votre demande et vous répondre. N’y joignez pas de dossier administratif ni de données sensibles.</p>
      </section>
      <section>
        <h2>Liens et évolutions</h2>
        <p>En suivant un lien vers GitHub ou un autre site, vous quittez mairie360.fr. Les règles du service visité s’appliquent alors à votre navigation.</p>
        <p>Si un formulaire, une mesure d’audience ou d’autres traitements sont ajoutés, cette page sera mise à jour pour les expliquer.</p>
      </section>
    </InformationPage>
  );
}
