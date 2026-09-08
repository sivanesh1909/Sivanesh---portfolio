import { GraduationCap, Award, CheckCircle } from 'lucide-react'

const CORE_SKILLS = [
  'Data Analysis & Reporting',
  'Presentation & Communication',
  'Problem Solving',
  'Analytical Thinking',
  'Team Collaboration',
  'Time Management',
  'Quick Learner',
]

export function EducationSection() {
  return (
    <section className="education-section portfolio-section" id="education">
      <div className="section-pre-header">
        <span className="section-index-badge">05 // ACADEMIC FOUNDATION</span>
        <span className="section-category-badge">EDUCATION &amp; CORE STRENGTHS</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          EDUCATION &amp; <span className="text-amethyst">CORE SKILLS</span>.
        </h2>
        <p className="section-sub-heading">
          Rigorous computer science training backed by disciplined problem solving and analytical thinking.
        </p>
      </div>

      {/* Main Education Showcase Card */}
      <div className="education-degree-card">
        <div className="degree-accent-halo" />

        <div className="degree-main-content">
          <div className="degree-header-strip">
            <div className="degree-icon-box">
              <GraduationCap size={28} />
            </div>
            <div className="degree-period-tag">2023 — 2027</div>
          </div>

          <div className="degree-titles-group">
            <span className="degree-level-label">UNDERGRADUATE DEGREE</span>
            <h3 className="degree-name">BACHELOR OF ENGINEERING (BE)</h3>
            <p className="degree-major">Computer Science and Engineering</p>
            <p className="degree-institution">Info Institute of Engineering College</p>
          </div>
        </div>

        {/* CGPA Highlight Metric */}
        <div className="degree-metric-badge">
          <div className="metric-badge-inner">
            <Award size={18} className="metric-icon" />
            <span className="metric-label">CUMULATIVE GPA</span>
            <span className="metric-score">7.98</span>
            <span className="metric-scale">SCALE 10.0</span>
          </div>
        </div>
      </div>

      {/* Core Professional Skills Grid */}
      <div className="core-skills-wrapper">
        <div className="core-skills-header">
          <h4 className="core-skills-title">CORE PROFESSIONAL SKILLS</h4>
          <span className="core-skills-sub">Essential cognitive &amp; collaborative competencies</span>
        </div>

        <div className="core-skills-grid">
          {CORE_SKILLS.map((skill) => (
            <div key={skill} className="core-skill-item">
              <CheckCircle size={15} className="core-skill-check" />
              <span className="core-skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
