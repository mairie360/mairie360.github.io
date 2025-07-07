import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Mairie360 a transformé notre façon de gérer les demandes citoyennes. Nous avons réduit nos délais de traitement de 40% et nos habitants sont plus satisfaits.",
      name: "Marie Dubois",
      title: "Maire de Saint-Pierre-des-Champs",
      location: "Commune de 8 500 habitants"
    },
    {
      quote: "L'interface intuitive et les modules personnalisables nous ont permis d'optimiser tous nos processus internes. Un investissement qui se rentabilise rapidement.",
      name: "Jean-Claude Martin",
      title: "Directeur Général des Services",
      location: "Mairie de Beaumont-sur-Loire"
    },
    {
      quote: "Enfin un outil qui comprend les spécificités des mairies françaises ! La formation et l'accompagnement ont été excellents.",
      name: "Sophie Rousseau",
      title: "Responsable des Affaires Générales",
      location: "Ville de Montclair"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#3C3C3C' }}>
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les témoignages de nos partenaires municipaux
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Quote className="w-8 h-8 mb-4" style={{ color: '#238F8D' }} />
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t pt-6">
                <p className="font-semibold" style={{ color: '#3C3C3C' }}>
                  {testimonial.name}
                </p>
                <p className="text-sm" style={{ color: '#0156A6' }}>
                  {testimonial.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;