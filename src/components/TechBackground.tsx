import { motion, useReducedMotion } from 'motion/react';

const TechBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-vignette" />
      <motion.div
        className="ambient-orb ambient-orb-cyan"
        animate={shouldReduceMotion ? undefined : {
          x: [0, 42, -18, 0],
          y: [0, -28, 20, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-blue"
        animate={shouldReduceMotion ? undefined : {
          x: [0, -36, 22, 0],
          y: [0, 24, -18, 0],
          scale: [1, 0.98, 1.035, 1],
        }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-violet"
        animate={shouldReduceMotion ? undefined : {
          x: [0, 24, -30, 0],
          y: [0, -18, 28, 0],
        }}
        transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="ambient-noise" />
    </div>
  );
};

export default TechBackground;
