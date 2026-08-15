import { useEffect, useMemo, useReducer, useState } from 'react';
import { Glass, type GlassOptics } from '@samasante/liquid-glass';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import './GlassLab.css';

type AdjustableOptic = 'strength' | 'depth' | 'bend' | 'frost' | 'dispersion' | 'sheen';
type OpticState = Record<AdjustableOptic, number>;

const initialOptics: OpticState = {
  strength: 0.075,
  depth: 0.82,
  bend: 0.72,
  frost: 0.35,
  dispersion: 0.12,
  sheen: 0.82,
};

const controls: Array<{ key: AdjustableOptic; min: number; max: number; step: number }> = [
  { key: 'strength', min: 0, max: 0.14, step: 0.005 },
  { key: 'depth', min: 0.1, max: 1, step: 0.02 },
  { key: 'bend', min: 0, max: 1, step: 0.02 },
  { key: 'frost', min: 0, max: 4, step: 0.1 },
  { key: 'dispersion', min: 0, max: 0.5, step: 0.01 },
  { key: 'sheen', min: 0, max: 1.2, step: 0.02 },
];

const opticsReducer = (state: OpticState, action: { key: AdjustableOptic; value: number }) => ({
  ...state,
  [action.key]: action.value,
});

const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  if (/Edg\//.test(userAgent)) return 'Edge';
  if (/Firefox\//.test(userAgent)) return 'Firefox';
  if (/Chrome\//.test(userAgent) || /CriOS\//.test(userAgent)) return 'Chrome';
  if (/Safari\//.test(userAgent)) return 'Safari';
  return 'Unknown';
};

const RefractGraphic = () => (
  <div className="glass-lab__source-graphic" aria-label="Explicit refract source graphic">
    <div className="glass-lab__source-grid" />
    <svg viewBox="0 0 320 220" aria-hidden="true">
      <path d="M-20 42 C70 12 126 88 210 48 C260 25 300 28 348 54" />
      <path d="M-18 112 C72 78 134 154 218 112 C268 87 304 92 346 122" />
      <circle cx="75" cy="170" r="22" />
      <rect x="220" y="148" width="48" height="48" rx="8" />
    </svg>
    <strong>REFRACT / 03</strong>
    <small>Thin lines should visibly bend near the rim.</small>
  </div>
);

const GlassLab = () => {
  const [values, updateOptic] = useReducer(opticsReducer, initialOptics);
  const [runtimeStatus, setRuntimeStatus] = useState({ displacementMaps: 0, liveUrlFilter: false });
  const reducedMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(typeof window === 'undefined' ? 700 : window.innerWidth * 0.7);
  const pointerY = useMotionValue(typeof window === 'undefined' ? 350 : window.innerHeight * 0.45);
  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.45 });

  const browser = detectBrowser();
  const expectsLiveBackdrop = browser === 'Chrome' || browser === 'Edge';

  const optics = useMemo<Partial<GlassOptics>>(() => ({
    mapSize: 384,
    strength: values.strength,
    depth: values.depth,
    curvature: 0.48,
    bend: values.bend,
    bendWidth: 0.19,
    dispersion: values.dispersion,
    frost: values.frost,
    saturate: 1.08,
    brightness: 0.025,
    specular: 1,
    sheen: values.sheen,
    sheenWidth: 4,
    sheenFalloff: 1.8,
    sheenAngle: 38,
    glow: 0.1,
    glowSpread: 0.55,
    glowFalloff: 1.4,
    splay: 0.08,
  }), [values]);

  useEffect(() => {
    const centerLens = () => {
      pointerX.set(window.innerWidth * 0.7);
      pointerY.set(window.innerHeight * 0.45);
    };

    centerLens();
    window.addEventListener('resize', centerLens);
    return () => window.removeEventListener('resize', centerLens);
  }, [pointerX, pointerY]);

  useEffect(() => {
    const statusFrame = requestAnimationFrame(() => {
      const material = document.querySelector<HTMLElement>('[data-liquid-glass="material"]');
      const materialStyle = material ? getComputedStyle(material) : null;
      const backdropFilter = materialStyle?.backdropFilter || materialStyle?.getPropertyValue('-webkit-backdrop-filter') || '';

      setRuntimeStatus({
        displacementMaps: document.querySelectorAll('feDisplacementMap').length,
        liveUrlFilter: backdropFilter.includes('url('),
      });
    });

    return () => cancelAnimationFrame(statusFrame);
  }, [optics]);

  return (
    <main
      className="glass-lab"
      onPointerMove={(event) => {
        pointerX.set(event.clientX);
        pointerY.set(event.clientY);
      }}
    >
      <div className="glass-lab__background" aria-hidden="true">
        <div className="glass-lab__light-band" />
        <div className="glass-lab__grid" />
        <svg className="glass-lab__curves" viewBox="0 0 1600 1000" preserveAspectRatio="none">
          <path d="M-40 170 C270 30 430 330 720 180 C1020 24 1240 250 1660 104" />
          <path d="M-70 350 C250 188 500 492 810 330 C1130 162 1380 452 1670 290" />
          <path d="M-20 610 C270 470 530 742 850 582 C1160 430 1370 706 1640 548" />
          <path d="M120 900 C380 680 680 880 940 720 C1210 556 1400 746 1660 648" />
        </svg>
        <div className="glass-lab__shape glass-lab__shape--circle" />
        <div className="glass-lab__shape glass-lab__shape--square" />
        <div className="glass-lab__microcopy glass-lab__microcopy--one">LIVE DOM / SELECTABLE TEXT / 12PX</div>
        <div className="glass-lab__microcopy glass-lab__microcopy--two">EDGE BEND REFERENCE — WATCH THIS BASELINE</div>
      </div>

      <header className="glass-lab__heading">
        <span>Isolated developer surface</span>
        <h1>Liquid Glass Lab</h1>
        <p>Move the pointer across the grid, text, and thin curves. Real refraction should bend the marks—not merely blur them.</p>
      </header>

      <section className="glass-lab__stage" aria-label="Liquid glass tests">
        <article className="glass-lab__test glass-lab__test--static">
          <div className="glass-lab__test-label">
            <span>Test 01</span>
            <strong>Live backdrop material</strong>
          </div>
          <Glass className="glass-lab__large-panel" optics={optics}>
            <div className="glass-lab__panel-content">
              <span>LIVE BACKDROP</span>
              <strong>Inspect the outer 20%</strong>
              <p>The fine grid and white curves beneath this panel should compress and bend around the rounded edge.</p>
            </div>
          </Glass>
        </article>

        <article className="glass-lab__test glass-lab__test--refract">
          <div className="glass-lab__test-label">
            <span>Test 03</span>
            <strong>Explicit refract source</strong>
          </div>
          <div className="glass-lab__refract-comparison">
            <div>
              <span className="glass-lab__comparison-label">Source</span>
              <RefractGraphic />
            </div>
            <div>
              <span className="glass-lab__comparison-label">Refracted copy</span>
              <Glass
                width={320}
                height={220}
                radius={34}
                refract={<RefractGraphic />}
                behind="#080c16"
                optics={optics}
                filterResolution={1}
                className="glass-lab__refract-panel"
              >
                <span className="glass-lab__refract-badge">COPY MODE</span>
              </Glass>
            </div>
          </div>
        </article>
      </section>

      <motion.div
        className="glass-lab__moving-lens-wrap"
        style={{ x: reducedMotion ? pointerX : smoothX, y: reducedMotion ? pointerY : smoothY }}
        aria-hidden="true"
      >
        <Glass className="glass-lab__moving-lens" optics={optics}>
          <span className="glass-lab__moving-lens-content">02</span>
        </Glass>
      </motion.div>

      <aside className="glass-lab__debug" aria-label="Glass debug controls">
        <div className="glass-lab__debug-status">
          <span><small>Browser</small><strong>{browser}</strong></span>
          <span><small>Glass modes</small><strong>Live backdrop + refract source</strong></span>
          <span><small>Chromium backdrop</small><strong>{expectsLiveBackdrop ? 'Expected: active' : 'Expected: frost fallback'}</strong></span>
          <span><small>Motion</small><strong>{reducedMotion ? 'Reduced' : 'Spring tracked'}</strong></span>
          <span><small>SVG displacement maps</small><strong>{runtimeStatus.displacementMaps} generated</strong></span>
          <span><small>Live URL filter</small><strong>{runtimeStatus.liveUrlFilter ? 'Active' : 'Frost fallback'}</strong></span>
        </div>

        <div className="glass-lab__controls">
          {controls.map((control) => (
            <label key={control.key} htmlFor={`glass-${control.key}`}>
              <span>{control.key}</span>
              <output htmlFor={`glass-${control.key}`}>{values[control.key].toFixed(control.step < 0.01 ? 3 : 2)}</output>
              <input
                id={`glass-${control.key}`}
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={values[control.key]}
                onChange={(event) => updateOptic({ key: control.key, value: event.currentTarget.valueAsNumber })}
              />
            </label>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default GlassLab;
