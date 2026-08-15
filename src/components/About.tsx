import { useState, type PointerEvent } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

type LensId = 'systems' | 'security' | 'intelligence';

interface EngineeringLens {
  id: LensId;
  number: string;
  title: string;
  line: string;
  description: string;
}

const lenses: EngineeringLens[] = [
  {
    id: 'systems',
    number: '01',
    title: 'Systems',
    line: 'Build it to scale.',
    description: 'Backend architecture, distributed systems, data pipelines, concurrency, performance, reliability, and the infrastructure that keeps software working beyond the happy path.',
  },
  {
    id: 'security',
    number: '02',
    title: 'Security',
    line: 'Design for failure and abuse.',
    description: 'Threat modeling, secure APIs, access control, vulnerability management, authentication, and treating security as part of the architecture rather than a final checklist.',
  },
  {
    id: 'intelligence',
    number: '03',
    title: 'Intelligence',
    line: 'Automate without losing control.',
    description: 'Information retrieval, machine learning, LLM orchestration, AI-assisted workflows, and combining probabilistic systems with deterministic safeguards where reliability matters.',
  },
];

const LensMotif = ({ id, active, reduced }: { id: LensId; active: boolean; reduced: boolean }) => {
  if (id === 'systems') {
    return (
      <svg viewBox="0 0 140 48" className="about-lens__motif-svg" aria-hidden="true">
        <path d="M8 30 C38 30 44 17 72 17 S104 27 132 14" />
        <circle cx="8" cy="30" r="2" />
        <circle cx="132" cy="14" r="2" />
        <motion.circle
          key={active ? 'systems-active' : 'systems-idle'}
          r="2.5"
          fill="currentColor"
          initial={reduced ? false : { cx: 8, cy: 30, opacity: 0 }}
          animate={active && !reduced
            ? { cx: [8, 45, 78, 106, 132], cy: [30, 23, 17, 25, 14], opacity: [0, 0.9, 0.75, 0.86, 0] }
            : { cx: 72, cy: 17, opacity: reduced ? 0.7 : 0 }}
          transition={active && !reduced ? { duration: 1.15, ease: 'easeInOut' } : { duration: 0.2 }}
        />
      </svg>
    );
  }

  if (id === 'security') {
    return (
      <svg viewBox="0 0 140 48" className="about-lens__motif-svg" aria-hidden="true">
        <motion.path
          d="M31 41 C17 22 34 5 66 6 C103 6 126 19 119 39"
          initial={reduced ? false : { pathLength: 0.3, opacity: 0.35 }}
          animate={{ pathLength: active || reduced ? 1 : 0.52, opacity: active ? 0.9 : 0.45 }}
          transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <circle cx="31" cy="41" r="2" />
        <circle cx="119" cy="39" r="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 140 48" className="about-lens__motif-svg" aria-hidden="true">
      <motion.path
        d="M14 32 C38 7 59 40 82 17 C98 2 113 20 128 11"
        initial={reduced ? false : { pathLength: 0.25, opacity: 0.25 }}
        animate={{ pathLength: active || reduced ? 1 : 0.55, opacity: active ? 0.78 : 0.34 }}
        transition={reduced ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      />
      {[
        { cx: 14, cy: 32 },
        { cx: 52, cy: 25 },
        { cx: 82, cy: 17 },
        { cx: 108, cy: 15 },
        { cx: 128, cy: 11 },
      ].map((node, index) => (
        <motion.circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r={index === 2 ? 2.5 : 1.8}
          initial={reduced ? false : { opacity: 0.35, scale: 0.8 }}
          animate={{ opacity: active ? 0.9 : 0.42, scale: active || reduced ? 1 : 0.82 }}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: active ? index * 0.045 : 0 }}
          style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
        />
      ))}
    </svg>
  );
};

const About = () => {
  const reducedMotion = Boolean(useReducedMotion());
  const [previewLens, setPreviewLens] = useState<LensId | null>(null);

  const revealItem: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.18 } } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(2px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] } },
      };

  const leftSequence: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } },
  };

  const rowSequence: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reducedMotion ? 0 : 0.08, staggerChildren: reducedMotion ? 0 : 0.08 } },
  };

  const previewWithPointer = (event: PointerEvent<HTMLButtonElement>, id: LensId) => {
    if (event.pointerType === 'mouse') setPreviewLens(id);
  };

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout" data-nav-anchor="center">
        <motion.div
          className="about-narrative"
          variants={leftSequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          <motion.p className="about-eyebrow" variants={revealItem}>About</motion.p>
          <motion.h2 id="about-heading" className="about-heading" variants={revealItem}>
            <span>One engineer.</span>
            <span>Three lenses.</span>
          </motion.h2>

          <motion.div className="about-copy" variants={leftSequence}>
            <motion.p className="about-copy__lead" variants={revealItem}>
              I’m a software engineer who likes working where systems, security, and intelligence overlap. My work has taken me from production telemetry and latency analysis at Microsoft to backend and information-retrieval systems, low-latency services, security tooling, and AI-assisted workflows.
            </motion.p>
            <motion.p variants={revealItem}>
              What connects all of it is how I like to solve problems. I care about how a system behaves under load, where it can fail or be abused, and where automation can remove unnecessary work without making the system unpredictable.
            </motion.p>
            <motion.p variants={revealItem}>
              I’m currently pursuing my MS in Computer Science at USC. I’m comfortable moving across the stack, but I’m most interested in problems where strong engineering fundamentals, security thinking, and intelligent automation come together.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-lenses"
          aria-label="Three parts of Sahil's engineering approach"
          variants={rowSequence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          onPointerLeave={() => setPreviewLens(null)}
        >
          {lenses.map((lens) => {
            const active = previewLens === lens.id;

            return (
              <motion.article
                key={lens.id}
                className="about-lens"
                data-lens={lens.id}
                data-active={active}
                variants={revealItem}
                onPointerEnter={(event) => previewWithPointer(event, lens.id)}
              >
                <span className="about-lens__rail" aria-hidden="true">
                  <span className="about-lens__number">{lens.number}</span>
                </span>

                <div className="about-lens__content">
                  <div className="about-lens__heading-row">
                    <h3 className="about-lens__title">{lens.title}</h3>
                    <p className="about-lens__line">{lens.line}</p>
                  </div>
                  <p className="about-lens__description">{lens.description}</p>
                </div>

                <div className="about-lens__motif">
                  <LensMotif id={lens.id} active={active} reduced={reducedMotion} />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
