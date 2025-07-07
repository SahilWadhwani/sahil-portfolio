import React from 'react';
import { Download, MessageCircle, Linkedin, Github, Instagram } from 'lucide-react';
import TerminalHero from './TerminalHero';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sahil</span>
              </h1>
            </div>

            {/* Terminal Animation */}
            <TerminalHero />

            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              I am a passionate software developer with a deep focus on building secure systems and exploring the intersection of AI and cybersecurity. My expertise spans secure coding practices, AI development, and safeguarding applications against emerging threats.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/sahil-wadhwani-06848122a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-cyan-600 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 animate-shadow-pulse"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/SahilWadhwani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg animate-shadow-pulse animation-delay-200"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.instagram.com/wadhwanisahil27/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-pink-600 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25 animate-shadow-pulse animation-delay-400"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/Sahil_Wadhwani_Resume.pdf"
                download="SahilWadhwani-Resume.pdf"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 btn-glow"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={20} className="mr-2" />
                Let's Connect
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-300">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img
                    src="/SahilPhoto.jpg"
                    alt="Sahil Wadhwani"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full animate-float animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
