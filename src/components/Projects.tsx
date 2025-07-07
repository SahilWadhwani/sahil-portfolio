import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const projects = [
    {
      title: 'Certificate Verification System',
      description: 'Blockchain-based DApp for certificate authenticity using smart contracts and IPFS for decentralized storage.',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Solidity', 'IPFS', 'Smart Contract', 'React'],
      category: 'Blockchain',
      codeLink: 'https://github.com/SahilWadhwani/Certificate-Verification-using-Blockchain.git'
    },
    {
      title: 'Multimodal Depression Detection System',
      description: 'Real-time AI-based system using BERT and image analysis to detect depression through multimodal data processing.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['BERT', 'FER2013', 'Flask', 'React'],
      category: 'AI/ML',
      codeLink: 'https://github.com/SahilWadhwani/Multimodal-Depression-Detection.git'
    },
    {
      title: 'Vulnerability Management System',
      description: 'Real-time dashboard for scanning, tracking, and visualizing system vulnerabilities using Nmap and Nikto.',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Node.js', 'React.js', 'Nmap', 'Nikto', 'MongoDB'],
      category: 'Cybersecurity',
      codeLink: 'https://github.com/SahilWadhwani/Vulnerability-Management-System.git'
    },
    {
      title: 'School Management System',
      description: 'Production-style full-stack admin dashboard with role-based access, authentication, and real-world school workflows.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React.js', 'Node.js', 'PostgreSQL', 'Redux Toolkit', 'MUI'],
      category: 'Full Stack',
      codeLink: 'https://github.com/SahilWadhwani/School-Management-System'
    },
    {
      title: 'RSA-AES Hybrid Encryption System',
      description: 'A command-line tool combining RSA and AES-128 for hybrid encryption using PEM-formatted keys and secure random generation.',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Python', 'Cryptography', 'RSA', 'AES', 'CLI'],
      category: 'Cybersecurity',
      codeLink: 'https://github.com/SahilWadhwani/RSA-AES-Hybrid-Encryption-System'
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Blockchain': return 'from-purple-500 to-indigo-500';
      case 'AI/ML': return 'from-green-500 to-emerald-500';
      case 'Cybersecurity': return 'from-red-500 to-pink-500';
      case 'Full Stack': return 'from-yellow-500 to-orange-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Innovative solutions spanning blockchain, AI, and cybersecurity
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal 
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 200}
            >
              <div className="group bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <ScrollReveal
                        key={tagIndex}
                        direction="zoom"
                        delay={index * 200 + tagIndex * 50}
                      >
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full border border-cyan-400/20">
                          #{tag}
                        </span>
                      </ScrollReveal>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors btn-glow"
                      >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;