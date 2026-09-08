import { MoveUpRight, Terminal, Layers } from 'lucide-react'
import ProjectVisual3D from '../scene/ProjectVisual3D'

const PROJECTS = [
  {
    id: '01',
    title: 'AI OBJECT DETECTION SYSTEM',
    category: 'ARTIFICIAL INTELLIGENCE / COMPUTER VISION',
    description:
      'Built an AI-based system to detect and classify objects from images and videos using Python and computer vision techniques.',
    workflow: ['Frame Preprocessing', 'Feature Extraction', 'Bounding-Box Regression', 'Multi-Class Inference'],
    tech: ['Python', 'Computer Vision', 'OpenCV', 'Neural Networks'],
    visual: 'vision',
    codeRef: 'https://github.com/sivanesh1909',
  },
  {
    id: '02',
    title: 'PEER-TO-PEER STUDENT BOOK EXCHANGE',
    category: 'FULL-STACK DEVELOPMENT',
    description:
      'Developed a full-stack platform for buying, selling, and exchanging books between students with secure cataloging and real-time listings.',
    workflow: ['Schema Modeling', 'RESTful API Services', 'State Management', 'Peer-to-Peer Query Engine'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    visual: 'book',
    codeRef: 'https://github.com/sivanesh1909',
  },
  {
    id: '03',
    title: 'CONTENT-BASED MOVIE RECOMMENDATION SYSTEM',
    category: 'MACHINE LEARNING / RECOMMENDATION SYSTEM',
    description:
      'Designed a content-based movie recommendation system that calculates high-dimensional vector similarity to suggest films aligned with user tastes.',
    workflow: ['Metadata Vectorization', 'Cosine Similarity Computation', 'Ranking Algorithm', 'Recommendation Engine'],
    tech: ['Python', 'Data Analysis', 'Scikit-Learn', 'Similarity Algorithms'],
    visual: 'movies',
    codeRef: 'https://github.com/sivanesh1909',
  },
  {
    id: '04',
    title: 'STUDENT ACADEMIC PERFORMANCE PREDICTION',
    category: 'MACHINE LEARNING / DATA SCIENCE',
    description:
      'Developed a machine learning model to predict student academic performance using classification algorithms across diverse behavioral and academic metrics.',
    workflow: ['Data Preprocessing', 'Feature Engineering', 'Model Training', 'Evaluation & Visualization'],
    tech: ['Classification', 'Data Preprocessing', 'Visualization', 'Pandas', 'NumPy'],
    visual: 'signal',
    codeRef: 'https://github.com/sivanesh1909',
  },
]

export function ProjectsGallery() {
  return (
    <section className="projects-section portfolio-section" id="projects">
      <div className="section-pre-header">
        <span className="section-index-badge">03 // SELECTED WORKS</span>
        <span className="section-category-badge">SYSTEMS &amp; ALGORITHMS</span>
      </div>

      <div className="section-title-cluster">
        <h2 className="section-main-heading">
          FEATURED <span className="text-amethyst">PROJECTS</span>.
        </h2>
        <p className="section-sub-heading">
          Engineering implementations spanning real-time computer vision, peer-to-peer web applications, and statistical machine learning architectures.
        </p>
      </div>

      {/* Projects Showcase Container */}
      <div className="projects-showcase-container">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="cinematic-project-card"
            data-cursor="project"
          >
            {/* Visual Scene Stage */}
            <div className="project-visual-stage">
              <ProjectVisual3D type={project.visual} />
              <div className="visual-vignette" />
              <div className="visual-meta-chip">
                <Terminal size={12} />
                <span>SPEC // {project.category}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="project-detail-panel">
              <div className="project-id-row">
                <span className="project-index-number">PROJECT // {project.id}</span>
                <span className="project-tech-count">{project.tech.length} TECHNOLOGIES</span>
              </div>

              <h3 className="project-headline-title">{project.title}</h3>

              <p className="project-description-body">{project.description}</p>

              {/* Engineering Pipeline Steps */}
              <div className="project-workflow-strip">
                <span className="workflow-title">
                  <Layers size={13} />
                  PIPELINE WORKFLOW
                </span>
                <div className="workflow-steps">
                  {project.workflow.map((step, idx) => (
                    <span key={step} className="workflow-step-pill">
                      <span className="step-idx">{idx + 1}.</span> {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="project-tech-pill-row">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub Link CTA */}
              <div className="project-card-footer">
                <a
                  href={project.codeRef}
                  target="_blank"
                  rel="noreferrer"
                  className="project-repo-link"
                  aria-label={`View code for ${project.title} on GitHub`}
                >
                  <span>VIEW REPOSITORY</span>
                  <MoveUpRight size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsGallery
