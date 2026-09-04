import { useEffect } from 'react'
import gsap from 'gsap'

function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    const label = document.querySelector('.cursor-label')
    const move = (event) => {
      gsap.to(dot, { x: event.clientX, y: event.clientY, duration: 0.08, overwrite: true })
      gsap.to(ring, { x: event.clientX, y: event.clientY, duration: 0.55, ease: 'expo.out', overwrite: true })
      const magnetic = event.target.closest('[data-magnetic]')
      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect()
        gsap.to(magnetic, { x: (event.clientX - (bounds.left + bounds.width / 2)) * 0.16, y: (event.clientY - (bounds.top + bounds.height / 2)) * 0.16, duration: 0.35, ease: 'power3.out', overwrite: true })
      }
    }
    const enter = (event) => {
      const target = event.currentTarget
      ring.classList.remove('cursor-link', 'cursor-button', 'cursor-project')
      if (target.matches('[data-cursor="project"]')) ring.classList.add('cursor-project')
      else if (target.matches('[data-magnetic]')) ring.classList.add('cursor-button')
      else if (target.matches('a')) ring.classList.add('cursor-link')
      label.textContent = target.matches('[data-cursor="project"]') ? 'VIEW' : ''
      gsap.to(ring, { scale: target.matches('[data-cursor="project"]') ? 1.7 : 1.35, duration: 0.45, ease: 'power3.out' })
    }
    const leave = (event) => { ring.classList.remove('cursor-link', 'cursor-button', 'cursor-project'); label.textContent = ''; gsap.to(ring, { scale: 1, duration: 0.45, ease: 'power3.out' }); const magnetic = event.currentTarget.matches('[data-magnetic]') ? event.currentTarget : null; if (magnetic) gsap.to(magnetic, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' }) }
    window.addEventListener('pointermove', move, { passive: true })
    const targets = document.querySelectorAll('a, button, [data-cursor="project"]')
    targets.forEach((target) => { target.addEventListener('pointerenter', enter); target.addEventListener('pointerleave', leave) })
    document.body.classList.add('custom-cursor')
    return () => { window.removeEventListener('pointermove', move); targets.forEach((target) => { target.removeEventListener('pointerenter', enter); target.removeEventListener('pointerleave', leave) }); document.body.classList.remove('custom-cursor') }
  }, [])
  return <><div className="cursor-dot" /><div className="cursor-ring"><span className="cursor-label" /></div></>
}

export default CustomCursor
