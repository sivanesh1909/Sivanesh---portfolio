import { useEffect, useState, useCallback } from 'react'

export function ClickEffects() {
  const [ripples, setRipples] = useState([])

  const createRipple = useCallback((e) => {
    // Ignore clicks on inputs or text selection if desired, or allow everywhere for maximum responsiveness
    const x = e.clientX
    const y = e.clientY
    const id = `${Date.now()}-${Math.random()}`

    // 6 particle sparks shooting at random angles
    const sparks = Array.from({ length: 7 }).map((_, i) => {
      const angle = (i / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const distance = 28 + Math.random() * 26
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 2.5 + Math.random() * 2.5,
      }
    })

    const newRipple = { id, x, y, sparks }

    setRipples((prev) => [...prev.slice(-12), newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }, [])

  useEffect(() => {
    window.addEventListener('pointerdown', createRipple, { passive: true })
    return () => window.removeEventListener('pointerdown', createRipple)
  }, [createRipple])

  return (
    <div className="click-effects-container" aria-hidden="true">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="click-shockwave-origin"
          style={{ left: ripple.x, top: ripple.y }}
        >
          {/* Expanding primary neon ring */}
          <span className="click-ring ring-primary" />
          {/* Secondary faint outer wave */}
          <span className="click-ring ring-secondary" />

          {/* Shooting spark photons */}
          {ripple.sparks.map((spark, idx) => (
            <span
              key={idx}
              className="click-spark-particle"
              style={{
                '--dx': `${spark.dx}px`,
                '--dy': `${spark.dy}px`,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ClickEffects
