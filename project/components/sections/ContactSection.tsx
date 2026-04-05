'use client';

import { Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#E5E5E5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Contact
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Pour toute information sur le prototype MAIRIE360, veuillez consulter nos coordonnées ci-dessous.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#2CA39D]/10 rounded-full">
            <span className="text-sm font-semibold text-[#2CA39D]">
              Rappel : Prototype étudiant (non commercial)
            </span>
          </div>
        </div>

        {/* Grille simplifiée : seule la colonne des coordonnées est conservée */}
        <div className="grid grid-cols-1 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-[#3F3F3F] mb-6">
              Nos coordonnées
            </h3>
            <p className="text-[#3F3F3F]/70 mb-8 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3F3F3F] mb-1">Email</h4>
                  <p className="text-[#3F3F3F]/70">mairie360@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3F3F3F] mb-1">Adresse</h4>
                  <p className="text-[#3F3F3F]/70">184 Chemin de la Pente Sassy</p>
                  <p className="text-[#3F3F3F]/70">97440 Saint-André, La Réunion</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-[#005AA3]/5 to-[#2CA39D]/5 rounded-xl p-6 border border-[#005AA3]/10">
              <h4 className="font-semibold text-[#3F3F3F] mb-2">Note importante</h4>
              <p className="text-sm text-[#3F3F3F]/70 leading-relaxed">
                MAIRIE360 est un projet de fin d'année réalisé dans un cadre pédagogique.
                Il s'agit d'un prototype non commercial destiné à démontrer la faisabilité
                d'une solution numérique complète pour les mairies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
