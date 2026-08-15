import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FileText, Menu, X } from 'lucide-react';
import { Glass, type GlassOptics } from '@samasante/liquid-glass';
import ScrollProgress from './ScrollProgress';
import CommandPalette from './CommandPalette';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const navbarOptics: Partial<GlassOptics> = {
  mapSize: 192,
  strength: 0.006,
  depth: 0.16,
  curvature: 0.05,
  dispersion: 0.025,
  bend: 0.18,
  bendWidth: 0.12,
  frost: 0.35,
  saturate: 1.04,
  brightness: 0.006,
  specular: 0.46,
  sheen: 0.34,
  sheenWidth: 1.8,
  sheenFalloff: 2.2,
  sheenAngle: 34,
  glow: 0.02,
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 32);

        // Keep this in document order even though the visible navigation is grouped by priority.
        const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
        const readingLine = window.scrollY + window.innerHeight * 0.32;
        let currentSection = 'home';

        sectionIds.forEach((sectionId) => {
          const section = document.getElementById(sectionId);
          if (section && section.offsetTop <= readingLine) {
            currentSection = sectionId;
          }
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
          currentSection = 'contact';
        }

        setActiveSection(currentSection);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isCommandPaletteOpen) setIsMenuOpen(false);
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const anchor = element.querySelector<HTMLElement>('[data-nav-anchor]');

      if (anchor) {
        const declaredScrollMargin = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
        const navbarBottom = navbarRef.current?.getBoundingClientRect().bottom ?? 0;
        const headerClearance = Math.max(declaredScrollMargin, Math.ceil(navbarBottom + 24));
        const lowerBreathingRoom = 32;
        const availableHeight = window.innerHeight - headerClearance - lowerBreathingRoom;
        const anchorRect = anchor.getBoundingClientRect();
        const documentTop = window.scrollY + anchorRect.top;
        const shouldCenter = anchor.dataset.navAnchor === 'center' && anchorRect.height <= availableHeight;
        const alignmentOffset = shouldCenter
          ? headerClearance + (availableHeight - anchorRect.height) / 2
          : headerClearance;

        window.scrollTo({
          top: Math.max(0, Math.round(documentTop - alignmentOffset)),
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const tapMotion = shouldReduceMotion ? undefined : { scale: 0.97 };

  return (
    <>
      <ScrollProgress />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.nav
          ref={navbarRef}
          aria-label="Primary navigation"
          data-scrolled={isScrolled}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="site-navbar liquid-glass specular-border pointer-events-auto relative mx-auto max-w-[72rem] rounded-[1.35rem] px-2.5 py-2 transition-[background-color,box-shadow,border-color] duration-500 data-[scrolled=true]:bg-white/[0.07] data-[scrolled=true]:shadow-[0_16px_46px_rgba(0,0,0,0.32)] sm:rounded-full sm:px-3"
        >
          {!shouldReduceMotion && (
            <Glass className="navbar-glass-refraction" optics={navbarOptics} aria-hidden="true">
              <span className="navbar-glass-refraction__content" />
            </Glass>
          )}

          <div className="relative z-[2] flex min-h-11 items-center justify-between gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <motion.button
              type="button"
              onClick={() => scrollToSection('home')}
              whileTap={tapMotion}
              className="control-focus flex min-h-10 items-center rounded-full px-3 text-left text-[0.9rem] font-semibold tracking-[-0.02em] text-white transition-colors hover:text-slate-100 sm:px-4"
              aria-label="Scroll to the top"
            >
              <span className="sm:hidden">SW</span>
              <span className="hidden sm:inline">Sahil Wadhwani</span>
            </motion.button>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  whileTap={tapMotion}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`control-focus relative isolate rounded-full px-3.5 py-2.5 text-[0.82rem] font-medium transition-colors duration-300 ${
                    activeSection === item.id ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="desktop-nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-white/[0.1] bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_5px_18px_rgba(2,12,27,0.24)]"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <motion.a
                href="/Sahil_Wadhwani_Resume.pdf"
                download="SahilWadhwani-Resume.pdf"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={tapMotion}
                className="control-focus glass-button hidden min-h-10 items-center gap-2 rounded-full px-4 text-[0.82rem] font-semibold text-white lg:inline-flex"
              >
                <FileText aria-hidden="true" size={15} />
                Resume
              </motion.a>

              <motion.button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={tapMotion}
                className="command-palette-trigger"
                aria-label="Command Palette"
                aria-haspopup="dialog"
                aria-expanded={isCommandPaletteOpen}
                title="Command Palette"
              >
                <span aria-hidden="true">&gt;_</span>
                <span className="hidden xl:inline" aria-hidden="true">⌘K</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                whileTap={tapMotion}
                className="control-focus icon-button inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-slate-100 lg:hidden"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMenuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="liquid-glass-strong specular-border absolute inset-x-0 top-[calc(100%+0.7rem)] rounded-[1.35rem] p-2.5 lg:hidden"
              >
                <div className="grid gap-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      whileTap={tapMotion}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      className={`control-focus relative isolate min-h-11 rounded-xl px-4 text-left text-sm font-medium transition-colors ${
                        activeSection === item.id ? 'text-white' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {activeSection === item.id && (
                        <motion.span
                          layoutId="mobile-nav-active"
                          className="absolute inset-0 -z-10 rounded-xl border border-white/[0.09] bg-white/[0.08]"
                          transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.a
                    href="/Sahil_Wadhwani_Resume.pdf"
                    download="SahilWadhwani-Resume.pdf"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={tapMotion}
                    className="control-focus mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/[0.1] px-4 text-sm font-semibold text-white"
                  >
                    <FileText aria-hidden="true" size={16} />
                    Resume
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
      <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
    </>
  );
};

export default Header;
