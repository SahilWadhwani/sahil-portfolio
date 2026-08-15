import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';

type ExperienceId = 'microsoft' | 'nowfluence' | 'coditas' | 'ezconverse';

interface EarlierExperience {
  id: Exclude<ExperienceId, 'microsoft'>;
  year: string;
  period: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  proof: string;
  details: string[];
  technologies: string[];
}

const microsoftMetrics = [
  { value: '6.4M+', label: 'daily device records' },
  { value: '76.5M', label: 'records analyzed' },
  { value: 'Hours → Minutes', label: 'corrected P95 latency' },
];

const microsoftImpacts = [
  {
    number: '01',
    title: 'Pipeline & reliability',
    description: 'Architected a globally distributed Python + Azure Data Explorer telemetry pipeline processing 6.4M+ daily records with 94.4% reliability across 6 regions.',
  },
  {
    number: '02',
    title: 'Latency modeling',
    description: 'Built a KQL root-cause engine over 76.5M records, correcting reported P95 latency from hours to minutes and helping define onboarding SLOs.',
  },
  {
    number: '03',
    title: 'Analytics & defects',
    description: 'Pre-computed aggregates for sub-second Grafana dashboards, expanded history from 30 to 365 days, and surfaced 2 critical production defects.',
  },
];

const microsoftTech = ['Python', 'KQL', 'Azure Data Explorer', 'Grafana', 'Distributed Telemetry', 'Observability'];

const earlierExperiences: EarlierExperience[] = [
  {
    id: 'nowfluence',
    year: '2026',
    period: 'Feb 2026 — May 2026',
    company: 'nowfluence',
    role: 'Software Engineer Intern',
    location: 'Los Angeles, CA',
    summary: 'Owned backend work for an AI-assisted influencer discovery platform across information retrieval, API performance, asynchronous workflows, and AWS infrastructure.',
    proof: 'Built Django/PostgreSQL search flows, improved reliability with Redis + Celery, and integrated OpenAI-assisted processing with deterministic fallbacks.',
    details: [
      'Built and deployed the discovery backend with Django, PostgreSQL, and AWS ECS, developing scalable information-retrieval flows for creator search and ranking.',
      'Improved API responsiveness and fault tolerance under load using multi-layer Redis caching and asynchronous Celery workflows.',
      'Integrated OpenAI-assisted processing with deterministic fallbacks and supporting AWS services for reliable automated workflows.',
    ],
    technologies: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'AWS ECS', 'OpenAI'],
  },
  {
    id: 'coditas',
    year: '2024',
    period: 'Jan 2024 — Dec 2024',
    company: 'Coditas',
    role: 'Associate Software Developer',
    location: 'Pune, India',
    summary: 'Built backend services for a latency-sensitive stock trading platform, working across Go service architecture, concurrency, caching, and database performance.',
    proof: 'Processed 10,000+ daily transactions and reduced downstream analytics query latency by 25% using PostgreSQL optimization, Redis, and Go goroutines.',
    details: [
      'Engineered Go and PostgreSQL backend services processing 10,000+ daily transactions and consolidated fragmented microservices into a more unified architecture.',
      'Reduced downstream analytics query latency by 25% through PostgreSQL query optimization, Redis caching, and parallel execution with Go goroutines.',
    ],
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Goroutines', 'REST APIs'],
  },
  {
    id: 'ezconverse',
    year: '2023',
    period: 'Aug 2023 — Nov 2023',
    company: 'EzConverse Media',
    role: 'Software Development Intern (Security)',
    location: 'India',
    summary: 'Built vulnerability-management software and worked directly on application security, remediation workflows, threat modeling, and API hardening.',
    proof: 'Reduced manual incident triage time by 30% and identified/remediated 10+ critical vulnerabilities.',
    details: [
      'Engineered a full-stack Vulnerability Management System with React.js, Node.js, and MongoDB, automating remediation workflows through secure REST APIs and reducing manual incident reporting and triage time by 30%.',
      'Identified and remediated 10+ critical vulnerabilities through threat modeling and security testing with Burp Suite and Metasploit, hardening APIs with RBAC, JWT authentication, input validation, and audit logging.',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Burp Suite', 'Metasploit', 'RBAC', 'JWT'],
  },
];

const chronology = [
  { id: 'microsoft' as const, year: '2026', company: 'Microsoft' },
  ...earlierExperiences.map(({ id, year, company }) => ({ id, year, company })),
];

interface CompactExperienceRowProps {
  experience: EarlierExperience;
  reducedMotion: boolean;
  reveal: Variants;
  registerNode: (id: ExperienceId, node: HTMLElement | null) => void;
}

const TechnologyLine = ({ technologies }: { technologies: string[] }) => (
  <p className="experience-tech" aria-label={`Technologies: ${technologies.join(', ')}`}>
    {technologies.map((technology) => <span key={technology}>{technology}</span>)}
  </p>
);

const CompactExperienceRow = ({ experience, reducedMotion, reveal, registerNode }: CompactExperienceRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const titleId = `${detailsId}-title`;

  return (
    <motion.article
      id={`experience-${experience.id}`}
      ref={(node) => registerNode(experience.id, node)}
      className="experience-compact-row"
      data-experience-id={experience.id}
      aria-labelledby={titleId}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <header className="experience-compact-head">
        <p className="experience-period">{experience.period}</p>
        <div className="experience-compact-identity">
          <h3 id={titleId} className="experience-compact-company">{experience.company}</h3>
          <p className="experience-compact-role">{experience.role}</p>
        </div>
        <p className="experience-location">{experience.location}</p>
      </header>

      <div className="experience-compact-body">
        <p className="experience-compact-summary">{experience.summary}</p>
        <p className="experience-compact-proof">{experience.proof}</p>
      </div>

      <div className="experience-compact-footer">
        <TechnologyLine technologies={experience.technologies} />
        <button
          type="button"
          className="experience-details-trigger"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((current) => !current)}
        >
          <span>{expanded ? 'Hide details' : 'Details'}</span>
          <motion.span
            className="experience-details-chevron"
            aria-hidden="true"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChevronDown size={14} strokeWidth={1.7} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={detailsId}
            className="experience-details-region"
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.08 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const Experience = () => {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeExperience, setActiveExperience] = useState<ExperienceId>('microsoft');
  const articleNodes = useRef<Partial<Record<ExperienceId, HTMLElement>>>({});

  const reveal: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(2px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] } },
      };

  const sequence: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } },
  };

  const registerNode = (id: ExperienceId, node: HTMLElement | null) => {
    if (node) articleNodes.current[id] = node;
    else delete articleNodes.current[id];
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = visibleEntry?.target.getAttribute('data-experience-id') as ExperienceId | null;
        if (id) setActiveExperience(id);
      },
      { rootMargin: '-30% 0px -48% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    );

    const nodes = Object.values(articleNodes.current);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToExperience = (id: ExperienceId) => {
    articleNodes.current[id]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section id="experience" className="experience-section relative" aria-labelledby="experience-heading">
      <div className="experience-shell">
        <motion.header
          className="experience-intro"
          data-nav-anchor="start"
          variants={sequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="experience-eyebrow" variants={reveal}>Experience</motion.p>
          <motion.h2 id="experience-heading" className="experience-heading" variants={reveal}>
            <span>Systems I’ve built.</span>
            <span>Problems I’ve owned.</span>
          </motion.h2>
          <motion.p className="experience-summary" variants={reveal}>
            Production telemetry, information retrieval, low-latency backends, and security tooling across teams where reliability and real-world impact mattered.
          </motion.p>
        </motion.header>

        <div className="experience-layout">
          <nav className="experience-index" aria-label="Experience chronology">
            <ol>
              {chronology.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="experience-index__item"
                    data-active={activeExperience === item.id}
                    aria-current={activeExperience === item.id ? 'true' : undefined}
                    onClick={() => scrollToExperience(item.id)}
                  >
                    {activeExperience === item.id && (
                      <motion.span
                        className="experience-index__indicator"
                        layoutId="experience-index-indicator"
                        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 34 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="experience-index__year">{item.year}</span>
                    <span className="experience-index__company">{item.company}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="experience-chapters">
            <motion.article
              id="experience-microsoft"
              ref={(node) => registerNode('microsoft', node)}
              data-experience-id="microsoft"
              className="experience-article experience-featured"
              aria-labelledby="experience-microsoft-title"
              variants={sequence}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              <motion.header className="experience-chapter-head" variants={reveal}>
                <p className="experience-period">May 2026 — Aug 2026</p>
                <p className="experience-location">Redmond, WA</p>
                <h3 id="experience-microsoft-title" className="experience-company">Microsoft</h3>
                <p className="experience-role">Software Engineer Intern</p>
              </motion.header>

              <motion.p className="experience-narrative" variants={reveal}>
                Worked on production telemetry and latency observability for large-scale device onboarding, building the data pipeline, latency model, and self-service analytics used to separate actual service delays from measurement noise.
              </motion.p>

              <motion.dl className="experience-metrics" variants={reveal}>
                {microsoftMetrics.map((metric) => (
                  <div className="experience-metric" key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.ol className="experience-featured-impacts" variants={sequence}>
                {microsoftImpacts.map((impact) => (
                  <motion.li key={impact.number} variants={reveal}>
                    <span className="experience-impact__number">{impact.number}</span>
                    <h4>{impact.title}</h4>
                    <p>{impact.description}</p>
                  </motion.li>
                ))}
              </motion.ol>

              <motion.div variants={reveal}>
                <TechnologyLine technologies={microsoftTech} />
              </motion.div>
            </motion.article>

            <div className="experience-earlier-heading">
              <span>Selected earlier work</span>
            </div>

            <div className="experience-earlier-work">
              {earlierExperiences.map((experience) => (
                <CompactExperienceRow
                  key={experience.id}
                  experience={experience}
                  reducedMotion={reducedMotion}
                  reveal={reveal}
                  registerNode={registerNode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
