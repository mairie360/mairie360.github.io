export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="bg-blue-600 text-white py-20 text-center mt-16">
        <h1 className="text-5xl font-bold">Mairie360</h1>
        <p className="mt-4 text-lg">La solution moderne pour optimiser la productivité des mairies.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
          Demander une démo
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">Pourquoi choisir Mairie360 ?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">Gestion documentaire</h3>
            <p className="mt-2 text-gray-600">Versionnez vos fichiers sans perte d&apos;information.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">Collaboration optimisée</h3>
            <p className="mt-2 text-gray-600">Travaillez ensemble efficacement sans conflits.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">Sécurité et conformité</h3>
            <p className="mt-2 text-gray-600">Vos données sont protégées et conformes aux normes.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-200 py-16 text-center">
        <h2 className="text-3xl font-semibold">Contactez-nous</h2>
        <p className="mt-4">Découvrez comment Mairie360 peut vous aider.</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Nous contacter
        </button>
      </section>
    </div>
  );
}
