import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Briefcase,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Search,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react';

type CommandId = 'whoami' | 'focus' | 'experience' | 'projects' | 'resume' | 'contact' | 'github' | 'linkedin';

interface CommandDefinition {
  id: CommandId;
  command: string;
  description: string;
  keywords: string;
  icon: LucideIcon;
}

interface InlineResult {
  eyebrow: string;
  title: string;
  lines: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const commands: CommandDefinition[] = [
  { id: 'whoami', command: 'whoami', description: 'Show identity', keywords: 'sahil identity engineer usc', icon: UserRound },
  { id: 'focus', command: 'focus', description: 'Show engineering focus', keywords: 'backend distributed security ai automation', icon: Layers3 },
  { id: 'experience', command: 'experience --latest', description: 'Show latest experience', keywords: 'microsoft intern 2026 work', icon: Briefcase },
  { id: 'projects', command: 'projects', description: 'Explore featured projects', keywords: 'work portfolio build', icon: FolderKanban },
  { id: 'resume', command: 'resume', description: 'Open resume', keywords: 'cv pdf download', icon: FileText },
  { id: 'contact', command: 'contact', description: 'Get in touch', keywords: 'email message connect', icon: Mail },
  { id: 'github', command: 'github', description: 'Open GitHub', keywords: 'code repository profile', icon: Github },
  { id: 'linkedin', command: 'linkedin', description: 'Open LinkedIn', keywords: 'professional profile network', icon: Linkedin },
];

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const reduced = Boolean(useReducedMotion());
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [inlineResult, setInlineResult] = useState<InlineResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;

    return commands.filter((item) =>
      `${item.command} ${item.description} ${item.keywords}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(!open);
      }

      if (open && event.key === 'Escape') {
        event.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery('');
    setActiveIndex(0);
    setInlineResult(null);

    const root = document.documentElement;
    const originalOverflow = root.style.overflow;
    const originalPaddingRight = root.style.paddingRight;
    const scrollbarGutter = window.innerWidth - root.clientWidth;
    root.style.overflow = 'hidden';
    if (scrollbarGutter > 0) root.style.paddingRight = `${scrollbarGutter}px`;

    const focusFrame = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = originalOverflow;
      root.style.paddingRight = originalPaddingRight;
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
    setInlineResult(null);
  }, [query]);

  useEffect(() => {
    const activeItem = listRef.current?.querySelector<HTMLElement>(`[data-command-index="${activeIndex}"]`);
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const close = () => onOpenChange(false);

  const scrollToSection = (sectionId: string) => {
    close();
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  };

  const execute = (item?: CommandDefinition) => {
    const command = item ?? filteredCommands[activeIndex];
    if (!command) return;

    switch (command.id) {
      case 'whoami':
        setInlineResult({ eyebrow: 'Identity', title: 'Sahil Wadhwani', lines: ['Software Engineer · MS CS @ USC'] });
        break;
      case 'focus':
        setInlineResult({
          eyebrow: 'Engineering focus',
          title: 'Systems built for production',
          lines: ['Backend & Distributed Systems', 'Security Engineering', 'AI/ML & Automation'],
        });
        break;
      case 'experience':
        setInlineResult({ eyebrow: 'Latest experience', title: 'Microsoft', lines: ['Software Engineer Intern · 2026'] });
        break;
      case 'projects':
        scrollToSection('projects');
        break;
      case 'resume':
        window.open('/Sahil_Wadhwani_Resume.pdf', '_blank', 'noopener,noreferrer');
        close();
        break;
      case 'contact':
        scrollToSection('contact');
        break;
      case 'github':
        window.open('https://github.com/SahilWadhwani', '_blank', 'noopener,noreferrer');
        close();
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/sahil-wadhwani-06848122a/', '_blank', 'noopener,noreferrer');
        close();
        break;
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => filteredCommands.length ? (index + 1) % filteredCommands.length : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => filteredCommands.length ? (index - 1 + filteredCommands.length) % filteredCommands.length : 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute();
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey && document.activeElement === inputRef.current) {
      event.preventDefault();
      closeRef.current?.focus();
    } else if (!event.shiftKey && document.activeElement === closeRef.current) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-palette-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.08 : 0.18 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            aria-describedby="command-palette-description"
            onKeyDown={handleDialogKeyDown}
            className="command-palette liquid-glass-strong specular-border"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.985 }}
            transition={reduced ? { duration: 0.08 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="command-palette-title" className="sr-only">Command Palette</h2>
            <p id="command-palette-description" className="sr-only">Search commands, then use the arrow keys and Enter to run one.</p>

            <div className="command-palette__search-row">
              <span className="command-palette__prompt" aria-hidden="true">&gt;_</span>
              <Search aria-hidden="true" size={16} className="command-palette__search-icon" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-label="Type a command or search"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={filteredCommands[activeIndex] ? `${listId}-${filteredCommands[activeIndex].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search..."
                className="command-palette__input"
              />
              <button ref={closeRef} type="button" onClick={close} className="command-palette__close" aria-label="Close command palette">
                <X aria-hidden="true" size={17} />
              </button>
            </div>

            <div ref={listRef} id={listId} role="listbox" aria-label="Available commands" className="command-palette__list">
              {filteredCommands.length > 0 ? filteredCommands.map((item, index) => {
                const Icon = item.icon;
                const active = activeIndex === index;

                return (
                  <button
                    key={item.id}
                    id={`${listId}-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    tabIndex={-1}
                    data-command-index={index}
                    className="command-palette__item"
                    onPointerMove={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => execute(item)}
                  >
                    {active && (
                      <motion.span
                        layoutId="command-active-row"
                        className="command-palette__active-row"
                        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 36 }}
                      />
                    )}
                    <span className="command-palette__item-icon"><Icon aria-hidden="true" size={16} /></span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="command-palette__command">{item.command}</span>
                      <span className="command-palette__description">{item.description}</span>
                    </span>
                    {active && <CornerDownLeft aria-hidden="true" size={14} className="command-palette__enter-icon" />}
                  </button>
                );
              }) : (
                <div className="command-palette__empty">No command matches “{query}”.</div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {inlineResult && (
                <motion.div
                  key={inlineResult.eyebrow}
                  className="command-palette__result"
                  role="status"
                  aria-live="polite"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.08 : 0.22 }}
                >
                  <span className="command-palette__result-eyebrow">{inlineResult.eyebrow}</span>
                  <strong>{inlineResult.title}</strong>
                  {inlineResult.lines.map((line) => <span key={line}>{line}</span>)}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="command-palette__footer" aria-hidden="true">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Run</span>
              <span><kbd>Esc</kbd> Close</span>
              <span className="ml-auto"><kbd>⌘K</kbd> / <kbd>Ctrl K</kbd></span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CommandPalette;
