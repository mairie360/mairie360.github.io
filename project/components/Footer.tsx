'use client';

import { Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3F3F3F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">MAIRIE</span>
              <span className="text-2xl font-bold text-[#2CA39D]">360</span>
            </div>
            <p className="text-white/80 text-sm">
              La solution qui fait le tour complet des mairies.
            </p>
            <p className="text-white/60 text-xs mt-3">
              Projet de fin d'année – Prototype étudiant
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/mentions-legales" className="hover:text-[#2CA39D] transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="hover:text-[#2CA39D] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-utilisation" className="hover:text-[#2CA39D] transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/Mairie360/61581860548366/"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2CA39D] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/mairie360/"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2CA39D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:mairie360@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2CA39D] transition-colors"
                aria-label="Email"
                title="Envoyer un e‑mail à la Mairie"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 text-center text-sm text-white/60">
          <p>
            © {currentYear} MAIRIE360. Projet de fin d'année – Prototype étudiant. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
