import { useState, useEffect } from 'react'

function checkWebGLSupport() {
  if (typeof window === 'undefined') {
    return { hasWebGL: true, isMobile: false, prefersReducedMotion: false }
  }

  const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let hasWebGL = false
  try {
    const canvas = document.createElement('canvas')
    hasWebGL = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    hasWebGL = false
  }

  return { hasWebGL, isMobile, prefersReducedMotion }
}

export function useWebGLSupport() {
  const [support, setSupport] = useState(checkWebGLSupport)

  useEffect(() => {
    const mqlMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMediaChange = () => {
      setSupport(checkWebGLSupport())
    }

    mqlMobile.addEventListener('change', handleMediaChange)
    mqlMotion.addEventListener('change', handleMediaChange)

    return () => {
      mqlMobile.removeEventListener('change', handleMediaChange)
      mqlMotion.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return support
}
