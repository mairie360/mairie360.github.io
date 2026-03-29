'use client';

import { TrendingDown, TrendingUp, Shield, CheckCircle, Users, FileCheck } from 'lucide-react';

const bigStats = [
  {
    icon: TrendingDown,
    number: '-30%',
    label: 'de temps perdu sur les tâches répétitives',
    color: 'from-[#2CA39D] to-green-600',
  },
  {
    icon: TrendingUp,
    number: '+40%',
    label: 'd\'efficacité dans la gestion administrative',
    color: 'from-[#005AA3] to-blue-600',
  },
];

const benefices = [
  {
    icon: Shield,
    title: 'Sécurité renforcée',
    description: 'Protection maximale des données sensibles avec chiffrement de bout en bout et conformité RGPD totale.',
  },
  {
    icon: Users,
    title: 'Meilleure collaboration',
    description: 'Les équipes travaillent ensemble de manière fluide, quel que soit leur service ou leur localisation.',
  },
  {
    icon: CheckCircle,
    title: 'Réduction des risques',
    description: 'Minimisation des risques cyber grâce à des protocoles de sécurité éprouvés et des mises à jour régulières.',
  },
  {
    icon: FileCheck,
    title: 'Traçabilité améliorée',
    description: 'Historique complet de toutes les actions pour un suivi précis et une conformité garantie.',
  },
];

export default function BeneficesSection() {
  return (
    <section id="benefices" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Des bénéfices concrets pour les collectivités
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            MAIRIE360 transforme la gestion quotidienne des mairies avec des gains
            mesurables en productivité, sécurité et satisfaction des agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {bigStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-8 md:p-12 text-white shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2`}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold mb-3">
                    {stat.number}
                  </div>
                  <p className="text-xl text-white/90 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefices.map((benefice, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-white to-[#E5E5E5]/30 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center mb-4">
                <benefice.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3F3F3F] mb-2">
                {benefice.title}
              </h3>
              <p className="text-[#3F3F3F]/70 text-sm leading-relaxed">
                {benefice.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#005AA3] to-[#2CA39D] rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Un investissement rentable pour l'avenir
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            En modernisant votre infrastructure numérique, vous investissez dans la productivité
            de vos équipes, la satisfaction de vos agents et la qualité du service public rendu aux citoyens.
          </p>
        </div>
      </div>
    </section>
  );
}
