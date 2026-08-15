import { motion, useReducedMotion, type Variants } from 'motion/react';

interface SkillCategory {
  number: string;
  id: string;
  title: string;
  descriptor: string;
  accent: 'neutral' | 'systems' | 'ai' | 'security' | 'tools';
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    number: '01',
    id: 'languages',
    title: 'Programming Languages',
    descriptor: 'The foundations.',
    accent: 'neutral',
    skills: [
      'Python',
      'Go',
      'TypeScript',
      'JavaScript',
      'Java',
      'C/C++',
      'SQL',
      'Bash',
    ],
  },
  {
    number: '02',
    id: 'systems-backend',
    title: 'Systems & Backend',
    descriptor: 'Where most of my engineering lives.',
    accent: 'systems',
    skills: [
      'Distributed Systems',
      'Concurrency',
      'Multithreading',
      'System Design',
      'REST APIs',
      'FastAPI',
      'Django',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Celery',
    ],
  },
  {
    number: '03',
    id: 'ai-retrieval',
    title: 'AI/ML & Retrieval',
    descriptor: 'Models, retrieval, and intelligent workflows.',
    accent: 'ai',
    skills: [
      'Machine Learning',
      'PyTorch',
      'BERT',
      'Natural Language Processing',
      'Information Retrieval',
      'Large Language Models',
      'AI Agents',
      'LLM Orchestration',
      'Pandas',
      'Scikit-learn',
    ],
  },
  {
    number: '04',
    id: 'security-engineering',
    title: 'Security Engineering',
    descriptor: 'Security as part of the architecture.',
    accent: 'security',
    skills: [
      'Threat Modeling',
      'Application Security',
      'Vulnerability Management',
      'Security Testing',
      'RBAC',
      'JWT Authentication',
      'Burp Suite',
      'Metasploit',
      'Nmap',
      'Wireshark',
      'Incident Response',
    ],
  },
  {
    number: '05',
    id: 'cloud-data-tools',
    title: 'Cloud, Data & Developer Tools',
    descriptor: 'Shipping, observing, and operating software.',
    accent: 'tools',
    skills: [
      'Azure',
      'AWS',
      'Google Cloud Platform',
      'Azure Data Explorer',
      'KQL',
      'Grafana',
      'Docker',
      'Git / GitHub',
      'Unix / Linux',
      'Postman',
    ],
  },
];

const Skills = () => {
  const reducedMotion = Boolean(useReducedMotion());

  const reveal: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        hidden: { opacity: 0, y: 13, filter: 'blur(2px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const sequence: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.075 } },
  };

  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-heading">
      <div className="skills-shell">
        <motion.header
          className="skills-intro"
          data-nav-anchor="start"
          variants={sequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p className="skills-eyebrow" variants={reveal}>Skills</motion.p>
          <motion.h2 id="skills-heading" className="skills-heading" variants={reveal}>
            <span>The tools behind</span>
            <span>the work.</span>
          </motion.h2>
          <motion.p className="skills-summary" variants={reveal}>
            Languages, systems, frameworks, and platforms I’ve used across production engineering, security, and intelligent automation.
          </motion.p>
        </motion.header>

        <motion.div
          className="skills-index"
          aria-label="Technical skills by category"
          variants={sequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {skillCategories.map((category) => (
            <motion.section
              key={category.id}
              className="skill-index__row"
              data-accent={category.accent}
              aria-labelledby={`skill-category-${category.id}`}
              variants={reveal}
            >
              <header className="skill-index__header">
                <span className="skill-index__number" aria-hidden="true">{category.number}</span>
                <div>
                  <h3 id={`skill-category-${category.id}`}>{category.title}</h3>
                  <p>{category.descriptor}</p>
                </div>
              </header>

              <ul className="skill-index__list">
                {category.skills.map((skill) => (
                  <li key={skill} className="skill-index__item">
                    <span className="skill-token">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
