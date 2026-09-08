import { ArrowUp } from 'lucide-react'

export function Footer({ onNavigate }) {
  const handleBackToTop = () => {
    if (onNavigate) onNavigate('home')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-top-row">
        <div className="footer-brand-column">
          <span className="footer-brand-title">
            SIVANESH <span className="text-amethyst">R</span>
          </span>
          <p className="footer-role-text">ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING ENGINEER</p>
          <span className="footer-loc-text">Coimbatore, Tamil Nadu, India</span>
        </div>

        <div className="footer-links-column">
          <span className="footer-col-header">DIRECT LINKS</span>
          <a href="mailto:sivaneshredu@gmail.com" className="footer-link-item">
            sivaneshredu@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/sivanesh-r-a4a98b2a2"
            target="_blank"
            rel="noreferrer"
            className="footer-link-item"
          >
            LinkedIn Profile
          </a>
          <a
            href="https://github.com/sivanesh1909"
            target="_blank"
            rel="noreferrer"
            className="footer-link-item"
          >
            GitHub Profile
          </a>
        </div>

        <div className="footer-back-to-top">
          <button
            onClick={handleBackToTop}
            className="back-to-top-btn"
            aria-label="Return to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <div className="footer-bottom-row">
        <span className="footer-copyright">
          &copy; 2026 Sivanesh R. All rights reserved. Strictly verified to resume credentials.
        </span>
        <span className="footer-tech-note">
          Engineered with Three.js, React Three Fiber, GSAP &amp; Lenis
        </span>
      </div>
    </footer>
  )
}

export default Footer
