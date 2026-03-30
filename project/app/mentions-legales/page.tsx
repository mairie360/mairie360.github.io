export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3F3F3F] mb-8">Mentions légales</h1>

        <div className="prose prose-lg max-w-none text-[#3F3F3F] space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Informations générales</h2>
            <p>
              MAIRIE360 est un prototype étudiant développé dans le cadre d'un projet de fin d'année.
              Ce site est fourni à titre informatif et éducatif uniquement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Directeur de la publication</h2>
            <p>
              Responsable du site : Équipe de projet MAIRIE360<br />
              Contact : mairie360@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Hébergement</h2>
            <p>
              Le site est hébergé par nos serveurs de développement et de production.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Propriété intellectuelle</h2>
            <p>
              Tous les contenus (textes, images, design) présents sur ce site sont la propriété de l'équipe de projet MAIRIE360.
              Toute reproduction ou utilisation sans autorisation est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Responsabilité</h2>
            <p>
              Les informations contenues dans ce site sont fournies à titre informatif.
              L'équipe de projet ne peut être tenue responsable des erreurs, omissions ou utilisation inappropriée du contenu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Droit applicable</h2>
            <p>
              Ce site est soumis à la législation française. Les mentions légales, conditions d'utilisation
              et politique de confidentialité sont régies par la loi française.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#005AA3] mb-4">Contact</h2>
            <p>
              Pour toute question concernant ce site, veuillez nous contacter à : mairie360@gmail.com
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
