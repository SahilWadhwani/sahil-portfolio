import { useEffect, useState, type PointerEvent } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowDownRight, FileText, Github, Linkedin } from 'lucide-react';
import EngineeringStage, { type StageMode } from './EngineeringStage';

const engineeringPillars: Array<{ mode: StageMode; label: string }> = [
  { mode: 'systems', label: 'Backend & Distributed Systems' },
  { mode: 'security', label: 'Security Engineering' },
  { mode: 'ai', label: 'AI/ML & Automation' },
];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedMode, setSelectedMode] = useState<StageMode>('systems');
  const [previewMode, setPreviewMode] = useState<StageMode | null>(null);
  const requestedMode = previewMode ?? selectedMode;
  const [lensMode, setLensMode] = useState<StageMode>('systems');

  useEffect(() => {
    if (requestedMode === lensMode) return;

    const transitionTimer = window.setTimeout(
      () => setLensMode(requestedMode),
      shouldReduceMotion ? 0 : 80,
    );

    return () => window.clearTimeout(transitionTimer);
  }, [lensMode, requestedMode, shouldReduceMotion]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.16,
        staggerChildren: shouldReduceMotion ? 0 : 0.085,
      },
    },
  };

  const itemVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const previewPillar = (event: PointerEvent<HTMLButtonElement>, mode: StageMode) => {
    if (event.pointerType === 'mouse') setPreviewMode(mode);
  };

  const tactileHover = shouldReduceMotion ? undefined : { y: -2 };
  const tactileTap = shouldReduceMotion ? undefined : { scale: 0.975 };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[49rem]"
          >
            <motion.div variants={itemVariants}>
              <span className="glass-pill inline-flex min-h-9 items-center rounded-full px-4 text-[0.72rem] font-semibold tracking-[0.04em] text-slate-100/90 sm:text-xs">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#b8dae8]/90 shadow-[0_0_8px_rgba(155,203,222,0.24)]" />
                Microsoft SWE Intern ’26&nbsp; · &nbsp;MS CS @ USC
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="mt-7 text-[clamp(3.55rem,8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white"
            >
              Hi, I’m Sahil.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-[46rem] text-[clamp(1.55rem,3.1vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.04em] text-slate-200"
            >
              I build systems that scale, stay secure, and get smarter.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[43rem] text-[0.98rem] leading-7 text-slate-400 sm:text-[1.06rem] sm:leading-8"
            >
              Software engineer working across backend &amp; distributed systems, security engineering, and AI/ML automation. I like turning ambiguous problems into reliable systems that hold up in production.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap gap-2.5"
              role="group"
              aria-label="Choose an engineering focus visualization"
              onPointerLeave={() => setPreviewMode(null)}
            >
              {engineeringPillars.map((pillar) => {
                const selected = selectedMode === pillar.mode;
                const displayed = lensMode === pillar.mode;

                return (
                  <motion.button
                    key={pillar.mode}
                    type="button"
                    aria-pressed={selected}
                    data-selected={selected}
                    data-displayed={displayed}
                    onPointerEnter={(event) => previewPillar(event, pillar.mode)}
                    onClick={() => {
                      setSelectedMode(pillar.mode);
                      setPreviewMode(null);
                    }}
                    whileTap={tactileTap}
                    className="engineering-pillar"
                  >
                    {selected && (
                      <motion.span
                        layoutId="engineering-pillar-active"
                        className="engineering-pillar__active"
                        transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 390, damping: 34 }}
                      />
                    )}
                    <span className="engineering-pillar__signal" aria-hidden="true" />
                    <span className="relative z-10">{pillar.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            <span className="sr-only" aria-live="polite">{lensMode} engineering visualization selected</span>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={scrollToProjects}
                whileHover={tactileHover}
                whileTap={tactileTap}
                className="control-focus primary-action inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-slate-950"
              >
                View My Work
                <ArrowDownRight aria-hidden="true" size={17} />
              </motion.button>

              <motion.a
                href="/Sahil_Wadhwani_Resume.pdf"
                download="SahilWadhwani-Resume.pdf"
                whileHover={tactileHover}
                whileTap={tactileTap}
                className="control-focus glass-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white"
              >
                <FileText aria-hidden="true" size={16} />
                Resume
              </motion.a>

              <span className="mx-0.5 hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />

              <motion.a
                href="https://www.linkedin.com/in/sahil-wadhwani-06848122a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? undefined : { y: -2, color: '#e0f2fe' }}
                whileTap={tactileTap}
                className="control-focus icon-button inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-slate-400"
                aria-label="Visit Sahil Wadhwani on LinkedIn"
              >
                <Linkedin aria-hidden="true" size={19} />
              </motion.a>
              <motion.a
                href="https://github.com/SahilWadhwani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? undefined : { y: -2, color: '#f8fafc' }}
                whileTap={tactileTap}
                className="control-focus icon-button inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-slate-400"
                aria-label="Visit Sahil Wadhwani on GitHub"
              >
                <Github aria-hidden="true" size={19} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 0.6, delay: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[38rem] lg:mx-0 lg:ml-auto"
          >
            <EngineeringStage mode={lensMode} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
