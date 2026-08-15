import { ExternalLink } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const education = [
  {
    number: '01',
    institution: 'University of Southern California',
    degree: 'Master of Science in Computer Science',
    period: 'Jan 2025 — Dec 2026',
    location: 'Los Angeles, CA',
    gpa: '3.71 / 4.0',
    expected: 'Expected Dec 2026',
    coursework: 'Distributed Systems · Algorithms · Software Engineering for Security · Web Technologies',
  },
  {
    number: '02',
    institution: 'Pune University',
    degree: 'Bachelor of Engineering in Computer Science',
    period: 'Jun 2020 — May 2024',
    location: 'Pune, India',
    gpa: '9.04 / 10.0',
    coursework: 'Data Structures & Algorithms · Database Management Systems · Object-Oriented Programming',
  },
];

const credentials = [
  {
    name: 'CEH v12',
    detail: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    priority: 'primary',
    link: 'https://drive.google.com/file/d/14w9ix9qog_alqgQY6fCYx8bL2hXXwsbZ/view?usp=sharing',
  },
  {
    name: 'CCNA',
    detail: 'Cisco Certified Network Associate',
    issuer: 'Sysap Technologies',
    priority: 'primary',
    link: 'https://drive.google.com/file/d/1mgkPnKxwqJQ4kqqByh9fu5mjmA-5oRmQ/view?usp=sharing',
  },
  {
    name: 'Security Engineer Learning Path',
    issuer: 'TryHackMe',
    priority: 'secondary',
    link: 'https://drive.google.com/file/d/1wxmZ0VVkDeTWFXFjVKwWEHcqUPsQCTcQ/view?usp=drive_link',
  },
  {
    name: 'AWS Security Fundamentals',
    issuer: 'Amazon Web Services',
    priority: 'secondary',
    link: 'https://drive.google.com/file/d/1vhHoo-Rk1vtEsLnzUdkSaSrXBYWobSRf/view?usp=drive_link',
  },
  {
    name: 'Goethe-Zertifikat B1',
    issuer: 'Goethe-Institut',
    priority: 'tertiary',
    link: 'https://drive.google.com/file/d/1JCPyt5Vbt2J1J9YcM8FT_da0jRGVwYY5/view?usp=sharing',
  },
];

const EducationCredentials = () => {
  const reducedMotion = Boolean(useReducedMotion());

  const reveal: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        hidden: { opacity: 0, y: 11, filter: 'blur(2px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const sequence: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.075 } },
  };

  return (
    <section id="education" className="education-section" aria-labelledby="education-heading">
      <div className="education-shell">
        <motion.header
          className="education-intro"
          data-nav-anchor="start"
          variants={sequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p className="education-eyebrow" variants={reveal}>Education & Credentials</motion.p>
          <motion.h2 id="education-heading" className="education-heading" variants={reveal}>
            <span>The foundation</span>
            <span>behind the work.</span>
          </motion.h2>
          <motion.p className="education-summary" variants={reveal}>
            Graduate study in computer science, backed by foundations in systems, algorithms, security, and software engineering.
          </motion.p>
        </motion.header>

        <div className="education-layout">
          <motion.section
            className="education-column"
            aria-labelledby="education-column-title"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <motion.h3 id="education-column-title" className="education-column__label" variants={reveal}>Education</motion.h3>
            <div className="education-ledger">
              {education.map((item) => (
                <motion.article className="education-entry" key={item.institution} variants={reveal}>
                  <span className="education-entry__number" aria-hidden="true">{item.number}</span>
                  <div className="education-entry__content">
                    <div className="education-entry__title-row">
                      <h4>{item.institution}</h4>
                      {item.expected && <span className="education-entry__expected">{item.expected}</span>}
                    </div>
                    <p className="education-entry__degree">{item.degree}</p>
                    <p className="education-entry__meta">
                      <span>{item.period}</span>
                      <span>{item.location}</span>
                    </p>
                    <p className="education-entry__gpa"><span>GPA</span>{item.gpa}</p>
                    <p className="education-entry__coursework"><span>Selected coursework</span> · {item.coursework}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="credentials-column"
            aria-labelledby="credentials-column-title"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <motion.h3 id="credentials-column-title" className="education-column__label" variants={reveal}>Selected Credentials</motion.h3>
            <motion.ul className="credentials-list" variants={sequence}>
              {credentials.map((credential) => (
                <motion.li key={credential.name} variants={reveal}>
                  <a
                    href={credential.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="credential-row"
                    data-priority={credential.priority}
                    aria-label={`View ${credential.name} certificate`}
                  >
                    <span className="credential-row__content">
                      <strong>{credential.name}</strong>
                      {credential.detail && <span>{credential.detail}</span>}
                      <small>{credential.issuer}</small>
                    </span>
                    <ExternalLink className="credential-row__icon" size={15} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        </div>
      </div>
    </section>
  );
};

export default EducationCredentials;
