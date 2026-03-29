'use client';

import { Check, X, Star } from 'lucide-react';

const solutions = [
  {
    name: 'WeMagnus',
    strengths: ['Interface moderne', 'Cloud natif'],
    weaknesses: ['Coûteux', 'Limité aux grandes villes'],
    rating: 3,
  },
  {
    name: 'AGEDI',
    strengths: ['Bien établi', 'Support local'],
    weaknesses: ['Interface vieillissante', 'Peu de fonctionnalités collaboratives'],
    rating: 2,
  },
  {
    name: 'Mairistem',
    strengths: ['Complet', 'Historique solide'],
    weaknesses: ['Complexe', 'Peu d\'innovation'],
    rating: 3,
  },
  {
    name: 'MAIRIE360',
    strengths: [
      'Moderne et intuitif',
      'Modulaire et évolutif',
      'Toutes tailles de communes',
      'Interopérabilité totale',
      'Formation intégrée',
      'Support complet',
    ],
    weaknesses: [],
    rating: 5,
    highlight: true,
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
            Une comparaison objective des principales solutions du marché pour vous aider
            à faire le meilleur choix pour votre collectivité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all hover:-translate-y-2 ${
                solution.highlight
                  ? 'bg-gradient-to-br from-[#005AA3] to-[#2CA39D] text-white shadow-2xl ring-4 ring-[#2CA39D]/30'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              {solution.highlight && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  <span className="text-sm font-bold text-yellow-300">
                    RECOMMANDÉ
                  </span>
                  <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                </div>
              )}

              <h3
                className={`text-2xl font-bold mb-2 ${
                  solution.highlight ? 'text-white' : 'text-[#3F3F3F]'
                }`}
              >
                {solution.name}
              </h3>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-full rounded-full ${
                      i < solution.rating
                        ? solution.highlight
                          ? 'bg-yellow-300'
                          : 'bg-[#2CA39D]'
                        : solution.highlight
                        ? 'bg-white/20'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h4
                    className={`text-sm font-semibold mb-3 ${
                      solution.highlight ? 'text-white/90' : 'text-[#3F3F3F]'
                    }`}
                  >
                    Points forts
                  </h4>
                  <ul className="space-y-2">
                    {solution.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                            solution.highlight ? 'text-green-300' : 'text-[#2CA39D]'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            solution.highlight ? 'text-white/90' : 'text-[#3F3F3F]/80'
                          }`}
                        >
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {solution.weaknesses.length > 0 && (
                  <div>
                    <h4
                      className={`text-sm font-semibold mb-3 ${
                        solution.highlight ? 'text-white/90' : 'text-[#3F3F3F]'
                      }`}
                    >
                      Limites
                    </h4>
                    <ul className="space-y-2">
                      {solution.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <X
                            className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                              solution.highlight ? 'text-red-300' : 'text-red-500'
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              solution.highlight ? 'text-white/90' : 'text-[#3F3F3F]/80'
                            }`}
                          >
                            {weakness}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#E5E5E5]/50 rounded-2xl p-8 text-center">
          <p className="text-[#3F3F3F]/80 text-sm max-w-3xl mx-auto">
            Cette comparaison est fournie à titre informatif dans le cadre de notre projet étudiant.
            Les caractéristiques des solutions concurrentes sont basées sur des informations publiques.
          </p>
        </div>
      </div>
    </section>
  );
}
