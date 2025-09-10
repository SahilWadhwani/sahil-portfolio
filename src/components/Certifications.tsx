import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Certifications = () => {
  const certifications = [
    {
      name: 'CEHv12 – Certified Ethical Hacker',
      issuer: 'EC-Council',
      category: 'Cybersecurity',
      link: 'https://drive.google.com/file/d/14w9ix9qog_alqgQY6fCYx8bL2hXXwsbZ/view?usp=sharing'
    },
    {
      name: 'CCNA – Cisco Certified Network Associate',
      issuer: 'Sysap Technologies',
      category: 'Networking',
      link: 'https://drive.google.com/file/d/1mgkPnKxwqJQ4kqqByh9fu5mjmA-5oRmQ/view?usp=sharing'
    },
    {
      name: 'Security Engineer Learning Path',
      issuer: 'TryHackMe',
      category: 'Cybersecurity',
      link: 'https://drive.google.com/file/d/1wxmZ0VVkDeTWFXFjVKwWEHcqUPsQCTcQ/view?usp=drive_link'
    },
    {
      name: 'AWS Security Fundamentals',
      issuer: 'Amazon Web Services',
      category: 'Cybersecurity',
      link: 'https://drive.google.com/file/d/1vhHoo-Rk1vtEsLnzUdkSaSrXBYWobSRf/view?usp=drive_link'
    },
    {
      name: 'Goethe Zertifikat B1',
      issuer: 'Goethe-Institut',
      category: 'German Language',
      link: 'https://drive.google.com/file/d/1JCPyt5Vbt2J1J9YcM8FT_da0jRGVwYY5/view?usp=sharing'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cybersecurity': return 'from-red-500 to-pink-500';
      case 'Networking': return 'from-blue-500 to-cyan-500';
      case 'German Language': return 'from-purple-500 to-indigo-500';
      case 'Development': return 'from-green-500 to-emerald-500';
      case 'DevOps': return 'from-orange-500 to-yellow-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Certifications</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional certifications validating expertise across cybersecurity and development
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 100}
            >
              <div className="group bg-gray-800/50 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(cert.category)}`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Verify Certificate"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ) : (
                    <ExternalLink className="w-5 h-5 text-gray-600/40 cursor-not-allowed" />
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3">{cert.issuer}</p>
                
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(cert.category)} text-white`}>
                  {cert.category}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;