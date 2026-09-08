import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

const EXPERIENCES = [
  {
    number: '01',
    role: 'ARTIFICIAL INTELLIGENCE INTERN',
    company: 'EMGLITZ TECHNOLOGY',
    location: 'Coimbatore, Tamil Nadu',
    period: 'JUNE 2025 — JULY 2025',
    project: 'AI Object Detection System',
    description:
      'Built an AI-based system to detect and classify objects from images and videos using Python and computer vision techniques.',
    highlights: [
      'Implemented image preprocessing and bounding-box detection algorithms.',
      'Trained and evaluated vision models for accurate multi-class classification.',
      'Developed real-time video stream object inference pipelines.',
    ],
    tech: ['Python', 'Computer Vision', 'Image Processing', 'Object Classification'],
  },
  {
    number: '02',
    role: 'ARTIFICIAL INTELLIGENCE INTERN',
    company: 'TECH VEDHU',
    location: 'Bengaluru, Karnataka',
    period: 'JULY 2026 — AUGUST 2026',
    project: 'AI & Data Intelligence Systems',
    description:
      'Engineered machine learning pipelines, predictive modeling workflows, and automated analytical frameworks to extract intelligent actionable insights.',
    highlights: [
      'Built and evaluated machine learning models for predictive analysis and pattern recognition.',
      'Conducted exploratory data analysis (EDA), automated feature engineering, and validation pipelines.',
      'Synthesized quantitative AI intelligence and automated metrics reporting for stakeholders.',
    ],
    tech: ['Python', 'Machine Learning', 'Predictive Modeling', 'Data Preprocessing', 'EDA'],
  },
]

export function ExperienceSection() {
  return (
    <section className="experience-section portfolio-section" id="experience">
      <div className="section-pre-header">
        <span className="section-index-badge">02 // CAREER TIMELINE</span>
        <span className="section-category-badge">INDUSTRY EXPERIENCE</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          PRACTICAL <span className="text-amethyst">EXPERIENCE</span>.
        </h2>
        <p className="section-sub-heading">
          Engineering environments and analytical internships where theoretical machine learning meets real-world datasets.
        </p>
      </div>

      <div className="experience-timeline-container">
        {/* Animated illuminated timeline rail */}
        <div className="experience-rail-track" aria-hidden="true">
          <div className="experience-rail-fill" />
        </div>

        <div className="experience-cards-stack">
          {EXPERIENCES.map((exp) => (
            <article key={exp.number} className="experience-entry-card">
              <div className="entry-marker-cluster" aria-label={`Timeline Stage ${exp.number}`}>
                <div className="entry-timeline-node">
                  <span className="entry-node-number">{exp.number}</span>
                </div>
              </div>

              <div className="entry-content-body">
                <div className="entry-meta-header">
                  <div className="meta-role-group">
                    <div className="meta-company-row">
                      <span className="meta-company-name">{exp.company}</span>
                      <span className="meta-exp-index">PHASE // {exp.number}</span>
                    </div>
                    <h3 className="meta-role-title">{exp.role}</h3>
                  </div>

                  <div className="meta-badges-group">
                    <span className="meta-badge">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className="meta-badge">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="entry-project-banner">
                  <Briefcase size={14} className="banner-icon" />
                  <span>PROJECT FOCUS: <strong>{exp.project}</strong></span>
                </div>

                <p className="entry-description-text">{exp.description}</p>

                <ul className="entry-highlights-list">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className="check-bullet" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="entry-tags-row">
                  {exp.tech.map((t) => (
                    <span key={t} className="entry-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
