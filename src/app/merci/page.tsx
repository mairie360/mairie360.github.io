import Link from "next/link";
import { InformationPage } from "@/components/information-page";
import { Arrow } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { contactAddress } from "@/lib/contact";

export const metadata = {
  ...pageMetadata("Merci pour votre message | Mairie360", "Votre message a été pris en charge pour être transmis à l’équipe du projet Mairie360.", "/merci/"),
  robots: { index: false, follow: true },
};

export default function ThankYou() {
  return (
    <InformationPage title="Merci pour votre message !" showUpdated={false}>
      <section>
        <h2>Votre message a été pris en charge.</h2>
        <p>Votre message est en route vers l’équipe Mairie360. Nous vous répondrons à l’adresse e-mail indiquée dans le formulaire.</p>
        <p>Vous pouvez aussi nous joindre à <a href={`mailto:${contactAddress}`}>{contactAddress}</a>.</p>
        <Link className="text-link" href="/#modules">Continuer à découvrir les modules <Arrow /></Link>
      </section>
    </InformationPage>
  );
}
