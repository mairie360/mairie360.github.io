'use client';

import { AlertTriangle, Server, Users, Shield } from 'lucide-react';

const stats = [
  { number: '78%', label: 'des mairies utilisent des logiciels obsolètes' },
  { number: '64%', label: 'jugent leurs outils peu ergonomiques' },
  { number: '52%', label: 'manquent d\'outils collaboratifs modernes' },
];

const problems = [
  {
    icon: Server,
    title: 'Logiciels obsolètes',
    description: 'Des systèmes vieillissants qui ne répondent plus aux besoins actuels',
  },
  {
    icon: Users,
    title: 'Interfaces peu ergonomiques',
    description: 'Des outils complexes qui ralentissent le travail quotidien des agents',
  },
  {
    icon: AlertTriangle,
    title: 'Manque de collaboration',
    description: 'Absence d\'outils cloud et de solutions pour travailler ensemble efficacement',
  },
  {
    icon: Shield,
    title: 'Risques de sécurité',
    description: 'Failles de sécurité et non-conformité aux normes RGPD',
  },
];

export default function ProblematiquesSection() {
  return (
    <section id="problematiques" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Les défis numériques des mairies
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Les collectivités territoriales font face à de nombreux obstacles : outils obsolètes,
            données en silos, manque d'interopérabilité et risques cybersécurité croissants.
            Il est temps de moderniser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#005AA3]/5 to-[#2CA39D]/5 rounded-2xl p-8 border border-[#005AA3]/10 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#005AA3] mb-3">
                {stat.number}
              </div>
              <p className="text-[#3F3F3F]/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center mb-4">
                <problem.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3F3F3F] mb-2">
                {problem.title}
              </h3>
              <p className="text-[#3F3F3F]/70 text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
