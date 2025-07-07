import React from 'react';
import { Search, Settings, GraduationCap } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Évaluer les besoins",
      description: "Nous analysons vos processus actuels et identifions les axes d'amélioration."
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "Déployer & Intégrer",
      description: "Installation rapide et intégration seamless avec vos systèmes existants."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Former & Accompagner",
      description: "Formation complète de vos équipes et support continu pour garantir le succès."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#3C3C3C' }}>
            Comment ça marche
          </h2>
          <p className="text-xl text-gray-600">
            Un processus simple et efficace en trois étapes
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line passing through the center of icons */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon with background to cover the line */}
                  <div className="relative z-10 p-4 rounded-full mb-6 border-4 border-white" style={{ backgroundColor: '#238F8D' }}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#3C3C3C' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;