import { FileText, Cpu, Network, Sparkles } from 'lucide-react'

export function ResearchSection() {
  return (
    <section className="research-section portfolio-section" id="research">
      <div className="section-pre-header">
        <span className="section-index-badge">07 // RESEARCH PUBLICATION</span>
        <span className="section-category-badge">APPLIED AI EXPLORATION</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          ACADEMIC <span className="text-amethyst">RESEARCH</span>.
        </h2>
        <p className="section-sub-heading">
          Investigating the integration of automated artificial intelligence and algorithmic decision pipelines in enterprise management.
        </p>
      </div>

      {/* Research Paper Showcase Terminal */}
      <div className="research-paper-card">
        <div className="paper-corner-accent" />

        <div className="paper-header-strip">
          <div className="paper-badge-group">
            <span className="paper-type-badge">
              <FileText size={13} />
              NATIONAL CONFERENCE PAPER
            </span>
            <span className="paper-year-badge">YEAR: 2025</span>
          </div>
          <span className="paper-archive-id">ARCHIVE REF // SR-CONF-2025</span>
        </div>

        <div className="paper-content-main">
          <h3 className="paper-title-heading">
            SMART HR-AI AUTOMATION IN HR MANAGEMENT
          </h3>

          <p className="paper-abstract-summary">
            Explores algorithmic automation and intelligent data pipelines applied to human resource management systems.
            The paper examines practical methodologies for reducing repetitive administrative latency, analyzing candidate-job
            matching vectors, and deploying data-driven workflows while maintaining transparent human-in-the-loop oversight.
          </p>

          <div className="paper-focus-areas">
            <div className="focus-pill">
              <Cpu size={14} />
              <span>HR Process Automation</span>
            </div>
            <div className="focus-pill">
              <Network size={14} />
              <span>Algorithmic Matching</span>
            </div>
            <div className="focus-pill">
              <Sparkles size={14} />
              <span>Intelligent Decision Support</span>
            </div>
          </div>
        </div>

        <div className="paper-footer-strip">
          <div className="paper-author-tag">
            <span>AUTHOR: SIVANESH R</span>
          </div>
          <div className="paper-status-tag">
            <span className="status-indicator-dot" />
            <span>PRESENTED &amp; CONCLUDED</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResearchSection
