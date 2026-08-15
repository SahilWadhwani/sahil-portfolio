import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type StageMode = 'systems' | 'security' | 'ai';

interface EngineeringStageProps {
  mode: StageMode;
}

export default function EngineeringStage({ mode }: EngineeringStageProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="engineering-stage" data-mode={mode}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={mode}
          className={`engineering-stage__ambient engineering-stage__ambient--${mode}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={reducedMotion ? { opacity: 0.84 } : { opacity: [0.7, 1, 0.86] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.12 : 0.56,
            ease: [0.22, 1, 0.36, 1],
            times: reducedMotion ? undefined : [0, 0.56, 1],
          }}
        />
      </AnimatePresence>

      <span className="engineering-stage__ground-shadow" aria-hidden="true" />
      <img
        src="/SahilCutout.png"
        alt=""
        aria-hidden="true"
        className="engineering-stage__portrait-rim"
        draggable="false"
      />
      <img
        src="/SahilCutout.png"
        alt="Sahil Wadhwani"
        className="engineering-stage__portrait"
        draggable="false"
      />
    </div>
  );
}
