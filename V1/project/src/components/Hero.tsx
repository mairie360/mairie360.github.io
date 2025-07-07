import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full" style={{ backgroundColor: '#238F8D' }}>
            <Building2 className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#3C3C3C' }}>
          Mairie360 : La gestion moderne des mairies
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-light" style={{ color: '#0156A6' }}>
          Modulaire. Transparent. Citoyen-centric.
        </p>
        
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          Transformez votre administration municipale avec notre plateforme SaaS intuitive, 
          conçue spécifiquement pour les mairies françaises.
        </p>
        
        <button 
          className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto group"
          style={{ backgroundColor: '#0156A6' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#014a94'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0156A6'}
        >
          Demandez une démo
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;