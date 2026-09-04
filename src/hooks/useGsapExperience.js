import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapExperience(enabled = true) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const pointerCleanups = []
    const context = gsap.context(() => {
      gsap.utils.toArray('.section-index, .experience-head h2, .projects-head h2, .skills-layout > h2, .proof h2, .research h2, .education h2, .contact h2').forEach((element) => {
        gsap.fromTo(element, { y: 55, rotateX: -14, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: 0, rotateX: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
      })
      gsap.utils.toArray('.portrait-placeholder, .project-art').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(16% 10% 16% 10%)', scale: 0.94 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 88%', end: 'top 45%', scrub: 1 } })
      })
      gsap.to('.hero-content', { yPercent: -18, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-signal', { yPercent: 35, rotate: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.fromTo('.timeline-progress', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 72%', end: 'bottom 72%', scrub: true } })
      gsap.to('.about-layout', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.to('.projects-head', { xPercent: 5, ease: 'none', scrollTrigger: { trigger: '.projects', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.utils.toArray('.project-row').forEach((row, index) => {
        gsap.fromTo(row, { x: index % 2 ? 55 : -55, opacity: 0 }, { x: 0, opacity: 1, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%', once: true } })
        const art = row.querySelector('.project-art')
        const number = row.querySelector('.project-number')
        const title = row.querySelector('.project-info h3')
        const tags = row.querySelectorAll('.project-tags span')
        gsap.to(art, { yPercent: index % 2 ? -10 : 10, rotate: index % 2 ? -1.5 : 1.5, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.to(number, { y: index % 2 ? 28 : -28, color: '#c4b5fd', ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo(title, { y: 35, rotateX: -12, opacity: .2 }, { y: 0, rotateX: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 78%', end: 'top 42%', scrub: true } })
        gsap.fromTo(tags, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .5, scrollTrigger: { trigger: row, start: 'top 65%', once: true } })
        const moveArt = (event) => { const bounds = art.getBoundingClientRect(); gsap.to(art, { x: (event.clientX - bounds.left - bounds.width / 2) * .025, y: (event.clientY - bounds.top - bounds.height / 2) * .025, duration: .45, overwrite: true }) }
        const resetArt = () => gsap.to(art, { x: 0, y: 0, duration: .7, ease: 'power3.out' })
        row.addEventListener('pointermove', moveArt); row.addEventListener('pointerleave', resetArt)
        pointerCleanups.push(() => { row.removeEventListener('pointermove', moveArt); row.removeEventListener('pointerleave', resetArt) })
      })
      gsap.to('.research-diagram', { rotation: 8, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.research', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.to('.contact h2', { scale: 1.06, transformOrigin: 'center center', ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.skills-layout > h2', { x: -70, rotateY: -16, filter: 'blur(8px)' }, { x: 0, rotateY: 0, filter: 'blur(0px)', ease: 'power3.out', scrollTrigger: { trigger: '.skills', start: 'top 82%', end: 'top 42%', scrub: true } })
      gsap.fromTo('.proof h2', { y: 70, rotateX: 18, filter: 'blur(10px)' }, { y: 0, rotateX: 0, filter: 'blur(0px)', ease: 'power3.out', scrollTrigger: { trigger: '.proof', start: 'top 82%', end: 'top 44%', scrub: true } })
      gsap.fromTo('.research h2', { x: 90, letterSpacing: '0.02em', filter: 'blur(9px)' }, { x: 0, letterSpacing: '-.07em', filter: 'blur(0px)', ease: 'power3.out', scrollTrigger: { trigger: '.research', start: 'top 86%', end: 'top 38%', scrub: true } })
      gsap.fromTo('.contact h2', { scale: .82, y: 85, filter: 'blur(12px)' }, { scale: 1, y: 0, filter: 'blur(0px)', ease: 'power3.out', scrollTrigger: { trigger: '.contact', start: 'top 92%', end: 'top 30%', scrub: true } })
      gsap.utils.toArray('.skill-group, .proof-list p, .timeline article').forEach((element) => {
        gsap.fromTo(element, { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })
    })
    return () => { pointerCleanups.forEach((cleanup) => cleanup()); context.revert() }
  }, [enabled])
}
