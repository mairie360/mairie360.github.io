'use client';

import HeroSection from '@/components/sections/HeroSection';
import ProblematiquesSection from '@/components/sections/ProblematiquesSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ComposantsSection from '@/components/sections/ComposantsSection';
import FonctionnalitesSection from '@/components/sections/FonctionnalitesSection';
import BeneficesSection from '@/components/sections/BeneficesSection';
import ComparaisonSection from '@/components/sections/ComparaisonSection';
import PourQuiSection from '@/components/sections/PourQuiSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblematiquesSection />
      <SolutionSection />
      <ComposantsSection />
      <FonctionnalitesSection />
      <BeneficesSection />
      <ComparaisonSection />
      <PourQuiSection />
      <ContactSection />
    </>
  );
}
