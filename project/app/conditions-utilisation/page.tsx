export default function ConditionsUtilisation() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3F3F3F] mb-8">Conditions d'utilisation</h1>

        <div className="prose prose-lg max-w-none text-[#3F3F3F] space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant le site MAIRIE360, vous acceptez d'être lié par ces conditions d'utilisation.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Nature du service</h2>
            <p>
              MAIRIE360 est un prototype étudiant développé à titre éducatif et informatif.
              Ce site est fourni "tel quel" sans garantie d'aucune sorte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Utilisation autorisée</h2>
            <p>
              Vous acceptez d'utiliser ce site uniquement à des fins légales et autorisées.
              Vous vous engagez notamment à ne pas :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Utiliser le site de manière abusive ou frauduleuse</li>
              <li>Transmettre des contenus nuisibles ou illégaux</li>
              <li>Accéder au site par des moyens non autorisés</li>
              <li>Interférer avec le fonctionnement du site</li>
              <li>Reproduire ou copier le contenu sans permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Propriété intellectuelle</h2>
            <p>
              Tous les contenus du site, y compris les textes, images, graphiques et design,
              sont la propriété exclusive de l'équipe de projet MAIRIE360.
              Toute utilisation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Limitation de responsabilité</h2>
            <p>
              L'équipe de projet MAIRIE360 ne peut être tenue responsable de :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Les dommages directs ou indirects résultant de l'utilisation du site</li>
              <li>Les erreurs, inexactitudes ou omissions du contenu</li>
              <li>Les interruptions de service</li>
              <li>La perte de données ou les dommages à votre appareil</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Liens externes</h2>
            <p>
              Ce site peut contenir des liens vers des sites externes.
              Nous ne sommes pas responsables du contenu de ces sites externes.
              Veuillez consulter leurs conditions d'utilisation et politiques de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Modification des services</h2>
            <p>
              MAIRIE360 se réserve le droit de modifier ou d'interrompre le site à tout moment,
              avec ou sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Cessation d'accès</h2>
            <p>
              Nous nous réservons le droit de refuser l'accès ou d'interrompre le service
              pour toute violation de ces conditions d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Droit applicable</h2>
            <p>
              Ces conditions d'utilisation sont régies par la loi française.
              Tout litige sera soumis à la juridiction des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation,
              veuillez nous contacter à : mairie360@gmail.com
            </p>
          </section>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#005AA3] text-white rounded-lg font-semibold hover:bg-[#004080] transition-all"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
