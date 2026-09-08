import { useState } from 'react'
import { Code, Brain, BarChart3, Globe, GitBranch, Database } from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    id: 'programming',
    title: 'PROGRAMMING',
    icon: Code,
    summary: 'Core computational logic and database querying languages.',
    skills: ['Python', 'SQL', 'JavaScript'],
  },
  {
    id: 'ai-ml',
    title: 'AI & MACHINE LEARNING',
    icon: Brain,
    summary: 'Model architecture, algorithmic training, and performance verification.',
    skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Development', 'Model Evaluation'],
  },
  {
    id: 'data-analysis',
    title: 'DATA ANALYSIS & VISUALIZATION',
    icon: BarChart3,
    summary: 'Statistical computation, multi-dimensional array manipulation, and plotting.',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'web',
    title: 'WEB TECHNOLOGIES',
    icon: Globe,
    summary: 'Modern standard frontend markup, reactive layouts, and script integration.',
    skills: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'version-control',
    title: 'VERSION CONTROL',
    icon: GitBranch,
    summary: 'Collaborative code repository management, branching, and open-source workflows.',
    skills: ['Git', 'GitHub'],
  },
  {
    id: 'data-skills',
    title: 'DATA SKILLS',
    icon: Database,
    summary: 'Raw dataset transformation, anomaly handling, and hypothesis extraction.',
    skills: ['Data Cleaning', 'Data Preprocessing', 'Exploratory Data Analysis'],
  },
]

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <section className="skills-section portfolio-section" id="skills">
      <div className="section-pre-header">
        <span className="section-index-badge">04 // CAPABILITY NETWORK</span>
        <span className="section-category-badge">TECHNICAL EXPERTISE</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          TECHNICAL <span className="text-amethyst">STACK</span>.
        </h2>
        <p className="section-sub-heading">
          A disciplined foundation in artificial intelligence, analytical data science, and modern software development practices.
        </p>
      </div>

      {/* Interactive Core Matrix */}
      <div className="skills-matrix-grid">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id

          return (
            <div
              key={cat.id}
              className={`skill-category-block ${isActive ? 'is-focused' : ''}`}
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="category-block-header">
                <div className="category-icon-orb">
                  <Icon size={18} />
                </div>
                <div className="category-text-meta">
                  <span className="category-meta-count">{cat.skills.length} COMPETENCIES</span>
                  <h3 className="category-name">{cat.title}</h3>
                </div>
              </div>

              <p className="category-desc">{cat.summary}</p>

              <div className="category-pills-wrap">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-atom-pill">
                    <span className="skill-dot" />
                    {skill}
                  </span>
                ))}
              </div>

              <div className="category-quantum-edge" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsMatrix
