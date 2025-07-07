import React from 'react';
import { Code, Shield, Server, Brain } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Full Stack Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      direction: 'left' as const,
      skills: [
        { name: 'Python', level: 'Advanced' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'Golang', level: 'Intermediate' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Express.js', level: 'Intermediate' },
        { name: 'Flask', level: 'Advanced' },
        { name: 'React.js', level: 'Advanced' },
        { name: 'SQL', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Advanced' }
      ]
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      direction: 'right' as const,
      skills: [
        { name: 'Threat Modeling', level: 'Intermediate' },
        { name: 'Cryptography', level: 'Intermediate' },
        { name: 'Pen Testing', level: 'Intermediate' },
        { name: 'Burp Suite', level: 'Advanced' },
        { name: 'Wireshark', level: 'Intermediate' },
        { name: 'Metasploit', level: 'Intermediate' },
        { name: 'Nmap', level: 'Advanced' },
        { name: 'Nikto', level: 'Intermediate' },
        { name: 'Linux (Kali)', level: 'Advanced' },
        { name: 'OSQuery', level: 'Intermediate' },
        { name: 'SIEM (Splunk)', level: 'Intermediate' },
        { name: 'Incident Response', level: 'Intermediate' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      direction: 'left' as const,
      skills: [
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Postman', level: 'Advanced' },
        { name: 'Firebase', level: 'Intermediate' },
        { name: ' Jenkins (CI/CD)', level: 'Basic' },
        { name: 'Nginx', level: 'Intermediate' },
        { name: 'JWT', level: 'Intermediate' },
        { name: 'OpenVAS', level: 'Intermediate' },
        { name: 'AWS', level: 'Basic' }
      ]
    },
    {
      title: 'AI/ML',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      direction: 'right' as const,
      skills: [
        { name: 'BERT', level: 'Intermediate' },
        { name: 'TensorFlow', level: 'Intermediate' },
        { name: 'OpenCV', level: 'Intermediate' },
        { name: 'HuggingFace', level: 'Intermediate' },
        { name: 'Multimodal ML', level: 'Intermediate' },
        { name: 'NLP', level: 'Intermediate' },
        { name: 'PyTorch', level: 'Basic' },
        { name: 'Scikit-learn', level: 'Intermediate' },
        { name: 'Pandas', level: 'Advanced' }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Basic': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit spanning full-stack development, cybersecurity, and emerging technologies
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <ScrollReveal 
              key={category.title} 
              direction={category.direction}
              delay={index * 200}
            >
              <div className="skill-card bg-gray-800/50 rounded-xl p-8 hover:bg-gray-700/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <ScrollReveal
                      key={skill.name}
                      direction="zoom"
                      delay={index * 200 + skillIndex * 50}
                    >
                      <div className="skill-badge flex flex-col space-y-1 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                        <span className="font-medium text-white text-sm">{skill.name}</span>
                        <span className={`text-xs ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;