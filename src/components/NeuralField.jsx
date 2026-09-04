import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FieldPoints() {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const particleCount = window.matchMedia('(pointer: coarse)').matches ? 90 : 240
    const values = new Float32Array(particleCount * 3)
    for (let index = 0; index < values.length; index += 3) {
      const seed = index / 3
      const radius = 2.3 + ((Math.sin(seed * 12.9898) + 1) * 0.5) * 2.5
      const angle = ((Math.sin(seed * 78.233) + 1) * 0.5) * Math.PI * 2
      values[index] = Math.cos(angle) * radius
      values[index + 1] = ((Math.sin(seed * 39.17) + 1) * 0.5 - 0.5) * 3.2
      values[index + 2] = Math.sin(angle) * radius
    }
    return values
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035 + state.pointer.x * 0.08
    pointsRef.current.rotation.x = state.pointer.y * 0.04
  })

  return <points ref={pointsRef} position={[0, 0, -1]}>
    <bufferGeometry><bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} /></bufferGeometry>
    <pointsMaterial color="#c4b5fd" size={0.025} transparent opacity={0.7} sizeAttenuation />
  </points>
}

function NeuralField() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  return <div className="neural-field" aria-hidden="true"><Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={isTouch ? 1 : [1, 1.5]} gl={{ antialias: !isTouch, alpha: true, powerPreference: 'high-performance' }}>
    <fog attach="fog" args={[new THREE.Color('#05030a'), 4, 10]} />
    <FieldPoints />
  </Canvas></div>
}

export default NeuralField
