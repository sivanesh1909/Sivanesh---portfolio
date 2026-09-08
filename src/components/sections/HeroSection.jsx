import { ArrowDownRight, ArrowUpRight, Download, Sparkles, Cpu, Activity, Database } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

export function HeroSection({ onNavigate, onReplayIntro }) {
  const baseUrl = import.meta.env.BASE_URL

  const handleNav = (id) => {
    if (onNavigate) onNavigate(id)
    else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section" id="home">
      {/* Subtle Spatial Coordinate & Status Bar */}
      <div className="hero-telemetry-bar">
        <div className="telemetry-item">
          <span className="telemetry-live-dot" />
          <span>STATUS // AVAILABLE FOR ENGINEERING ROLES</span>
          {onReplayIntro && (
            <button
              className="telemetry-replay-btn"
              onClick={onReplayIntro}
              title="Replay intro boot sequence"
              type="button"
            >
              [REPLAY BOOT]
            </button>
          )}
        </div>
        <div className="telemetry-item">
          <span>COIMBATORE, TN • 11.0168°N 76.9558°E</span>
        </div>
      </div>

      <div className="hero-main-grid">
        {/* Left: Main Typographic Cluster */}
        <div className="hero-content-cluster">
          <div className="hero-eyebrow-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING ENGINEER</span>
          </div>

          <h1 className="hero-main-title">
            <span className="title-row title-row-1">SIVANESH</span>
            <span className="title-row title-row-2">
              R <span className="title-discipline-pill">AI / ML</span>
            </span>
          </h1>

          <p className="hero-supporting-lead">
            Artificial Intelligence &amp; Machine Learning Engineer specializing in Python,
            real-time computer vision, predictive modeling, and scalable data solutions.
            Bridging theoretical machine learning with production-grade full-stack architectures.
          </p>

          {/* Action Button Strip */}
          <div className="hero-actions-container">
            <MagneticButton
              className="btn-primary-magnetic"
              onClick={() => handleNav('projects')}
            >
              <span>VIEW PROJECTS</span>
              <ArrowDownRight size={17} />
            </MagneticButton>

            <MagneticButton
              className="btn-secondary-magnetic"
              href={`${baseUrl}Sivanesh2_up.pdf`}
              download="Sivanesh-R-Resume.pdf"
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME</span>
            </MagneticButton>

            <MagneticButton
              className="btn-text-magnetic"
              onClick={() => handleNav('contact')}
            >
              <span>LET’S CONNECT</span>
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>

        {/* Right: Interactive AI Intelligence Telemetry Console */}
        <div className="hero-console-widget" aria-label="AI System Status Console">
          <div className="console-header">
            <div className="console-indicator-dot" />
            <span className="console-title">NEURAL_SYS // RUNTIME METRICS</span>
            <span className="console-latency">12ms LATENCY</span>
          </div>

          <div className="console-body">
            {/* Metric 1 */}
            <div className="console-metric-row">
              <div className="metric-info">
                <Cpu size={14} className="metric-icon-svg" />
                <span>Computer Vision Pipeline</span>
              </div>
              <span className="metric-status-val">REAL-TIME (60 FPS)</span>
            </div>
            <div className="console-progress-track">
              <div className="console-progress-fill cv-fill" />
            </div>

            {/* Metric 2 */}
            <div className="console-metric-row">
              <div className="metric-info">
                <Activity size={14} className="metric-icon-svg" />
                <span>Predictive ML Models</span>
              </div>
              <span className="metric-status-val">98.4% CONFIDENCE</span>
            </div>
            <div className="console-progress-track">
              <div className="console-progress-fill ml-fill" />
            </div>

            {/* Metric 3 */}
            <div className="console-metric-row">
              <div className="metric-info">
                <Database size={14} className="metric-icon-svg" />
                <span>Data Analytics &amp; EDA</span>
              </div>
              <span className="metric-status-val">OPTIMIZED</span>
            </div>
            <div className="console-progress-track">
              <div className="console-progress-fill data-fill" />
            </div>
          </div>

          <div className="console-footer">
            <span>CORE: PYTHON • NUMPY • PANDAS • CV</span>
            {onReplayIntro ? (
              <button
                className="console-reboot-btn"
                onClick={onReplayIntro}
                title="Reboot AI Diagnostics Console"
                type="button"
              >
                REBOOT SYS
              </button>
            ) : (
              <span className="console-status-ok">OPERATIONAL</span>
            )}
          </div>
        </div>
      </div>



      {/* Scroll Down Indicator */}
      <div className="hero-scroll-affordance" onClick={() => handleNav('about')} role="button" tabIndex={0} aria-label="Scroll to explore">
        <span className="scroll-affordance-text">SCROLL TO DISCOVER</span>
        <div className="scroll-affordance-line">
          <div className="scroll-affordance-runner" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
