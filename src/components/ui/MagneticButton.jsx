import { useRef } from 'react'
import gsap from 'gsap'

export function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  onClick,
  href,
  target,
  rel,
  download,
  ...props
}) {
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength

    gsap.to(btn, {
      x,
      y,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const btn = buttonRef.current
    if (!btn) return
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    })
  }

  const Component = href ? 'a' : 'button'

  return (
    <Component
      ref={buttonRef}
      className={`magnetic-interactive-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      download={download}
      data-magnetic="true"
      {...props}
    >
      {children}
    </Component>
  )
}

export default MagneticButton
