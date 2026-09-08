import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SECTION_CAMERAS = {
  home: { pos: [0, 0, 4.8], target: [0, 0, 0] },
  about: { pos: [1.1, -0.2, 3.9], target: [0.3, 0, 0] },
  experience: { pos: [-0.9, 0.3, 4.2], target: [-0.2, 0, 0] },
  projects: { pos: [0.7, -0.4, 3.6], target: [0, 0, 0] },
  skills: { pos: [0, 0, 4.3], target: [0, 0, 0] },
  proof: { pos: [-0.6, 0.2, 4.0], target: [0, 0, 0] },
  research: { pos: [0.5, -0.1, 4.2], target: [0, 0, 0] },
  education: { pos: [-0.5, 0.1, 4.4], target: [0, 0, 0] },
  contact: { pos: [0, 0.2, 5.6], target: [0, 0, 0] },
}

export function CameraRig({ activeSection = 'home', isMobile = false }) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 4.8))
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    const { pointer, camera } = state
    const config = SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.home

    // Parallax displacement
    const parallaxX = isMobile ? 0 : pointer.x * 0.35
    const parallaxY = isMobile ? 0 : pointer.y * 0.25

    const targetX = config.pos[0] + parallaxX
    const targetY = config.pos[1] + parallaxY
    const targetZ = isMobile ? config.pos[2] + 0.8 : config.pos[2]

    // Smooth lerp
    const lerpSpeed = Math.min(delta * 2.2, 0.1)
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpSpeed)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpSpeed)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, lerpSpeed)

    camera.position.copy(currentPos.current)

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, config.target[0], lerpSpeed)
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, config.target[1], lerpSpeed)
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, config.target[2], lerpSpeed)

    camera.lookAt(currentTarget.current)
  })

  return null
}
