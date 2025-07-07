import React from 'react';
import { Settings, Ticket, Network } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Settings className="w-8 h-8" style={{ color: '#238F8D' }} />,
      title: "Modularité",
      description: "Personnalisez vos workflows et ajoutez uniquement les modules dont vous avez besoin."
    },
    {
      icon: <Ticket className="w-8 h-8" style={{ color: '#238F8D' }} />,
      title: "Ticketing & Formation",
      description: "Suivez les demandes de développement et formez facilement votre équipe."
    },
    {
      icon: <Network className="w-8 h-8" style={{ color: '#238F8D' }} />,
      title: "Interopérabilité",
      description: "Connectez-vous sans effort aux systèmes municipaux existants."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#3C3C3C' }}>
            Fonctionnalités clés
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Mairie360 révolutionne la gestion municipale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-gray-100">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#3C3C3C' }}>
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;