'use client';

import { Check } from 'lucide-react';

const strengths = [
  {
    title: 'Moderne et intuitif',
    description: "Une interface claire, pensée pour des équipes terrain. Prise en main rapide, sans formation lourde.",
  },
  {
    title: 'Modulaire et évolutif',
    description: "Activez uniquement les modules utiles aujourd’hui. Ajoutez-en d’autres au fil de vos besoins.",
  },
  {
    title: 'Interopérabilité et conformité',
    description: "Conçu pour s’intégrer à votre écosystème (outils existants) et respecter les exigences RGPD.",
  },
  {
    title: 'Formation intégrée pour les agents',
    description: "Un module e-learning intégré : parcours courts, pas-à-pas et quiz pour former et onboarder.",
  },
  {
    title: 'Sécurité et respect des normes publiques',
    description: "Gestion des rôles, traçabilité et accès maîtrisés. Sécurité pensée pour les usages du service public.",
  },
];

export default function ComparaisonSection() {
  return (
    <section id="comparaison" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Comment MAIRIE360 se positionne
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Nos points forts, pensés pour les collectivités territoriales.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#2CA39D] rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#3F3F3F] mb-1">{item.title}</h4>
                <p className="text-[#3F3F3F]/70 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
