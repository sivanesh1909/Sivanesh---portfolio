import { useEffect, useRef } from 'react'
import { playIntroAnimation } from '../animations/introAnimations'

const particlePositions = Array.from({ length: 38 }, (_, index) => ({
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${12 + ((index * 61) % 76)}%`,
}))

function CinematicIntro({ onComplete }) {
  const root = useRef(null)

  useEffect(() => {
    if (!root.current) return undefined
    const cleanupAnimation = playIntroAnimation(root.current, onComplete)
    const handoff = window.setTimeout(onComplete, 3600)
    return () => { window.clearTimeout(handoff); cleanupAnimation() }
  }, [onComplete])

  return <div className="cinematic-intro" ref={root} aria-label="Opening portfolio sequence">
    <div className="intro-aura" />
    <div className="intro-grid" />
    <div className="intro-sweep" />
    {particlePositions.map((position, index) => <i className="intro-particle" key={index} style={position} />)}
    <div className="intro-stage">
      <span className="intro-coordinate">NODE / 01 — 11.02°N 76.95°E</span>
      <div className="intro-name">SIVANESH <em>R</em></div>
      <div className="intro-role">AI &amp; ML ENGINEER</div>
      <div className="intro-labels"><span>PYTHON</span><span>MACHINE LEARNING</span><span>DATA</span><span>COMPUTER VISION</span></div>
    </div>
  </div>
}

export default CinematicIntro
