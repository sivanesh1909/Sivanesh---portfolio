import { ShieldCheck, Cpu, Database, Layers } from 'lucide-react'

export function AboutSection() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <section className="about-section portfolio-section" id="about">
      <div className="section-pre-header">
        <span className="section-index-badge">01 // PROFILE</span>
        <span className="section-category-badge">BIOGRAPHY &amp; CAPABILITIES</span>
      </div>

      <div className="about-grid-layout">
        {/* Left Column: Portrait & Holographic Specimen Card */}
        <div className="about-portrait-wrapper">
          <div className="portrait-hologram-frame">
            <img
              src={`${baseUrl}profile.jpeg`}
              alt="Portrait of Sivanesh R, AI and ML Engineer"
              className="portrait-img"
              loading="lazy"
            />
            <div className="portrait-gradient-overlay" />
            <div className="portrait-corner-brackets">
              <span className="corner-bracket top-left" />
              <span className="corner-bracket top-right" />
              <span className="corner-bracket bottom-left" />
              <span className="corner-bracket bottom-right" />
            </div>
            <div className="portrait-telemetry-tag">
              <span className="telemetry-id">ID: SR-2026-ENG</span>
              <span className="telemetry-role">COIMBATORE, TN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Narrative */}
        <div className="about-narrative-column">
          <div className="about-heading-cluster">
            <span className="about-super-title">CORE PHILOSOPHY</span>
            <h2 className="about-headline">
              I BUILD <span className="text-amethyst">INTELLIGENT</span> SYSTEMS.
            </h2>
          </div>

          <p className="about-lead-statement">
            Motivated and detail-oriented Artificial Intelligence and Machine Learning Engineer
            with strong proficiency in Python, data analysis, and machine learning fundamentals.
          </p>

          <p className="about-secondary-statement">
            Currently pursuing a Bachelor of Engineering in Computer Science and Engineering with
            hands-on experience in NumPy, Pandas, SQL, and data visualization. Eager to apply technical
            skills to build scalable, data-driven solutions that bridge mathematical modeling with
            reliable real-world application.
          </p>

          {/* Pillars of Engineering */}
          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <Cpu size={20} className="pillar-icon" />
              <h4 className="pillar-title">AI &amp; ML Modeling</h4>
              <p className="pillar-desc">Supervised &amp; unsupervised learning, computer vision, and predictive systems.</p>
            </div>

            <div className="about-pillar-card">
              <Database size={20} className="pillar-icon" />
              <h4 className="pillar-title">Data Analytics</h4>
              <p className="pillar-desc">Exploratory data analysis, cleaning, feature engineering, and reporting with Pandas &amp; SQL.</p>
            </div>

            <div className="about-pillar-card">
              <Layers size={20} className="pillar-icon" />
              <h4 className="pillar-title">Full-Stack Tech</h4>
              <p className="pillar-desc">Connecting machine learning systems with modern reactive interfaces and APIs.</p>
            </div>

            <div className="about-pillar-card">
              <ShieldCheck size={20} className="pillar-icon" />
              <h4 className="pillar-title">Precision Execution</h4>
              <p className="pillar-desc">Clean modular code, structured version control, and verifiable model metrics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
