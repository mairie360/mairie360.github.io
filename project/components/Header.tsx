'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Problématiques', href: '#problematiques' },
  { label: 'Solution', href: '#solution' },
  { label: 'Composants', href: '#composants' },
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Bénéfices', href: '#benefices' },
  { label: 'Comparaison', href: '#comparaison' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReducedMode, setIsReducedMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsReducedMode(window.innerWidth < 1400);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    // If the target element is not present on the current page, navigate to the homepage with the hash
    // and attempt to scroll after navigation (small delay to allow the page to render).
    router.push(`/${href}`);
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  router.push('/#hero');
                }
              }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-bold text-[#3F3F3F]">MAIRIE</span>
                <span className="text-2xl md:text-3xl font-bold text-[#005AA3]">360</span>
              </div>
            </a>
          </div>

          <nav className={`${isReducedMode ? 'hidden' : 'hidden lg:flex'} items-center gap-4 xl:gap-8`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium text-[#3F3F3F] hover:text-[#005AA3] transition-colors whitespace-nowrap px-2"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="ml-4 px-6 py-2.5 bg-[#005AA3] text-white rounded-lg font-semibold hover:bg-[#004080] transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap text-sm"
            >
              Demander une démo
            </button>
          </nav>

          <button
            className={`${isReducedMode ? 'block' : 'lg:hidden'} p-2 text-[#3F3F3F]`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`${isReducedMode ? 'block' : 'lg:hidden'} py-4 border-t border-gray-200`}>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-medium text-[#3F3F3F] hover:text-[#005AA3] transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 px-6 py-2.5 bg-[#005AA3] text-white rounded-lg font-semibold hover:bg-[#004080] transition-all text-center"
              >
                Demander une démo
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
