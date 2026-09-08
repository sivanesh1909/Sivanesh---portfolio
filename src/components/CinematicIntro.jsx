import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Sparkles, ArrowUpRight, Cpu, Activity } from 'lucide-react'
import { playIntroAnimation } from '../animations/introAnimations'

// 12 satellite nodes radiating outward from the single dot to all edges
const SATELLITE_NODES = [
  { id: 1, angle: 0, distance: 130, delay: 0 },
  { id: 2, angle: 30, distance: 180, delay: 0.1 },
  { id: 3, angle: 65, distance: 230, delay: 0.2 },
  { id: 4, angle: 105, distance: 160, delay: 0.15 },
  { id: 5, angle: 145, distance: 240, delay: 0.25 },
  { id: 6, angle: 180, distance: 140, delay: 0.05 },
  { id: 7, angle: 215, distance: 220, delay: 0.2 },
  { id: 8, angle: 250, distance: 170, delay: 0.1 },
  { id: 9, angle: 285, distance: 250, delay: 0.3 },
  { id: 10, angle: 315, distance: 150, delay: 0.12 },
  { id: 11, angle: 45, distance: 290, delay: 0.35 },
  { id: 12, angle: 225, distance: 300, delay: 0.38 },
]

const TIMELINE_STEPS = [
  { time: 1.0, label: '0.0s — 1.0s', msg: 'A SINGLE DOT // THE QUANTUM SINGULARITY' },
  { time: 2.2, label: '1.2s — 2.2s', msg: 'GENESIS // SYNAPSES RADIATE OUTWARD' },
  { time: 3.5, label: '2.5s — 3.5s', msg: 'EXPANSION // FROM A SINGLE DOT TO ALL' },
  { time: 4.6, label: '3.8s — 4.6s', msg: 'CRITICAL CONVERGENCE // NEURAL NETWORK INITIALIZED' },
  { time: 5.0, label: '5.0s', msg: 'SUPERNOVA REVEAL // WELCOME TO PORTFOLIO' },
]

export function CinematicIntro({ onComplete }) {
  const rootRef = useRef(null)
  const isExitingRef = useRef(false)
  const cleanupAnimRef = useRef(null)
  const [progress, setProgress] = useState(0)

  // Current stage message based on progress percentage
  const currentStep =
    TIMELINE_STEPS.find((s) => (progress / 100) * 5 <= s.time) ||
    TIMELINE_STEPS[TIMELINE_STEPS.length - 1]

  const handleFinish = useCallback(() => {
    if (isExitingRef.current) return
    isExitingRef.current = true

    if (cleanupAnimRef.current) {
      cleanupAnimRef.current()
    }

    if (rootRef.current) {
      const supernova = rootRef.current.querySelector('.genesis-supernova-blast')
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      if (supernova) {
        exitTl.fromTo(
          supernova,
          { scale: 0, opacity: 0 },
          { scale: 22, opacity: 1, duration: 0.35, ease: 'power3.in' }
        )
      }

      exitTl.to(rootRef.current, {
        autoAlpha: 0,
        filter: 'blur(16px)',
        duration: 0.35,
        ease: 'power3.out',
      }, '<')
    } else if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete()
      return undefined
    }

    // Paced to run across 5.0 seconds (100 ticks of 50ms = 5000ms = 5s)
    const counterTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(counterTimer)
          return 100
        }
        return prev + 1
      })
    }, 50)

    if (rootRef.current) {
      cleanupAnimRef.current = playIntroAnimation(rootRef.current, () => {
        if (!isExitingRef.current) {
          isExitingRef.current = true
          if (onComplete) onComplete()
        }
      })
    }

    // 5.0s experience + grace margin for smooth warp exit
    const fallbackTimeout = window.setTimeout(handleFinish, 5200)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(counterTimer)
      window.clearTimeout(fallbackTimeout)
      window.removeEventListener('keydown', handleKeyDown)
      if (cleanupAnimRef.current) {
        cleanupAnimRef.current()
      }
    }
  }, [handleFinish, onComplete])

  return (
    <div
      className="genesis-dot-intro"
      ref={rootRef}
      onClick={handleFinish}
      aria-label="Genesis Intro: From A Single Dot To All (5 Seconds) - Click or press Space to enter"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Ambience & Perspective Grid */}
      <div className="genesis-space-grid" aria-hidden="true" />

      {/* Top HUD Telemetry Status */}
      <div className="genesis-hud-top" aria-hidden="true">
        <div className="genesis-hud-pill">
          <Activity size={12} className="genesis-icon" />
          <span>GENESIS // SINGLE DOT TO ALL</span>
        </div>
        <div className="genesis-hud-pill">
          <span className="genesis-live-beacon" />
          <span>5.0s SEQUENCE • {progress}%</span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        className="genesis-skip-btn"
        onClick={(e) => {
          e.stopPropagation()
          handleFinish()
        }}
        aria-label="Skip 5-second intro and enter portfolio directly"
        type="button"
      >
        <span>ENTER NOW [ESC]</span>
        <ArrowUpRight size={14} />
      </button>

      {/* Central Singularity Canvas: The Single Dot and Radiating Filament Web */}
      <div className="genesis-cosmos-stage" aria-hidden="true">
        {/* Expanding Cosmic Photon Aura */}
        <div className="singularity-aura" />

        {/* Concentric Energy Shockwaves emitted by the single dot */}
        <div className="singularity-ripple r1" />
        <div className="singularity-ripple r2" />
        <div className="singularity-ripple r3" />

        {/* Radiating Synapse Filaments from the center dot */}
        {SATELLITE_NODES.map((node) => (
          <div
            key={node.id}
            className="genesis-filament-line"
            style={{
              width: `${node.distance}px`,
              transform: `rotate(${node.angle}deg)`,
            }}
          />
        ))}

        {/* Satellite Nodes that bloom from the single dot to all */}
        {SATELLITE_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const x = Math.cos(rad) * node.distance
          const y = Math.sin(rad) * node.distance
          return (
            <div
              key={node.id}
              className="genesis-satellite-node"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <span className="node-photon" />
            </div>
          )
        })}

        {/* THE SINGLE DOT (The Singularity Origin) */}
        <div className="singularity-dot">
          <div className="dot-inner-core" />
          <div className="dot-outer-flare" />
        </div>

        {/* Supernova Blast Ring for the 5th second warp explosion */}
        <div className="genesis-supernova-blast" />
      </div>

      {/* Central Identity & Typography Reveal (Blooming from the Dot) */}
      <div className="genesis-hero-content">
        {/* Live Stage Log */}
        <div className="genesis-telemetry-cluster">
          <Sparkles size={13} className="telemetry-sparkle" />
          <span className="telemetry-step-pill">{currentStep.label}</span>
          <span className="telemetry-bracket">//</span>
          <span className="telemetry-text">{currentStep.msg}</span>
          <span className="telemetry-bracket">//</span>
          <span className="telemetry-percentage">{progress}%</span>
        </div>

        {/* High-Precision Progress Timeline Bar */}
        <div className="genesis-progress-track" aria-hidden="true">
          <div
            className="genesis-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Typographic Hero Reveal */}
        <h1 className="genesis-title-name">
          SIVANESH <span className="genesis-glow-accent">R</span>
        </h1>

        <p className="genesis-subtitle-role">
          ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING ENGINEER
        </p>

        {/* Spec Pill Badges */}
        <div className="genesis-tags-row">
          <span className="genesis-tag-item">
            <Cpu size={11} /> PYTHON 3.12
          </span>
          <span className="genesis-tag-item">COMPUTER VISION</span>
          <span className="genesis-tag-item">PREDICTIVE ML</span>
          <span className="genesis-tag-item">DATA ANALYTICS</span>
        </div>

        {/* Skip hint */}
        <div className="genesis-bottom-hint" aria-hidden="true">
          <span className="hint-pulse-dot" />
          <span>CLICK ANYWHERE OR PRESS [SPACE] TO ENTER</span>
        </div>
      </div>
    </div>
  )
}

export default CinematicIntro
