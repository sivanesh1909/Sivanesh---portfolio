import { useState } from 'react'
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmailToClipboard = () => {
    navigator.clipboard?.writeText('sivaneshredu@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="contact-section portfolio-section" id="contact">
      <div className="section-pre-header">
        <span className="section-index-badge">08 // ENGAGEMENT</span>
        <span className="section-category-badge">OPEN TO OPPORTUNITIES</span>
      </div>

      <div className="contact-content-center">
        <h2 className="contact-display-heading">
          LET’S BUILD <br />
          <span className="text-amethyst">SOMETHING</span> <br />
          INTELLIGENT.
        </h2>

        <p className="contact-lead-text">
          I am actively looking for Artificial Intelligence, Machine Learning, Data Analytics,
          and software engineering opportunities. Whether you have an open role, a collaborative project,
          or want to discuss technical ideas, my inbox is open.
        </p>

        {/* Primary Action Button */}
        <div className="contact-cta-row">
          <MagneticButton
            href="mailto:sivaneshredu@gmail.com?subject=Engineering%20Opportunity%20/%20Inquiry%20for%20Sivanesh%20R&body=Hello%20Sivanesh,%0A%0AI%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding..."
            className="contact-primary-btn"
          >
            <Mail size={18} />
            <span>LET’S CONNECT</span>
            <ArrowUpRight size={18} />
          </MagneticButton>

          <button
            className={`contact-copy-btn ${copied ? 'is-copied' : ''}`}
            onClick={copyEmailToClipboard}
            aria-label="Copy email address to clipboard"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald" />
                <span>EMAIL COPIED!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>

        {/* Channels Information Grid */}
        <div className="contact-channels-grid">
          {/* Email Direct */}
          <a
            href="mailto:sivaneshredu@gmail.com"
            className="contact-channel-card"
          >
            <div className="channel-icon-wrap">
              <Mail size={18} />
            </div>
            <div className="channel-text">
              <span className="channel-label">DIRECT EMAIL</span>
              <span className="channel-value">sivaneshredu@gmail.com</span>
            </div>
            <ArrowUpRight size={15} className="channel-arrow" />
          </a>

          {/* Telephone */}
          <a
            href="tel:+917200843124"
            className="contact-channel-card"
          >
            <div className="channel-icon-wrap">
              <Phone size={18} />
            </div>
            <div className="channel-text">
              <span className="channel-label">PHONE NUMBER</span>
              <span className="channel-value">+91 7200843124</span>
            </div>
            <ArrowUpRight size={15} className="channel-arrow" />
          </a>

          {/* Location */}
          <div className="contact-channel-card static">
            <div className="channel-icon-wrap">
              <MapPin size={18} />
            </div>
            <div className="channel-text">
              <span className="channel-label">CURRENT LOCATION</span>
              <span className="channel-value">Coimbatore, Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* Social Presence Strip */}
        <div className="contact-social-strip">
          <span className="social-strip-title">VERIFIED PROFILES:</span>
          <div className="social-links-row">
            <a
              href="https://www.linkedin.com/in/sivanesh-r-a4a98b2a2"
              target="_blank"
              rel="noreferrer"
              className="social-profile-pill"
              aria-label="Visit Sivanesh R's LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LINKEDIN</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://github.com/sivanesh1909"
              target="_blank"
              rel="noreferrer"
              className="social-profile-pill"
              aria-label="Visit Sivanesh R's GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GITHUB</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
