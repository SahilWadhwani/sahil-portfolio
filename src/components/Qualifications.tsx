import React from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Qualifications = () => {
  const education = [
    {
      title: 'Master of Science in Computer Science',
      institution: 'University of Southern California',
      period: 'Jan 2025 - Dec 2026',
      location: 'Los Angeles, CA'
    },
    {
      title: 'Bachelor of Engineering Computer Science',
      institution: 'Pune University, India',
      period: 'Jun 2020 - May 2024',
      location: 'Pune, India'
    },
    {
      title: 'High School',
      institution: "St. Vincent's High School",
      period: '2018',
      location: 'Pune, India'
    }
  ];

  const experience = [
    {
      title: 'Associate Software Developer',
      company: 'Coditas',
      period: 'Jan 2024 - Dec 2024',
      location: 'Pune, India',
      description: 'Developed and maintained scalable RESTful APIs using Go (Golang) for high-performance backend services.'
    },
    {
      title: 'Software Development Intern (Security Engineering)',
      company: 'EzConverse Media',
      period: 'Aug 2023 - Nov 2023',
      location: 'India',
      description: 'Built a full-stack Vulnerability Management Dashboard integrating Nmap, Nikto, and React.js to automate scanning, visualize threats, and improve security triage efficiency.'
    },
    {
      title: 'Cybersecurity Intern',
      company: 'TheCyberHost',
      period: 'Jul 2023 - Aug 2023',
      location: 'India',
      description: 'Participated in a hands-on cybersecurity bootcamp with core modules in ethical hacking, vulnerability assessment, and secure web practices.'
    }
  ];

  return (
    <section id="qualifications" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Qualifications</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Education and Experience
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <ScrollReveal
                    key={index}
                    direction="zoom"
                    delay={index * 200}
                  >
                    <div className="relative pl-8 pb-8 border-l-2 border-cyan-400/30 last:border-l-0 last:pb-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full"></div>
                      <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                        <h4 className="text-xl font-semibold text-white mb-2">{edu.title}</h4>
                        <p className="text-cyan-400 font-medium mb-2">{edu.institution}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Work Experience</h3>
              </div>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <ScrollReveal
                    key={index}
                    direction="zoom"
                    delay={index * 200 + 300}
                  >
                    <div className="relative pl-8 pb-8 border-l-2 border-green-400/30 last:border-l-0 last:pb-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-green-400 rounded-full"></div>
                      <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                        <h4 className="text-xl font-semibold text-white mb-2">{exp.title}</h4>
                        <p className="text-green-400 font-medium mb-2">{exp.company}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400 text-sm mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{exp.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Qualifications;