export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3F3F3F] mb-8">Politique de confidentialité</h1>

        <div className="prose prose-lg max-w-none text-[#3F3F3F] space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Introduction</h2>
            <p>
              Cette politique de confidentialité explique comment MAIRIE360 collecte, utilise et protège
              les données personnelles de ses utilisateurs. En utilisant ce site, vous acceptez les conditions
              décrites dans cette politique.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Collecte de données</h2>
            <p>
              Nous collectons les données personnelles que vous nous fournissez volontairement, notamment :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Votre nom et email via le formulaire de contact</li>
              <li>Les informations de navigation et d'utilisation du site</li>
              <li>Les cookies et données de suivi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Répondre à vos demandes de contact</li>
              <li>Améliorer l'expérience utilisateur</li>
              <li>Analyser l'utilisation du site</li>
              <li>Vous envoyer des informations pertinentes (si consentement donné)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Protection des données</h2>
            <p>
              Nous mettons en place des mesures de sécurité appropriées pour protéger vos données personnelles
              contre l'accès non autorisé, la modification ou la divulgation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience de navigation.
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Partage des données</h2>
            <p>
              Vos données personnelles ne sont pas partagées avec des tiers sans votre consentement explicite,
              sauf si la loi l'exige.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Durée de rétention</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les objectifs
              décrits dans cette politique, sauf si la loi exige une période de rétention plus longue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Vos droits</h2>
            <p>
              Vous avez le droit de :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Accéder à vos données personnelles</li>
              <li>Corriger ou mettre à jour vos données</li>
              <li>Demander la suppression de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité à tout moment.
              Les modifications seront publiées sur cette page avec la date de la dernière mise à jour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité,
              veuillez nous contacter à : contact@mairie360.fr
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
