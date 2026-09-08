import gsap from 'gsap'

export function playIntroAnimation(root, onComplete) {
  if (!root) {
    if (onComplete) onComplete()
    return () => {}
  }

  const timeline = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete()
    },
  })

  const dot = root.querySelector('.singularity-dot')
  const ripples = root.querySelectorAll('.singularity-ripple')
  const aura = root.querySelector('.singularity-aura')
  const nodes = root.querySelectorAll('.genesis-satellite-node')
  const filaments = root.querySelectorAll('.genesis-filament-line')
  const heroContent = root.querySelector('.genesis-hero-content')
  const name = root.querySelector('.genesis-title-name')
  const role = root.querySelector('.genesis-subtitle-role')
  const tags = root.querySelectorAll('.genesis-tag-item')
  const telemetry = root.querySelector('.genesis-telemetry-cluster')
  const supernova = root.querySelector('.genesis-supernova-blast')

  timeline.set(root, { autoAlpha: 1, pointerEvents: 'auto' })

  // ==========================================
  // PHASE 1: A SINGLE DOT (0.0s — 1.2s)
  // ==========================================
  if (dot) {
    timeline
      .fromTo(
        dot,
        { scale: 0, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(2.5)' }
      )
      .to(
        dot,
        {
          boxShadow: '0 0 35px #ffffff, 0 0 70px #c4b5fd, 0 0 120px #a855f7',
          duration: 0.4,
          repeat: 1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        '-=0.2'
      )
  }

  if (ripples && ripples.length > 0) {
    timeline.fromTo(
      ripples,
      { scale: 0.1, opacity: 0.9 },
      { scale: 2.8, opacity: 0, duration: 1.2, stagger: 0.25, ease: 'power2.out' },
      0.4
    )
  }

  // ==========================================
  // PHASE 2: GENESIS PROLIFERATION (1.2s — 2.5s)
  // From the single dot, satellite nodes & filaments radiate outward
  // ==========================================
  if (aura) {
    timeline.fromTo(
      aura,
      { scale: 0.1, opacity: 0 },
      { scale: 1, opacity: 0.85, duration: 1.1, ease: 'power2.out' },
      1.1
    )
  }

  if (filaments && filaments.length > 0) {
    timeline.fromTo(
      filaments,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.7, duration: 1.0, stagger: 0.04, ease: 'power3.out' },
      1.2
    )
  }

  if (nodes && nodes.length > 0) {
    timeline.fromTo(
      nodes,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'back.out(1.8)' },
      1.3
    )
  }

  // ==========================================
  // PHASE 3: EXPANSION TO ALL (2.5s — 3.8s)
  // Constellation connects across the entire viewport, revealing identity
  // ==========================================
  if (telemetry) {
    timeline.fromTo(
      telemetry,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      2.3
    )
  }

  if (heroContent) {
    timeline.fromTo(
      heroContent,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      2.5
    )
  }

  if (name) {
    timeline.fromTo(
      name,
      { y: 35, opacity: 0, filter: 'blur(14px)', letterSpacing: '0.15em' },
      { y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.02em', duration: 0.8, ease: 'power4.out' },
      2.6
    )
  }

  if (role) {
    timeline.fromTo(
      role,
      { y: 15, opacity: 0, letterSpacing: '0.4em' },
      { y: 0, opacity: 1, letterSpacing: '0.22em', duration: 0.5, ease: 'power3.out' },
      2.9
    )
  }

  if (tags && tags.length > 0) {
    timeline.fromTo(
      tags,
      { y: 10, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.4, ease: 'back.out(1.5)' },
      3.1
    )
  }

  // ==========================================
  // PHASE 4: CRITICAL CONVERGENCE (3.8s — 4.6s)
  // All energy converges into blinding singularity
  // ==========================================
  if (dot) {
    timeline.to(
      dot,
      {
        scale: 2.2,
        boxShadow: '0 0 50px #ffffff, 0 0 100px #c4b5fd, 0 0 180px #a855f7',
        duration: 0.7,
        ease: 'power2.in',
      },
      3.8
    )
  }

  if (aura) {
    timeline.to(
      aura,
      {
        scale: 2.5,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.in',
      },
      3.8
    )
  }

  // ==========================================
  // PHASE 5: SUPERNOVA HYPERSPACE WARP (4.6s — 5.0s)
  // The dot explodes to all, revealing the portfolio
  // ==========================================
  if (supernova) {
    timeline.fromTo(
      supernova,
      { scale: 0, opacity: 0 },
      { scale: 18, opacity: 1, duration: 0.35, ease: 'power3.in' },
      4.55
    )
  }

  timeline.to(
    root,
    {
      autoAlpha: 0,
      filter: 'blur(12px)',
      duration: 0.4,
      ease: 'power3.inOut',
    },
    4.7
  )

  return () => {
    timeline.kill()
  }
}
