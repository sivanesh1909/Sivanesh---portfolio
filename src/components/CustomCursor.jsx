import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return undefined

    const moveCursor = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        overwrite: 'auto',
      })
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handlePointerOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], [data-magnetic]')
      if (!target) {
        ring.className = 'cursor-ring-elem'
        label.textContent = ''
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
        return
      }

      if (target.matches('[data-cursor="project"]')) {
        ring.className = 'cursor-ring-elem state-project'
        label.textContent = 'EXPLORE'
        gsap.to(ring, { scale: 1.8, duration: 0.35, ease: 'power3.out' })
      } else if (target.matches('a, button, [data-magnetic]')) {
        ring.className = 'cursor-ring-elem state-interactive'
        label.textContent = ''
        gsap.to(ring, { scale: 1.4, duration: 0.3, ease: 'power3.out' })
      }
    }

    window.addEventListener('pointermove', moveCursor, { passive: true })
    document.addEventListener('mouseover', handlePointerOver, { passive: true })
    document.body.classList.add('custom-cursor-enabled')

    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('mouseover', handlePointerOver)
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot-elem" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring-elem" aria-hidden="true">
        <span ref={labelRef} className="cursor-label-elem" />
      </div>
    </>
  )
}

export default CustomCursor
