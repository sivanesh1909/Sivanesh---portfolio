import { useState, useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './components/Navigation'
import CustomCursor from './components/CustomCursor'
import ClickEffects from './components/ClickEffects'
import CinematicIntro from './components/CinematicIntro'

import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsGallery from './components/sections/ProjectsGallery'
import SkillsMatrix from './components/sections/SkillsMatrix'
import EducationSection from './components/sections/EducationSection'
import ProofSection from './components/sections/ProofSection'
import ResearchSection from './components/sections/ResearchSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'

import { useGsapScroll } from './hooks/useGsapScroll'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const SceneContainer = lazy(() => import('./components/scene/SceneContainer'))

const SECTION_IDS = [
  'home',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'proof',
  'research',
  'contact',
]

export function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isIntroMounted, setIsIntroMounted] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  const handleIntroComplete = () => {
    setShowIntro(false)
    setTimeout(() => {
      setIsIntroMounted(false)
    }, 450)
  }

  const handleReplayIntro = () => {
    setIsIntroMounted(true)
    setShowIntro(true)
  }

  // Synchronize Lenis Smooth Scroll with GSAP ScrollTrigger (Desktop Only)
  useEffect(() => {
    if (showIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      delete window.__portfolioLenis
      return undefined
    }

    const isTouchOrMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    if (isTouchOrMobile) {
      // Hardware-accelerated 120Hz native touch scroll on mobile devices
      delete window.__portfolioLenis
      ScrollTrigger.refresh()
      return undefined
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
    })

    const onScrollTriggerUpdate = () => ScrollTrigger.update()
    const onLenisTicker = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', onScrollTriggerUpdate)
    window.__portfolioLenis = lenis
    gsap.ticker.add(onLenisTicker)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(onLenisTicker)
      lenis.off('scroll', onScrollTriggerUpdate)
      lenis.destroy()
      delete window.__portfolioLenis
    }
  }, [showIntro])

  // Active section tracking for Navigation & 3D Camera Rig
  useEffect(() => {
    const handleScrollTracking = () => {
      const reversedIds = [...SECTION_IDS].reverse()
      const current = reversedIds.find((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= window.innerHeight * 0.45
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScrollTracking, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollTracking)
  }, [])

  // Section Navigation Dispatcher
  const navigateToSection = (id) => {
    const target = document.getElementById(id)
    if (!target) return

    if (window.__portfolioLenis) {
      window.__portfolioLenis.scrollTo(target, {
        offset: -40,
        duration: 1.2,
      })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Activate ScrollTrigger animations when intro concludes
  useGsapScroll(!showIntro)

  return (
    <div className="site-wrapper">
      {/* Cinematic AI Boot Intro Overlay */}
      {isIntroMounted && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Desktop Photon Cursor & Interactive Click Particles */}
      <CustomCursor />
      <ClickEffects />

      {/* Atmospheric Spatial Light Spheres */}
      <div className="ambient-glow-sphere ambient-primary" aria-hidden="true" />
      <div className="ambient-glow-sphere ambient-secondary" aria-hidden="true" />

      {/* Background 3D Interactive WebGL Scene */}
      <Suspense fallback={null}>
        <SceneContainer activeSection={activeSection} />
      </Suspense>

      {/* Floating Navigation Dock */}
      <Navigation
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Experience Flow */}
      <main id="main-content">
        <HeroSection
          onNavigate={navigateToSection}
          onReplayIntro={handleReplayIntro}
        />
        <AboutSection />
        <ExperienceSection />
        <ProjectsGallery />
        <SkillsMatrix />
        <EducationSection />
        <ProofSection />
        <ResearchSection />
        <ContactSection />
      </main>

      {/* Verified Professional Footer */}
      <Footer onNavigate={navigateToSection} />
    </div>
  )
}

export default App
