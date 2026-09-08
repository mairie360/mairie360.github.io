import { InformationPage } from "@/components/information-page";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Conditions d’utilisation | Mairie360",
  "Découvrez le cadre d’utilisation du site vitrine Mairie360 : un projet d’école de quatre étudiants d’Epitech et des démonstrations de modules municipaux.",
  "/conditions-utilisation/",
);

export default function Terms() {
  return (
    <InformationPage title="Conditions d’utilisation">
      <section>
        <h2>Un projet pédagogique</h2>
        <p>Mairie360 est un projet d’école conçu par quatre étudiants d’Epitech. Le site mairie360.fr présente les objectifs et les modules envisagés pour une plateforme destinée aux équipes des collectivités.</p>
        <p>Pour contacter l’équipe du projet : <a href="mailto:mairie360@gmail.com">mairie360@gmail.com</a>.</p>
      </section>
      <section>
        <h2>Des démonstrations pour découvrir les modules</h2>
        <p>Les aperçus du tableau de bord, des projets, du calendrier, de la messagerie, des workflows et des formations illustrent le fonctionnement envisagé. Les personnes, tâches, dates et autres données de démonstration sont fictives.</p>
        <p>Ces aperçus permettent d’explorer le projet. Ils ne réalisent pas de démarche administrative, n’envoient pas de message et n’enregistrent pas de dossier auprès d’une collectivité.</p>
      </section>
      <section>
        <h2>Accès et évolution</h2>
        <p>La consultation du site est gratuite et ne nécessite pas de compte. Le projet est en développement : les fonctionnalités présentées et le contenu du site peuvent évoluer au fil du travail pédagogique.</p>
      </section>
      <section>
        <h2>Contenus et liens</h2>
        <p>Pour réutiliser du code publié par le projet, consultez la licence du dépôt concerné sur <a href="https://github.com/mairie360">l’espace GitHub de Mairie360</a>. La présence d’un contenu sur ce site ne constitue pas à elle seule une autorisation de réutilisation.</p>
        <p>La <Link href="/confidentialite/">page de confidentialité</Link> explique le fonctionnement du site concernant les données et son hébergement.</p>
      </section>
    </InformationPage>
  );
}
