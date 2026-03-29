'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    mairie: '',
    nom: '',
    prenom: '',
    fonction: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        mairie: '',
        nom: '',
        prenom: '',
        fonction: '',
        email: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#E5E5E5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Contact & demande de démo
          </h2>
          <p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Vous souhaitez en savoir plus sur MAIRIE360 ou obtenir une démonstration personnalisée ?
            Contactez-nous dès maintenant.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#2CA39D]/10 rounded-full">
            <span className="text-sm font-semibold text-[#2CA39D]">
              Rappel : Prototype étudiant (non commercial)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-[#3F3F3F] mb-6">
              Nos coordonnées
            </h3>
            <p className="text-[#3F3F3F]/70 mb-8 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans votre projet de transformation numérique.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3F3F3F] mb-1">Email</h4>
                  <p className="text-[#3F3F3F]/70">contact@mairie360.fr</p>
                  <p className="text-[#3F3F3F]/70">demo@mairie360.fr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3F3F3F] mb-1">Téléphone</h4>
                  <p className="text-[#3F3F3F]/70">01 23 45 67 89</p>
                  <p className="text-[#3F3F3F]/70 text-sm">Lun-Ven : 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3F3F3F] mb-1">Adresse</h4>
                  <p className="text-[#3F3F3F]/70">123 Avenue de la République</p>
                  <p className="text-[#3F3F3F]/70">75001 Paris, France</p>
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

          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#3F3F3F] mb-6">
                Demander une démonstration
              </h3>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Message envoyé !
                  </h4>
                  <p className="text-green-700">
                    Merci pour votre intérêt. Nous vous contacterons très prochainement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="mairie"
                      className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                    >
                      Nom de la mairie *
                    </label>
                    <input
                      type="text"
                      id="mairie"
                      name="mairie"
                      value={formData.mairie}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all"
                      placeholder="Ex: Mairie de Beauville"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nom"
                        className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                      >
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all"
                        placeholder="Dupont"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="prenom"
                        className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                      >
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all"
                        placeholder="Marie"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="fonction"
                      className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                    >
                      Fonction *
                    </label>
                    <input
                      type="text"
                      id="fonction"
                      name="fonction"
                      value={formData.fonction}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all"
                      placeholder="Ex: Secrétaire général(e)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all"
                      placeholder="marie.dupont@mairie-beauville.fr"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#3F3F3F] mb-2"
                    >
                      Message / Besoins
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005AA3] focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez vos besoins ou posez vos questions..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#005AA3] to-[#2CA39D] text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Envoyer ma demande
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
