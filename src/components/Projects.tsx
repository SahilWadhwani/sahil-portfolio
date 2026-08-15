import { Fragment, type PointerEvent } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from 'motion/react';

interface ProjectLinkProps {
  href: string;
  label: string;
}

const ProjectLink = ({ href, label }: ProjectLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="project-github-link"
    aria-label={label}
  >
    <Github size={15} strokeWidth={1.7} aria-hidden="true" />
    <span>GitHub</span>
    <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
  </a>
);

const TechLine = ({ items }: { items: string[] }) => (
  <p className="project-tech" aria-label={`Technologies: ${items.join(', ')}`}>
    {items.map((item) => <span key={item}>{item}</span>)}
  </p>
);

const SentinelVisual = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const frontX = useSpring(useMotionValue(0), { stiffness: 190, damping: 24, mass: 0.6 });
  const frontY = useSpring(useMotionValue(0), { stiffness: 190, damping: 24, mass: 0.6 });
  const rearX = useSpring(useMotionValue(0), { stiffness: 170, damping: 25, mass: 0.7 });
  const rearY = useSpring(useMotionValue(0), { stiffness: 170, damping: 25, mass: 0.7 });

  const moveLayers = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    frontX.set(x * 7);
    frontY.set(y * 5);
    rearX.set(x * -4);
    rearY.set(y * -3);
  };

  const resetLayers = () => {
    frontX.set(0);
    frontY.set(0);
    rearX.set(0);
    rearY.set(0);
  };

  return (
    <div className="sentinel-preview" onPointerMove={moveLayers} onPointerLeave={resetLayers}>
      <div className="sentinel-preview__ambient" aria-hidden="true" />
      <motion.div className="sentinel-preview__frame sentinel-preview__frame--rear" style={{ x: rearX, y: rearY }} aria-hidden="true">
        <img src="/projects/sentinelx-dashboard.webp" alt="" loading="lazy" decoding="async" />
      </motion.div>
      <motion.div className="sentinel-preview__frame sentinel-preview__frame--front" style={{ x: frontX, y: frontY }}>
        <span className="product-frame__bar" aria-hidden="true"><i /><i /><i /></span>
        <img
          src="/projects/sentinelx-investigation.webp"
          alt="SentinelX detection investigation showing anomalous event evidence and controlled response actions"
          loading="lazy"
          decoding="async"
        />
        <span className="product-frame__reflection" aria-hidden="true" />
      </motion.div>
    </div>
  );
};

const tradingStages = [
  { title: 'Market data', detail: 'Upstox · 96K+ instruments' },
  { title: 'Analysis', detail: 'Technical + news sentiment' },
  { title: 'Signal', detail: 'Tracked and logged' },
  { title: '10 risk gates', detail: 'Deterministic controls' },
];

const TradingArchitecture = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="trading-architecture" aria-hidden="true">
    <div className="trading-architecture__eyebrow">
      <span>Decision pipeline</span>
      <span>Paper → Shadow → Live</span>
    </div>

    <div className="trading-flow">
      {tradingStages.map((stage, index) => (
        <Fragment key={stage.title}>
          <motion.div
            className={`trading-flow__node${index === tradingStages.length - 1 ? ' trading-flow__node--gate' : ''}`}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{stage.title}</span>
            <small>{stage.detail}</small>
          </motion.div>
          {index < tradingStages.length - 1 && (
            <motion.span
              className="trading-flow__connector"
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.2 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.38, delay: reducedMotion ? 0 : 0.1 + index * 0.12 }}
            />
          )}
        </Fragment>
      ))}
    </div>

    <motion.div
      className="trading-outcomes"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="trading-outcomes__branch" aria-hidden="true" />
      <div><small>Approved</small><strong>Execute + log</strong></div>
      <div><small>Rejected</small><strong>No trade + log</strong></div>
    </motion.div>
  </div>
);

const CertificateFlow = () => (
  <div className="certificate-flow" aria-hidden="true">
    {['Certificate', 'Hash + IPFS', 'Ethereum', 'Verify'].map((item, index) => (
      <Fragment key={item}>
        <span>{item}</span>
        {index < 3 && <i>→</i>}
      </Fragment>
    ))}
  </div>
);

const Projects = () => {
  const reducedMotion = Boolean(useReducedMotion());

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

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-heading">
      <div className="projects-shell">
        <motion.header
          className="projects-intro"
          data-nav-anchor="start"
          variants={sequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p className="projects-eyebrow" variants={reveal}>Projects</motion.p>
          <motion.h2 id="projects-heading" className="projects-heading" variants={reveal}>
            <span>Ideas I took</span>
            <span>past the prototype.</span>
          </motion.h2>
          <motion.p className="projects-summary" variants={reveal}>
            A few systems I built end to end across security, intelligent automation, distributed trust, and applied machine learning.
          </motion.p>
        </motion.header>

        <div className="featured-projects">
          <motion.article
            className="featured-project"
            aria-labelledby="sentinelx-title"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
          >
            <div className="featured-project__content">
              <motion.p className="featured-project__meta" variants={reveal}>01 / Security platform</motion.p>
              <motion.h3 id="sentinelx-title" className="featured-project__title" variants={reveal}>SentinelX</motion.h3>
              <motion.p className="featured-project__subtitle" variants={reveal}>Security operations, from detection to response.</motion.p>
              <motion.p className="featured-project__description" variants={reveal}>
                A full-stack security operations platform that centralizes event ingestion, investigation, access control, and response workflows in one analyst-facing system.
              </motion.p>
              <motion.ol className="featured-project__highlights" variants={sequence}>
                <motion.li variants={reveal}>
                  <span>01</span>
                  <p>Built with Next.js 14, TypeScript, FastAPI, and PostgreSQL, separating frontend, API, services, and persistence into a modular architecture.</p>
                </motion.li>
                <motion.li variants={reveal}>
                  <span>02</span>
                  <p>Implemented Admin, Analyst, and Viewer access with JWT sessions, protected routes, and backend authorization checks.</p>
                </motion.li>
                <motion.li variants={reveal}>
                  <span>03</span>
                  <p>Built investigation and response flows around detections, events, metrics, and controlled IP blocking and unblocking.</p>
                </motion.li>
              </motion.ol>
              <motion.div className="featured-project__footer" variants={reveal}>
                <TechLine items={['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'React Query', 'JWT', 'RBAC']} />
                <ProjectLink href="https://github.com/SahilWadhwani/AI-Powered-Threat-Hunting-Incident-Response-Platform" label="View SentinelX on GitHub" />
              </motion.div>
            </div>

            <motion.div className="featured-project__visual" variants={reveal}>
              <SentinelVisual reducedMotion={reducedMotion} />
            </motion.div>
          </motion.article>

          <motion.article
            className="featured-project featured-project--reverse"
            aria-labelledby="trading-agent-title"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
          >
            <div className="featured-project__content">
              <motion.p className="featured-project__meta" variants={reveal}>02 / Autonomous system</motion.p>
              <motion.h3 id="trading-agent-title" className="featured-project__title" variants={reveal}>AI Trading Agent</motion.h3>
              <motion.p className="featured-project__subtitle" variants={reveal}>Probabilistic reasoning. Deterministic execution.</motion.p>
              <motion.p className="featured-project__description" variants={reveal}>
                An autonomous trading backend that combines market data and LLM-assisted analysis with deterministic risk controls before any execution decision.
              </motion.p>
              <motion.ol className="featured-project__highlights" variants={sequence}>
                <motion.li variants={reveal}>
                  <span>01</span>
                  <p>Built a Python system around market data, technical signals, news sentiment, scheduling, logging, and Upstox integration for stocks, ETFs, and index options.</p>
                </motion.li>
                <motion.li variants={reveal}>
                  <span>02</span>
                  <p>Indexed 96,000+ instruments dynamically with automated refresh and searchable market universes instead of hard-coded symbols.</p>
                </motion.li>
                <motion.li variants={reveal}>
                  <span>03</span>
                  <p>Separated probabilistic analysis from execution with 10 hard derivatives risk gates covering capital, loss, time, and stop-loss controls.</p>
                </motion.li>
              </motion.ol>
              <motion.div className="featured-project__footer" variants={reveal}>
                <TechLine items={['Python', 'LLMs', 'Upstox API', 'SQLite', 'Risk Controls', 'Automation']} />
                <ProjectLink href="https://github.com/SahilWadhwani/Multi-Agent-Trading-Research-Assistant-" label="View AI Trading Agent on GitHub" />
              </motion.div>
            </div>

            <motion.div className="featured-project__visual" variants={reveal}>
              <TradingArchitecture reducedMotion={reducedMotion} />
            </motion.div>
          </motion.article>
        </div>

        <div className="additional-projects-heading"><span>Selected additional work</span></div>

        <div className="additional-projects">
          <motion.article
            className="additional-project"
            aria-labelledby="certichain-title"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
          >
            <div className="additional-project__visual"><CertificateFlow /></div>
            <p className="additional-project__meta">Blockchain certificate verification</p>
            <h3 id="certichain-title">CertiChain</h3>
            <p className="additional-project__description">A decentralized certificate issuance and verification system using blockchain-backed hashes and IPFS storage to make credential validation tamper-evident.</p>
            <p className="additional-project__engineering">Built around Solidity smart contracts, a private multi-node Ethereum network, IPFS/Pinata storage, Web3.py, authentication, and cryptographic hash verification.</p>
            <div className="additional-project__footer">
              <TechLine items={['Solidity', 'Ethereum', 'IPFS', 'Web3.py', 'Python', 'Firebase', 'Docker']} />
              <ProjectLink href="https://github.com/SahilWadhwani/Certificate-Verification-using-Blockchain" label="View CertiChain on GitHub" />
            </div>
          </motion.article>

          <motion.article
            className="additional-project"
            aria-labelledby="multimodal-title"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
          >
            <div className="additional-project__visual additional-project__visual--image">
              <img src="/projects/multimodal-interface.webp" alt="Multimodal project interface for submitting text and visual inputs" loading="lazy" decoding="async" />
            </div>
            <p className="additional-project__meta">Applied ML research</p>
            <h3 id="multimodal-title">Multimodal Depression Detection</h3>
            <p className="additional-project__description">A multimodal machine-learning system combining language and visual signals to explore depression detection across different forms of input.</p>
            <p className="additional-project__engineering">Fine-tuned BERT and ResNet models behind a Flask API, with a React interface for providing text and image inputs. Built as an educational research system—not a clinical diagnostic tool.</p>
            <div className="additional-project__footer">
              <TechLine items={['Python', 'Flask', 'PyTorch', 'BERT', 'ResNet', 'React', 'TypeScript']} />
              <ProjectLink href="https://github.com/SahilWadhwani/Multimodal-Depression-Detection" label="View Multimodal Depression Detection on GitHub" />
            </div>
          </motion.article>
        </div>

        <motion.footer
          className="projects-footer"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Older experiments, coursework, and smaller builds live there too.</p>
          <a href="https://github.com/SahilWadhwani" target="_blank" rel="noopener noreferrer">
            More on GitHub <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </motion.footer>
      </div>
    </section>
  );
};

export default Projects;
