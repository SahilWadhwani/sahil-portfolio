import React from 'react';
import { Linkedin, Github, Instagram, Heart, Download } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-mono">
              <span className="text-white">Sahil</span>
              <span className="text-cyan-400 ml-2">Wadhwani</span>
            </div>
            <p className="text-gray-400 text-sm">
              Software Developer | Cybersecurity Engineer
            </p>
            <p className="text-gray-500 text-sm italic">
              "Code is Art. Security is Strength. Simplicity is Elegance."
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'skills', label: 'Skills' },
                { id: 'qualifications', label: 'Qualifications' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resume Download */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resume</h3>
            <a
              href="/Sahil_Wadhwani_Resume.pdf"
              download="SahilWadhwani-Resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 btn-glow"
            >
              <Download size={16} className="mr-2" />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/SahilWadhwani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-wadhwani-06848122a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-cyan-600 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/wadhwanisahil27/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-pink-600 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            © 2025 Sahil Wadhwani. Engineered with a focus on performance and security.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;