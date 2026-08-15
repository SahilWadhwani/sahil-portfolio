const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <strong>Sahil Wadhwani</strong>
          <span>Software Engineer</span>
        </div>

        <nav className="site-footer__links" aria-label="Footer links">
          <a
            href="https://www.linkedin.com/in/sahil-wadhwani-06848122a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/SahilWadhwani" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="/Sahil_Wadhwani_Resume.pdf" download="Sahil-Wadhwani-Resume.pdf">
            Resume
          </a>
        </nav>

        <p className="site-footer__copyright">© 2026 Sahil Wadhwani</p>
      </div>
    </footer>
  );
};

export default Footer;
