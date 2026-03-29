'use client';

import { Info } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-[#005AA3]/10 to-[#2CA39D]/10 border-b border-[#005AA3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-[#005AA3]" />
            <span className="text-[#3F3F3F] font-medium">
              Projet de fin d'année
            </span>
          </div>
          <span className="text-[#3F3F3F]/60">—</span>
          <span className="text-[#3F3F3F]">
            Prototype étudiant MAIRIE360 (non commercial)
          </span>
          <span className="ml-2 px-2 py-0.5 bg-[#2CA39D]/20 text-[#2CA39D] text-xs font-semibold rounded-full">
            Étudiant
          </span>
        </div>
      </div>
    </div>
  );
}
