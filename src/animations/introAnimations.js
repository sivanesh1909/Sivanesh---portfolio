import gsap from 'gsap'

export function playIntroAnimation(root, onComplete) {
  const timeline = gsap.timeline({ onComplete })
  const particles = root.querySelectorAll('.intro-particle')
  timeline
    .set(root, { autoAlpha: 1 })
    .fromTo('.intro-aura', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' })
    .fromTo('.intro-grid', { opacity: 0, scale: 1.25, rotateX: 22 }, { opacity: 0.65, scale: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35')
    .fromTo(particles, { opacity: 0, scale: 0, y: 18 }, { opacity: 0.75, scale: 1, y: 0, duration: 0.55, stagger: { each: 0.015, from: 'center' }, ease: 'back.out(1.8)' }, '-=0.35')
    .fromTo('.intro-sweep', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'power4.inOut' }, '-=0.2')
    .fromTo('.intro-name', { clipPath: 'inset(100% 0 0 0)', y: 44, rotateX: -24, filter: 'blur(14px)', opacity: 0 }, { clipPath: 'inset(0% 0 0 0)', y: 0, rotateX: 0, filter: 'blur(0px)', opacity: 1, duration: 0.85, ease: 'power4.out' }, '-=0.15')
    .fromTo('.intro-role', { y: 24, letterSpacing: '0.55em', opacity: 0 }, { y: 0, letterSpacing: '0.2em', opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.22')
    .fromTo('.intro-labels span', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.15')
    .to('.intro-aura', { scale: 2.8, opacity: 0.7, duration: 0.7, ease: 'power2.in' }, '+=0.35')
    .to(particles, { x: (index) => (index % 2 ? 80 : -80), y: (index) => (index % 3 - 1) * 80, scale: 1.8, opacity: 0, duration: 0.7, stagger: 0.01, ease: 'power3.in' }, '<')
    .to(root, { scale: 1.08, filter: 'blur(3px)', autoAlpha: 0, duration: 0.75, ease: 'power3.inOut' }, '-=0.1')
  timeline.timeScale(2.4)
  return () => timeline.kill()
}
