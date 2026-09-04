import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X, Mail, MapPin, Phone, Code2, BriefcaseBusiness, MoveUpRight, Download } from 'lucide-react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import CinematicIntro from './components/CinematicIntro'
import { useGsapExperience } from './hooks/useGsapExperience'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const NeuralField = lazy(() => import('./components/NeuralField'))

const projects = [
  { number: '01', title: 'Peer-to-peer\nstudent book exchange', type: 'MERN STACK', description: 'A full-stack platform for buying, selling, and exchanging books.', tags: ['React', 'Node.js', 'Express', 'MongoDB'], visual: 'book' },
  { number: '02', title: 'AI object\ndetection system', type: 'COMPUTER VISION', description: 'An AI-based system for detecting and classifying objects from images and videos.', tags: ['Python', 'Computer Vision'], visual: 'vision' },
  { number: '03', title: 'Content-based movie\nrecommendation system', type: 'SIMILARITY ALGORITHMS', description: 'A recommendation system that suggests movies based on user preferences.', tags: ['Python', 'Data Analysis'], visual: 'movies' },
  { number: '04', title: 'Student academic\nperformance prediction', type: 'MACHINE LEARNING', description: 'A model predicting academic performance through preprocessing, feature engineering, training, and evaluation.', tags: ['Classification', 'Visualization'], visual: 'signal' },
]

const skillGroups = [
  ['PROGRAMMING', 'Python', 'SQL', 'JavaScript'],
  ['AI & MACHINE LEARNING', 'Supervised Learning', 'Unsupervised Learning', 'Model Development', 'Model Evaluation'],
  ['DATA', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Cleaning', 'Preprocessing', 'EDA'],
  ['WEB', 'HTML5', 'CSS3', 'JavaScript'],
  ['VERSION CONTROL', 'Git', 'GitHub'],
]

const navItems = ['about', 'experience', 'projects', 'skills', 'contact']
const baseUrl = import.meta.env.BASE_URL

function SignalVisual({ type }) {
  return <div className={`project-art art-${type}`} aria-hidden="true"><div className="art-grid" />
    {type === 'book' && <><div className="book-shape book-one" /><div className="book-shape book-two" /><div className="book-line" /></>}
    {type === 'vision' && <><div className="scan-box" /><div className="scan-cross" /><div className="scan-dot" /><span className="scan-label">OBJECT / 04</span></>}
    {type === 'movies' && <><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-core" /><span className="orbit-label">SIMILARITY</span></>}
    {type === 'signal' && <><div className="signal-wave" /><div className="signal-node node-a" /><div className="signal-node node-b" /><span className="signal-label">MODEL / 04</span></>}
  </div>
}

function copyEmail() {
  navigator.clipboard?.writeText('sivaneshredu@gmail.com')
}

function App() {
  const shouldReplayIntro = import.meta.env.DEV || !sessionStorage.getItem('sr-intro-seen')
  const [intro, setIntro] = useState(shouldReplayIntro)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const completeIntro = () => { sessionStorage.setItem('sr-intro-seen', 'true'); setIntro(false) }
  useEffect(() => { if (intro || window.matchMedia('(pointer: coarse)').matches) { delete window.__portfolioLenis; return undefined }; const lenis = new Lenis({ lerp: 0.14, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.85 }); const updateScrollTrigger = () => ScrollTrigger.update(); const updateLenis = (time) => lenis.raf(time * 1000); lenis.on('scroll', updateScrollTrigger); window.__portfolioLenis = lenis; gsap.ticker.add(updateLenis); gsap.ticker.lagSmoothing(0); ScrollTrigger.refresh(); return () => { gsap.ticker.remove(updateLenis); lenis.off('scroll', updateScrollTrigger); lenis.destroy(); delete window.__portfolioLenis } }, [intro])
  useGsapExperience(!intro)
  useEffect(() => { const onScroll = () => { const ids = ['home', ...navItems]; const current = ids.reverse().find((id) => document.getElementById(id)?.getBoundingClientRect().top <= 180); if (current) setActive(current) }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const go = (id) => { setMenuOpen(false); const target = document.getElementById(id); if (!target) return; if (window.__portfolioLenis) window.__portfolioLenis.scrollTo(target, { offset: -80, duration: 1.2, force: true }); else target.scrollIntoView({ behavior: 'smooth' }) }
  if (intro) return <CinematicIntro onComplete={completeIntro} />
  return <div className="site-shell">
    <CustomCursor />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className={`nav ${active !== 'home' ? 'nav-scrolled' : ''}`}><button className="wordmark" onClick={() => go('home')}>SIVANESH <span>R</span></button><div className="nav-links">{navItems.map((item) => <button className={active === item ? 'active' : ''} key={item} onClick={() => go(item)}>{item}</button>)}</div><a className="resume-download" href={`${baseUrl}Sivanesh2_up.pdf`} download="Sivanesh-R-Resume.pdf"><Download size={14} /> RESUME</a><button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button></header>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}><button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button><span className="eyebrow">NAV / 00</span>{['home', ...navItems].map((item, i) => <button key={item} onClick={() => go(item)}><small>0{i + 1}</small>{item}</button>)}<p>AI &amp; ML ENGINEER<br />DATA ANALYST</p></div>

    <main>
      <section className="hero section-pad" id="home"><div className="hero-grid" /><Suspense fallback={<div className="neural-field neural-fallback" aria-hidden="true" />}><NeuralField /></Suspense><div className="hero-kicker"><span>PORTFOLIO / 2026</span><span>COIMBATORE, IN</span></div><div className="hero-content"><p className="eyebrow reveal">AI &amp; ML ENGINEER <i>+</i> DATA ANALYST</p><h1><span>SIVANESH<em> R</em></span></h1><p className="hero-description">Building data-driven solutions with AI, machine learning, and modern web technologies.</p><div className="hero-actions"><button data-magnetic className="action-button" onClick={() => go('projects')}>View projects <ArrowDownRight size={17} /></button><button data-magnetic className="text-button" onClick={() => go('about')}>About me <ArrowUpRight size={16} /></button></div></div><div className="hero-signal"><div className="signal-ring ring-one" /><div className="signal-ring ring-two" /><div className="hero-point point-one" /><div className="hero-point point-two" /><div className="hero-point point-three" /><div className="hero-vertical" /><span>NEURAL<br />FIELD / 01</span></div><button data-cursor="project" className="featured-project" onClick={() => go('projects')}><span className="eyebrow">FEATURED PROJECT / 01</span><strong>PEER-TO-PEER<br />STUDENT BOOK EXCHANGE</strong><span className="featured-arrow"><MoveUpRight size={15} /> VIEW CASE</span></button><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><div /></div></section>

      <section className="about section-pad" id="about"><div className="section-index">01 <span>/</span> PROFILE</div><div className="about-layout"><div className="portrait-placeholder"><img className="profile-image" src={`${baseUrl}profile.jpeg`} alt="Portrait of Sivanesh R" loading="lazy" /><div className="portrait-inner" aria-hidden="true" /><div className="portrait-caption">SIVANESH R — AI / ML</div></div><div className="about-copy"><h2>ABOUT<span>.</span></h2><p className="lead">Motivated and detail-oriented Artificial Intelligence and Machine Learning Engineer with strong proficiency in Python, data analysis, and machine learning fundamentals, with hands-on experience in NumPy, Pandas, SQL, data visualization, and building data-driven solutions.</p><div className="about-tags"><span>AI / ML</span><span>DATA</span><span>WEB</span><span>ANALYTICS</span></div></div></div></section>

      <section className="experience section-pad" id="experience"><div className="section-index">02 <span>/</span> EXPERIENCE</div><div className="experience-head"><h2>WORK<br /><i>IN MOTION</i></h2><p>Hands-on environments where systems meet real questions.</p></div><div className="timeline"><div className="timeline-rail" aria-hidden="true"><span className="timeline-progress" /></div><article><div className="timeline-marker">01</div><div className="timeline-meta"><span>JUN 2025 — JUL 2025</span><span>COIMBATORE</span></div><div><h3>PROJECT INTERN</h3><p className="company">EMGLITZ TECHNOLOGY</p><p>Built an AI-based system to detect and classify objects from images and videos using Python and computer vision techniques.</p></div></article><article><div className="timeline-marker">02</div><div className="timeline-meta"><span>JUL 2026 — AUG 2026</span><span>BENGALURU</span></div><div><h3>SALES &amp; MARKETING INTERN</h3><p className="company">TECH VEDHU</p><p>Supported content-based movie recommendation and student academic performance prediction systems through data preprocessing, feature engineering, model training, evaluation, and visualization.</p></div></article></div></section>

      <section className="projects section-pad" id="projects"><div className="section-index">03 <span>/</span> SELECTED WORK</div><div className="projects-head"><h2>PROJECTS<span>.</span></h2><p>Scroll through a sequence of systems, patterns, and useful intelligence.</p></div><div className="projects-track">{projects.map((project) => <article className="project-row" data-cursor="project" key={project.number}><div className="project-number">{project.number}</div><div className="project-main"><SignalVisual type={project.visual} /><div className="project-info"><span className="eyebrow">{project.type}</span><h3>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div><MoveUpRight className="project-arrow" size={21} /></article>)}</div></section>

      <section className="skills section-pad" id="skills"><div className="section-index">04 <span>/</span> CAPABILITIES</div><div className="skills-layout"><h2>TOOLS FOR<br /><i>THINKING.</i></h2><div className="skill-list">{skillGroups.map(([name, ...items]) => <div className="skill-group" key={name}><span>{name}</span><div>{items.map((item) => <b key={item}>{item}</b>)}</div></div>)}</div></div></section>

      <section className="proof section-pad"><div className="proof-top"><div className="section-index">05 <span>/</span> PROOF OF WORK</div><div className="winner-mark">✳ <span>WINNER</span></div></div><div className="proof-grid"><div><span className="eyebrow">CERTIFICATIONS / ACHIEVEMENTS</span><h2>CURIOUS BY<br /><i>DEFAULT.</i></h2></div><div className="proof-list"><p><span>01</span> Python Programming — LeetCode</p><p><span>02</span> Cybersecurity Fundamentals — IBM</p><p><span>03</span> Oracle Cloud — Oracle</p><p><span>04</span> TRISUADATHON Hackathon — Participant</p><p><span>05</span> Code Fusion (Symposium-ELECT-ERA’26-CIT) — <strong>WINNER</strong></p></div></div></section>

      <section className="research section-pad"><div className="research-grid" /><div className="section-index">06 <span>/</span> RESEARCH NOTE</div><div className="research-content"><span className="eyebrow">NATIONAL CONFERENCE PAPER — 2025</span><h2>SMART HR-AI<br /><i>AUTOMATION</i><br />IN HR MANAGEMENT</h2><div className="research-foot"><span>SR / PAPER 01</span><span>APPLIED INTELLIGENCE</span><div className="research-diagram"><i /><i /><i /><i /><b /></div></div></div></section>

      <section className="education section-pad"><div className="section-index">07 <span>/</span> EDUCATION</div><div className="education-row"><span className="edu-year">2023–202</span><div><h2>BACHELOR OF<br /><i>ENGINEERING</i></h2><p>Computer Science and Engineering<br />Info Institute of Engineering College</p></div><strong>CGPA<br /><b>7.98</b></strong></div><div className="core-skills"><span className="eyebrow">CORE SKILLS</span><div>{['Data Analysis & Reporting', 'Presentation & Communication', 'Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Time Management', 'Quick Learner'].map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>

      <section className="contact section-pad" id="contact"><div className="contact-top"><span className="eyebrow">08 / CONTACT</span><span>OPEN TO OPPORTUNITIES</span></div><h2>LET’S BUILD<br /><i>SOMETHING</i><br />INTELLIGENT<span>.</span></h2><div className="contact-bottom"><p>Open to opportunities, collaborations and interesting technical challenges.</p><div className="contact-details"><a className="send-mail" data-magnetic href="mailto:sivaneshredu@gmail.com?subject=Portfolio%20enquiry%20for%20Sivanesh%20R&body=Hello%20Sivanesh%2C%0A%0AI%20would%20like%20to%20connect%20with%20you%20about%20..." target="_blank" rel="noreferrer"><Mail size={15} />SEND EMAIL <ArrowUpRight size={15} /></a><button className="copy-email" type="button" onClick={copyEmail}>COPY EMAIL</button><a href="mailto:sivaneshredu@gmail.com">sivaneshredu@gmail.com</a><a href="tel:+917200843124"><Phone size={15} />+91 7200843124</a><span><MapPin size={15} />Coimbatore, Tamil Nadu</span></div><div className="social-links"><a href="https://www.linkedin.com/in/sivanesh-r-a4a98b2a2" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={17} /><span>LINKEDIN</span></a><a href="https://github.com/sivanesh1909" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17} /><span>GITHUB</span></a></div></div></section>
    </main>
    <footer><button className="wordmark" onClick={() => go('home')}>SIVANESH <span>R</span></button><span>AI &amp; ML ENGINEER / DATA ANALYST</span><span>© 2026 SIVANESH R</span><button className="back-top" onClick={() => go('home')}>BACK TO TOP <ArrowUpRight size={15} /></button></footer>
  </div>
}

export default App
