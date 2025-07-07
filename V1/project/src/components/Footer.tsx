import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Building2, Send } from 'lucide-react';

const Footer = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
    setFormData({ nom: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#3C3C3C' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contactez-nous</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:border-transparent text-white"
                  style={{ focusRingColor: '#238F8D' }}
                  onFocus={(e) => e.target.style.borderColor = '#238F8D'}
                  onBlur={(e) => e.target.style.borderColor = '#374151'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:border-transparent text-white"
                  onFocus={(e) => e.target.style.borderColor = '#238F8D'}
                  onBlur={(e) => e.target.style.borderColor = '#374151'}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:border-transparent text-white"
                  onFocus={(e) => e.target.style.borderColor = '#238F8D'}
                  onBlur={(e) => e.target.style.borderColor = '#374151'}
                ></textarea>
              </div>
              <button
                type="submit"
                className="text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center"
                style={{ backgroundColor: '#238F8D' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e7a78'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#238F8D'}
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </button>
            </form>
          </div>

          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Building2 className="w-8 h-8 mr-3" style={{ color: '#238F8D' }} />
              <h3 className="text-2xl font-bold">Mairie360</h3>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              La solution SaaS de référence pour moderniser la gestion des mairies françaises. 
              Nous accompagnons les collectivités dans leur transformation numérique.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" style={{ color: '#238F8D' }} />
                <span>contact@mairie360.fr</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" style={{ color: '#238F8D' }} />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" style={{ color: '#238F8D' }} />
                <span>Paris, France</span>
              </div>
            </div>

            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 transition-colors"
                style={{ ':hover': { color: '#238F8D' } }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                À propos
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                Fonctionnalités
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#238F8D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                Contact
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Mairie360. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;