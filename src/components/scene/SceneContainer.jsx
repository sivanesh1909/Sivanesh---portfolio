import { useEffect, useRef } from 'react'

const SECTION_THEMES = {
  home: { primary: '168, 85, 247', secondary: '196, 181, 253', speed: 1 },
  about: { primary: '139, 92, 246', secondary: '216, 180, 254', speed: 0.9 },
  experience: { primary: '99, 102, 241', secondary: '165, 180, 252', speed: 1.1 },
  projects: { primary: '56, 189, 248', secondary: '168, 85, 247', speed: 1.2 },
  skills: { primary: '147, 51, 234', secondary: '232, 121, 249', speed: 1 },
  education: { primary: '192, 132, 252', secondary: '129, 140, 248', speed: 0.85 },
  proof: { primary: '52, 211, 153', secondary: '168, 85, 247', speed: 1.1 },
  research: { primary: '96, 165, 250', secondary: '196, 181, 253', speed: 0.95 },
  contact: { primary: '244, 114, 182', secondary: '168, 85, 247', speed: 1 },
}

export function SceneContainer({ activeSection = 'home' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, targetX: -1000, targetY: -1000, active: false })
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const nodeCount = isMobile ? 32 : 64
    const maxDist = isMobile ? 110 : 160

    let animId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2)

    const updateSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Particle nodes
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.55 : 0.75),
      vy: (Math.random() - 0.5) * (isMobile ? 0.55 : 0.75),
      radius: 1.4 + Math.random() * 2.2,
      baseRadius: 1.4 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.02 + Math.random() * 0.03,
      pulse: 0,
    }))

    // Synapse signals traveling between nodes
    const signals = []
    const spawnSignal = (fromNode, toNode) => {
      if (signals.length > 25) return
      signals.push({
        from: fromNode,
        to: toNode,
        progress: 0,
        speed: 0.025 + Math.random() * 0.035,
      })
    }

    const handlePointerMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
        mouseRef.current.active = true
      }
    }

    const handlePointerLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    // Trigger signal burst on click or tap
    const handleClick = (e) => {
      const clickX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : width / 2)
      const clickY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : height / 2)
      nodes.forEach((node) => {
        const dx = node.x - clickX
        const dy = node.y - clickY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 220) {
          node.pulse = 1
          node.vx += (dx / dist) * 2.5
          node.vy += (dy / dist) * 2.5
        }
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handlePointerLeave, { passive: true })
    window.addEventListener('touchcancel', handlePointerLeave, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })

    let lastTime = performance.now()

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const theme = SECTION_THEMES[activeSectionRef.current] || SECTION_THEMES.home
      const { primary, secondary } = theme

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const mouseInfluenceRadius = 180

      // Update and draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i]

        // Drift motion
        node.x += node.vx * theme.speed
        node.y += node.vy * theme.speed

        // Boundary bounce
        if (node.x < 10) { node.x = 10; node.vx *= -1 }
        if (node.x > width - 10) { node.x = width - 10; node.vx *= -1 }
        if (node.y < 10) { node.y = 10; node.vy *= -1 }
        if (node.y > height - 10) { node.y = height - 10; node.vy *= -1 }

        // Subtle harmonic floating
        node.phase += node.phaseSpeed
        const floatOffset = Math.sin(node.phase) * 0.4

        // Mouse interaction
        let mouseDist = 9999
        let mouseAlphaBoost = 0
        if (mouse.active) {
          const mdx = node.x - mouse.x
          const mdy = node.y - mouse.y
          mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mouseDist < mouseInfluenceRadius) {
            const force = (1 - mouseDist / mouseInfluenceRadius) * 1.5
            node.x += (mdx / mouseDist) * force
            node.y += (mdy / mouseDist) * force
            mouseAlphaBoost = (1 - mouseDist / mouseInfluenceRadius) * 0.8
            node.pulse = Math.max(node.pulse, force * 0.8)
          }
        }

        // Decay pulse
        if (node.pulse > 0) {
          node.pulse = Math.max(0, node.pulse - dt * 1.8)
        }

        // Check proximity connections
        for (let j = i + 1; j < nodeCount; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const distRatio = 1 - dist / maxDist
            const connAlpha = Math.min(distRatio * 0.45 + mouseAlphaBoost * 0.35, 0.85)

            // Dynamic gradient line between the two nodes
            const grad = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
            grad.addColorStop(0, `rgba(${primary}, ${connAlpha})`)
            grad.addColorStop(1, `rgba(${secondary}, ${connAlpha * 0.7})`)

            ctx.strokeStyle = grad
            ctx.lineWidth = 0.8 + distRatio * 0.8 + (node.pulse + other.pulse) * 0.6
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()

            // Randomly trigger synapse electric signals
            if (distRatio > 0.65 && Math.random() < 0.003) {
              spawnSignal(node, other)
            }
          }
        }

        // Draw node photon
        const currentRadius = node.baseRadius + floatOffset + node.pulse * 2.5
        const nodeAlpha = Math.min(0.55 + Math.sin(node.phase) * 0.25 + mouseAlphaBoost + node.pulse, 1)

        // Outer glow halo
        ctx.fillStyle = `rgba(${primary}, ${nodeAlpha * 0.25})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius * 2.8, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.fillStyle = `rgba(${secondary}, ${nodeAlpha})`
        if (!isMobile) {
          ctx.shadowColor = `rgb(${primary})`
          ctx.shadowBlur = 10 + node.pulse * 15
        }
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()
        if (!isMobile) ctx.shadowBlur = 0
      }

      // Draw and advance electric signals
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s]
        sig.progress += sig.speed

        if (sig.progress >= 1) {
          signals.splice(s, 1)
          continue
        }

        const sx = sig.from.x + (sig.to.x - sig.from.x) * sig.progress
        const sy = sig.from.y + (sig.to.y - sig.from.y) * sig.progress

        ctx.fillStyle = '#ffffff'
        if (!isMobile) {
          ctx.shadowColor = `rgb(${secondary})`
          ctx.shadowBlur = 12
        }
        ctx.beginPath()
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2)
        ctx.fill()
        if (!isMobile) ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handlePointerLeave)
      window.removeEventListener('touchcancel', handlePointerLeave)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="global-scene-container" aria-hidden="true">
      <canvas ref={canvasRef} className="quantum-mesh-canvas" />
    </div>
  )
}

export default SceneContainer
