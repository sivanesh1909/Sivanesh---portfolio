import { useState, useEffect } from 'react'
import { Menu, X, Download, ArrowUpRight, Terminal } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'proof', label: 'ACHIEVEMENTS' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'contact', label: 'CONTACT' },
]

export function Navigation({ activeSection = 'home', onNavigate, onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const baseUrl = import.meta.env.BASE_URL

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      const winHeight = document.documentElement.scrollHeight - window.innerHeight
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <div className="global-progress-track" aria-hidden="true">
        <div className="global-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Floating Header */}
      <header className={`site-navigation-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo / Wordmark */}
          <button
            className="brand-wordmark"
            onClick={() => handleLinkClick('home')}
            aria-label="Sivanesh R - Return to top"
          >
            <span className="brand-dot" />
            <span className="brand-text">SIVANESH</span>
            <span className="brand-accent">R</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav-menu" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-menu-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Resume Download, Boot Sys & Mobile Toggle */}
          <div className="nav-actions">
            {onReplayIntro && (
              <button
                className="nav-boot-button"
                onClick={onReplayIntro}
                title="Replay Cinematic AI Boot Sequence"
                aria-label="Replay intro boot sequence"
                type="button"
              >
                <Terminal size={12} className="boot-icon" />
                <span>BOOT SYS</span>
              </button>
            )}

            <MagneticButton
              href={`${baseUrl}Sivanesh2_up.pdf`}
              download="Sivanesh-R-Resume.pdf"
              className="nav-resume-button"
              aria-label="Download Sivanesh R's verified resume PDF"
            >
              <Download size={13} className="resume-icon" />
              <span>RESUME</span>
            </MagneticButton>

            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Overlay */}
      <div
        className={`mobile-fullscreen-menu ${mobileMenuOpen ? 'is-active' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <span className="menu-meta-label">SYS_NAV // 00</span>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav-list" aria-label="Mobile navigation">
          {[{ id: 'home', label: 'HOME' }, ...NAV_ITEMS].map((item, index) => (
            <button
              key={item.id}
              className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleLinkClick(item.id)}
            >
              <span className="item-index">0{index + 1}</span>
              <span className="item-label">{item.label}</span>
              <ArrowUpRight size={18} className="item-arrow" />
            </button>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <p className="mobile-footer-role">
            ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING ENGINEER
          </p>
          <p className="mobile-footer-loc">COIMBATORE, TAMIL NADU</p>

          {onReplayIntro && (
            <button
              type="button"
              className="mobile-boot-link"
              onClick={() => {
                setMobileMenuOpen(false)
                onReplayIntro()
              }}
            >
              <Terminal size={14} /> REPLAY SYSTEM BOOT SEQUENCE
            </button>
          )}

          <a
            href={`${baseUrl}Sivanesh2_up.pdf`}
            download="Sivanesh-R-Resume.pdf"
            className="mobile-resume-link"
          >
            <Download size={14} /> DOWNLOAD VERIFIED RESUME (PDF)
          </a>
        </div>
      </div>
    </>
  )
}

export default Navigation
