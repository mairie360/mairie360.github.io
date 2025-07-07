import React from 'react';
import { Zap, Eye, Shuffle } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" style={{ color: '#0156A6' }} />,
      title: "Efficacité",
      description: "Automatisez les tâches répétitives et réduisez les délais de traitement."
    },
    {
      icon: <Eye className="w-8 h-8" style={{ color: '#0156A6' }} />,
      title: "Transparence",
      description: "Tenez les citoyens informés et engagés dans la vie municipale."
    },
    {
      icon: <Shuffle className="w-8 h-8" style={{ color: '#0156A6' }} />,
      title: "Flexibilité",
      description: "Adaptez-vous et faites évoluer la solution selon les besoins de votre commune."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#3C3C3C' }}>
            Pourquoi choisir Mairie360 ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre plateforme transforme la relation entre les mairies, leurs agents et les citoyens, 
            en offrant une solution complète qui s'adapte aux défis modernes de l'administration municipale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#3C3C3C' }}>
                {benefit.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;