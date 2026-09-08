import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const ctx = gsap.context(() => {
      // 1. Universal Section Header Reveals (Titles, Badges, Subheadings)
      gsap.utils.toArray('.portfolio-section').forEach((section) => {
        const preHeader = section.querySelector('.section-pre-header')
        const heading = section.querySelector('.section-main-heading')
        const subHeading = section.querySelector('.section-sub-heading')

        const headerEls = [preHeader, heading, subHeading].filter(Boolean)
        if (headerEls.length > 0) {
          gsap.fromTo(
            headerEls,
            { opacity: 0, y: 32, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }
      })

      // 2. Hero Section Entrance Elements
      gsap.fromTo(
        '.hero-eyebrow-badge, .hero-main-title, .hero-supporting-lead, .hero-actions-container',
        { opacity: 0, y: 28, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.1,
        }
      )

      gsap.fromTo(
        '.hero-console-widget',
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.4)',
          delay: 0.25,
        }
      )

      // 3. About Section: Story, Stats & Pillars
      gsap.utils.toArray('.about-story-p, .about-stats-grid .stat-box, .about-pillar-card').forEach((el, idx) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: (idx % 3) * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      // 4. Experience Timeline Rail & Cards
      gsap.fromTo(
        '.experience-rail-fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience-timeline-container',
            start: 'top 75%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      )

      gsap.utils.toArray('.experience-entry-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -35 : 35, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })

      // 5. Projects Gallery Cards
      gsap.utils.toArray('.cinematic-project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true,
            },
          }
        )
      })

      // 6. Skills Matrix Category Blocks
      gsap.utils.toArray('.skill-category-block').forEach((block, index) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: (index % 2) * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 87%',
              once: true,
            },
          }
        )
      })

      // 7. Education & Certification Cards
      gsap.utils.toArray('.education-item-card, .certification-card').forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (index % 2) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              once: true,
            },
          }
        )
      })

      // 8. Proof & Achievements: Winner Spotlight Burst
      gsap.fromTo(
        '.winner-spotlight-card',
        { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.winner-spotlight-card',
            start: 'top 80%',
            once: true,
          },
        }
      )

      // 9. Research Section Paper Card
      gsap.fromTo(
        '.research-paper-card',
        { opacity: 0, y: 38, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.research-paper-card',
            start: 'top 82%',
            once: true,
          },
        }
      )

      // 10. Contact Section Cards & Form
      gsap.utils.toArray('.contact-method-card, .contact-direct-form, .contact-social-pills-row').forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [enabled])
}

export default useGsapScroll
