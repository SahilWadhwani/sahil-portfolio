import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const EMAILJS_SERVICE_ID = 'service_rp2083o';
const EMAILJS_TEMPLATE_ID = 'template_l2fjjni';
const EMAILJS_PUBLIC_KEY = 'TXUCXKxLv-Ot9_WUV';

const contactLinks = [
  {
    label: 'Email',
    value: 'wadhwanisahil9@gmail.com',
    href: 'mailto:wadhwanisahil9@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://www.linkedin.com/in/sahil-wadhwani-06848122a/',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/SahilWadhwani',
    external: true,
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/Sahil_Wadhwani_Resume.pdf',
    download: 'Sahil-Wadhwani-Resume.pdf',
  },
] as const;

type FormStatus = 'idle' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12, filter: shouldReduceMotion ? 'none' : 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: shouldReduceMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setStatus('idle');

    if (!formRef.current) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setFormData({ user_name: '', user_email: '', user_message: '' });
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonLabel = isSubmitting
    ? 'Sending...'
    : status === 'success'
      ? 'Message sent'
      : 'Send message';

  return (
    <section id="contact" className="contact-section relative" aria-labelledby="contact-heading">
      <div className="contact-shell">
        <div className="contact-layout">
          <motion.div
            className="contact-intro"
            data-nav-anchor="start"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="contact-eyebrow">Contact</p>
            <h2 id="contact-heading" className="contact-heading">Let&rsquo;s talk.</h2>
            <p className="contact-summary">
              If you&rsquo;re building something around backend systems, security, intelligent
              automation, or just have an interesting engineering problem, I&rsquo;d be happy to hear
              from you.
            </p>

            <address className="contact-links" aria-label="Direct contact links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  className="contact-link"
                  href={link.href}
                  target={'external' in link && link.external ? '_blank' : undefined}
                  rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                  download={'download' in link ? link.download : undefined}
                >
                  <span className="contact-link__label">{link.label}</span>
                  <span className="contact-link__value">{link.value}</span>
                  {'external' in link && link.external ? (
                    <ArrowUpRight aria-hidden="true" size={16} />
                  ) : link.label === 'Resume' ? (
                    <ArrowDown aria-hidden="true" size={16} />
                  ) : (
                    <ArrowRight aria-hidden="true" size={16} />
                  )}
                </a>
              ))}
            </address>
          </motion.div>

          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-busy={isSubmitting}
          >
            <div className="contact-form__grid">
              <div className="contact-field-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="contact-field"
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="contact-field"
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-field-group contact-field-group--message">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="contact-field contact-field--message"
                name="user_message"
                value={formData.user_message}
                onChange={handleChange}
                placeholder="Tell me what you&rsquo;re working on..."
                rows={5}
                required
              />
            </div>

            <div className="contact-form__actions">
              <motion.button
                className="contact-submit"
                type="submit"
                disabled={isSubmitting || status === 'success'}
                whileHover={shouldReduceMotion || isSubmitting ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion || isSubmitting ? undefined : { scale: 0.985 }}
              >
                <span>{buttonLabel}</span>
                {status === 'success' ? (
                  <Check aria-hidden="true" size={16} />
                ) : (
                  <ArrowRight aria-hidden="true" size={16} />
                )}
              </motion.button>

              <div className="contact-status" aria-live="polite" aria-atomic="true">
                {status === 'success' && <span data-state="success">Thanks — I&rsquo;ll be in touch.</span>}
                {status === 'error' && (
                  <span data-state="error" role="alert">Couldn&rsquo;t send. Please try again.</span>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
