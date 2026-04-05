'use client';

import { ArrowRight, Mail, Calendar, FolderKanban, GraduationCap, MessageCircle, FileText } from 'lucide-react';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-white to-[#E5E5E5]/30 pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#2CA39D]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#005AA3]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2CA39D]/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-[#2CA39D]">
                Suite numérique pour les mairies
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F3F3F] mb-6 leading-tight">
              MAIRIE<span className="text-[#005AA3]">360</span> : la solution qui fait le tour complet des mairies
            </h1>

            <p className="text-lg text-[#3F3F3F]/80 mb-8 leading-relaxed">
              Centralisez tous vos outils internes, améliorez la collaboration entre services et garantissez la sécurité de vos données. MAIRIE360 est la plateforme numérique complète conçue pour moderniser la gestion des collectivités françaises, en toute conformité avec le RGPD et les normes publiques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('composants')}
                className="px-8 py-4 border-2 border-[#005AA3] text-[#005AA3] rounded-lg font-semibold hover:bg-[#005AA3] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Découvrir les fonctionnalités
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-xl p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Tableau de bord</h3>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Vue d'ensemble de votre mairie</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <Mail className="h-8 w-8 text-[#005AA3] mb-2" />
                  <h4 className="font-semibold text-[#3F3F3F] text-sm mb-1">Emails</h4>
                  <p className="text-xs text-[#3F3F3F]/60">12 nouveaux</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <Calendar className="h-8 w-8 text-[#2CA39D] mb-2" />
                  <h4 className="font-semibold text-[#3F3F3F] text-sm mb-1">Calendrier</h4>
                  <p className="text-xs text-[#3F3F3F]/60">3 réunions</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <FolderKanban className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-[#3F3F3F] text-sm mb-1">Projets</h4>
                  <p className="text-xs text-[#3F3F3F]/60">5 en cours</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <GraduationCap className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-semibold text-[#3F3F3F] text-sm mb-1">Formation</h4>
                  <p className="text-xs text-[#3F3F3F]/60">2 modules</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-float">
                <MessageCircle className="h-6 w-6 text-[#2CA39D] mb-1" />
                <p className="text-xs font-semibold text-[#3F3F3F]">Chat actif</p>
              </div>

              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-200">
                <FileText className="h-6 w-6 text-[#005AA3] mb-1" />
                <p className="text-xs font-semibold text-[#3F3F3F]">Documents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
