'use client';

import { Radio, Clock, ClipboardCheck, FolderOpen, BookOpen, Settings, Globe, ShieldCheck } from 'lucide-react';

const fonctionnalites = [
  {
    icon: Radio,
    title: 'Communication unifiée',
    description: 'Tous vos canaux de communication centralisés en un seul endroit',
  },
  {
    icon: Clock,
    title: 'Organisation du temps',
    description: 'Planification et synchronisation des agendas de toute l\'équipe',
  },
  {
    icon: ClipboardCheck,
    title: 'Suivi des dossiers',
    description: 'Gestion complète des projets et dossiers administratifs',
  },
  {
    icon: FolderOpen,
    title: 'Gestion documentaire',
    description: 'Stockage, partage et collaboration sur tous vos documents',
  },
  {
    icon: BookOpen,
    title: 'Formation continue',
    description: 'Plateforme d\'apprentissage pour développer les compétences',
  },
  {
    icon: Settings,
    title: 'Personnalisation',
    description: 'Adaptation selon la taille et les besoins de votre commune',
  },
];

const extras = [
  {
    icon: ShieldCheck,
    title: 'Gestion des rôles et permissions',
    description: 'Contrôle précis des accès selon les fonctions de chaque agent',
  },
  {
    icon: Globe,
    title: 'Interopérabilité',
    description: 'Intégration fluide avec vos systèmes existants',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité totale',
    description: 'Respect du RGPD, RGAA, RGESN et normes publiques',
  },
];

export default function FonctionnalitesSection() {
  return (
    <section id="fonctionnalites" className="py-20 md:py-32 bg-gradient-to-b from-[#E5E5E5]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Une suite d'outils pensée pour les agents de mairie
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Des fonctionnalités complètes et intuitives pour simplifier le quotidien
            des équipes municipales et améliorer l'efficacité de votre collectivité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {fonctionnalites.map((fonctionnalite, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center mb-4">
                <fonctionnalite.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3F3F3F] mb-2">
                {fonctionnalite.title}
              </h3>
              <p className="text-[#3F3F3F]/70 text-sm">
                {fonctionnalite.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#005AA3]/5 to-[#2CA39D]/5 rounded-2xl p-8 md:p-12 border border-[#005AA3]/10">
          <h3 className="text-2xl md:text-3xl font-bold text-[#3F3F3F] mb-8 text-center">
            Et aussi...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {extras.map((extra, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <extra.icon className="h-8 w-8 text-[#005AA3]" />
                </div>
                <h4 className="text-lg font-bold text-[#3F3F3F] mb-2">
                  {extra.title}
                </h4>
                <p className="text-[#3F3F3F]/70 text-sm">
                  {extra.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
