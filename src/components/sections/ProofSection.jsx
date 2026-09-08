import { Trophy, CheckCircle2, Shield, Cloud, Terminal, Award, Sparkles } from 'lucide-react'

const CERTIFICATIONS = [
  {
    id: '01',
    title: 'Python Programming',
    issuer: 'LeetCode',
    type: 'CERTIFICATION',
    icon: Terminal,
    desc: 'Demonstrated mastery in computational data structures, algorithmic design, and Python optimization.',
  },
  {
    id: '02',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    type: 'PROFESSIONAL CREDENTIAL',
    icon: Shield,
    desc: 'Foundational security architecture, threat detection patterns, and secure system communication protocols.',
  },
  {
    id: '03',
    title: 'Oracle Cloud',
    issuer: 'Oracle',
    type: 'CLOUD INFRASTRUCTURE',
    icon: Cloud,
    desc: 'Core understanding of cloud-native infrastructure, compute deployment, and secure cloud storage.',
  },
  {
    id: '04',
    title: 'TRISUADATHON Hackathon',
    issuer: 'Hackathon Event',
    type: 'HACKATHON PARTICIPANT',
    icon: Award,
    desc: 'Collaborative intensive product build focusing on rapid prototyping, system architecture, and presentation.',
  },
]

export function ProofSection() {
  return (
    <section className="proof-section portfolio-section" id="proof">
      <div className="section-pre-header">
        <span className="section-index-badge">06 // PROOF OF WORK</span>
        <span className="section-category-badge">AWARDS &amp; CERTIFICATIONS</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          COMPETITIVE <span className="text-amethyst">ACHIEVEMENTS</span>.
        </h2>
        <p className="section-sub-heading">
          Recognized technical performance in competitive symposia and verified software credentials.
        </p>
      </div>

      {/* Visual Centerpiece: CODE FUSION WINNER with Holographic Shimmer */}
      <div className="winner-spotlight-card">
        <div className="winner-glow-ring" />
        <div className="winner-radial-burst" />
        <div className="winner-shimmer-border" />

        <div className="winner-content-layout">
          <div className="winner-trophy-cluster">
            <div className="trophy-halo">
              <Trophy size={48} className="trophy-icon" />
              <Sparkles size={20} className="trophy-sparkle-1" />
              <Sparkles size={16} className="trophy-sparkle-2" />
            </div>
            <span className="winner-status-tag">FIRST PLACE // 1ST PRIZE</span>
          </div>

          <div className="winner-details-group">
            <span className="winner-eyebrow">SYMPOSIUM COMPETITION // CIT</span>
            <h3 className="winner-event-title">CODE FUSION</h3>
            <div className="winner-badge-row">
              <span className="winner-title-badge">WINNER</span>
              <span className="winner-symposium-badge">Symposium-ELECT-ERA’26-CIT</span>
              <span className="winner-metric-badge">CHAMPION</span>
            </div>
            <p className="winner-description">
              Awarded First Place in the prestigious CODE FUSION competitive programming and technical problem-solving event
              at Coimbatore Institute of Technology (CIT), excelling in high-pressure algorithmic reasoning, Python scripting,
              and code performance optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Grid Stack */}
      <div className="certifications-stack-container">
        <div className="cert-stack-header">
          <h4 className="cert-stack-title">VERIFIED CREDENTIALS</h4>
          <span className="cert-stack-count">{CERTIFICATIONS.length} VERIFIED MILESTONES</span>
        </div>

        <div className="cert-cards-grid">
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.icon
            return (
              <div key={cert.id} className="cert-credential-card">
                <div className="cert-card-top">
                  <div className="cert-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <span className="cert-type-pill">{cert.type}</span>
                </div>

                <div className="cert-card-body">
                  <h5 className="cert-name">{cert.title}</h5>
                  <span className="cert-issuer">
                    <CheckCircle2 size={13} className="verified-check" />
                    {cert.issuer}
                  </span>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProofSection
