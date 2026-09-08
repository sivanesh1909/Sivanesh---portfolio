import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Deterministic pseudo-random helper for pure render memoization
function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function buildInitialBuffers(pCount) {
  const positions = new Float32Array(pCount * 3)
  for (let i = 0; i < pCount; i++) {
    const i3 = i * 3
    const radius = 2.4 + pseudoRandom(i + 1) * 4.2
    const theta = pseudoRandom(i + 101) * Math.PI * 2
    const phi = Math.acos(pseudoRandom(i + 202) * 2 - 1)
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
  }
  const maxLines = pCount * 8
  const linePositions = new Float32Array(maxLines * 6)
  const lineColors = new Float32Array(maxLines * 6)
  return { positions, linePositions, lineColors }
}

// Interactive Constellation with dynamic connection lines between nearby particles
function NeuralConstellation({ count = 110, isMobile = false }) {
  const pointsRef = useRef()
  const linesRef = useRef()
  const frameCountRef = useRef(0)

  const pCount = isMobile ? 36 : count
  const initialBuffers = useMemo(() => buildInitialBuffers(pCount), [pCount])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return

    frameCountRef.current += 1

    const posAttr = pointsRef.current.geometry.attributes.position
    const linePosAttr = linesRef.current.geometry.attributes.position
    const lineColAttr = linesRef.current.geometry.attributes.color

    const posArray = posAttr.array
    const linePosArray = linePosAttr.array
    const lineColArray = lineColAttr.array

    // Move positions every frame
    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3
      const vx = (pseudoRandom(i + 301) - 0.5) * 0.008
      const vy = (pseudoRandom(i + 401) - 0.5) * 0.008
      const vz = (pseudoRandom(i + 501) - 0.5) * 0.008

      posArray[i3] += vx
      posArray[i3 + 1] += vy
      posArray[i3 + 2] += vz

      // Boundary loop
      const distSq = posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2
      if (distSq > 45 || distSq < 3) {
        posArray[i3] = (posArray[i3] * 0.95)
        posArray[i3 + 1] = (posArray[i3 + 1] * 0.95)
        posArray[i3 + 2] = (posArray[i3 + 2] * 0.95)
      }
    }
    posAttr.needsUpdate = true

    // On mobile devices, update line connections every 2nd frame for 60fps power-efficiency
    if (isMobile && frameCountRef.current % 2 !== 0) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
      return
    }

    let lineIndex = 0
    const connectionDist = isMobile ? 1.3 : 1.9
    const maxDistSq = connectionDist * connectionDist

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3
      const px = posArray[i3]
      const py = posArray[i3 + 1]
      const pz = posArray[i3 + 2]

      for (let j = i + 1; j < pCount; j++) {
        const j3 = j * 3
        const dx = px - posArray[j3]
        const dy = py - posArray[j3 + 1]
        const dz = pz - posArray[j3 + 2]
        const dSq = dx * dx + dy * dy + dz * dz

        if (dSq < maxDistSq && lineIndex < linePosArray.length - 6) {
          const d = Math.sqrt(dSq)
          const alpha = 1.0 - d / connectionDist

          linePosArray[lineIndex] = px
          linePosArray[lineIndex + 1] = py
          linePosArray[lineIndex + 2] = pz

          linePosArray[lineIndex + 3] = posArray[j3]
          linePosArray[lineIndex + 4] = posArray[j3 + 1]
          linePosArray[lineIndex + 5] = posArray[j3 + 2]

          // Amethyst to Violet gradient
          const r = 0.65 * alpha
          const g = 0.35 * alpha
          const b = 0.98 * alpha

          lineColArray[lineIndex] = r
          lineColArray[lineIndex + 1] = g
          lineColArray[lineIndex + 2] = b
          lineColArray[lineIndex + 3] = r
          lineColArray[lineIndex + 4] = g
          lineColArray[lineIndex + 5] = b

          lineIndex += 6
        }
      }
    }

    linePosAttr.needsUpdate = true
    lineColAttr.needsUpdate = true
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3)

    // Gentle global orbit rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <group>
      {/* Node Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pCount}
            array={initialBuffers.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#c4b5fd"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dynamic Synaptic Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={initialBuffers.linePositions.length / 3}
            array={initialBuffers.linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={initialBuffers.lineColors.length / 3}
            array={initialBuffers.lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

// Holographic Gyroscopic Ring with moving photon nodes
function GyroRing({ radius, tiltX, tiltZ, speed, photonColor = '#a855f7', isMobile = false }) {
  const ringRef = useRef()
  const photonRef = useRef()

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed
    }
    if (photonRef.current) {
      const angle = state.clock.elapsedTime * speed * 2.2
      photonRef.current.position.x = Math.cos(angle) * radius
      photonRef.current.position.y = Math.sin(angle) * radius
    }
  })

  const radialSegments = isMobile ? 8 : 16
  const tubularSegments = isMobile ? 40 : 80

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* Outer Torus Path */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.015, radialSegments, tubularSegments]} />
        <meshStandardMaterial
          color={photonColor}
          emissive={photonColor}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Travelling Photon Pulse */}
      <mesh ref={photonRef}>
        <sphereGeometry args={[0.045, isMobile ? 8 : 12, isMobile ? 8 : 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

export function AICore3D({ isMobile = false }) {
  const groupRef = useRef()
  const innerNucleusRef = useRef()
  const outerGeodesicRef = useRef()
  const hyperCubeRef = useRef()

  useFrame((state, delta) => {
    const { pointer, clock } = state
    const time = clock.getElapsedTime()

    if (groupRef.current) {
      // Smooth responsive mouse parallax
      const targetRotY = pointer.x * 0.42
      const targetRotX = -pointer.y * 0.32
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3.5)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3.5)

      // Levitation floating oscillation
      groupRef.current.position.y = Math.sin(time * 0.9) * 0.1
    }

    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y += delta * 0.45
      innerNucleusRef.current.rotation.z += delta * 0.25
      const pulse = 1 + Math.sin(time * 2.8) * 0.08
      innerNucleusRef.current.scale.set(pulse, pulse, pulse)
    }

    if (outerGeodesicRef.current) {
      outerGeodesicRef.current.rotation.y -= delta * 0.2
      outerGeodesicRef.current.rotation.x += delta * 0.12
    }

    if (hyperCubeRef.current) {
      hyperCubeRef.current.rotation.x += delta * 0.15
      hyperCubeRef.current.rotation.y -= delta * 0.18
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Central Pulsating Quantum Nucleus */}
      <mesh ref={innerNucleusRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#080315"
          emissive="#a855f7"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* 2. Middle Crystalline Wireframe Structure */}
      <mesh ref={outerGeodesicRef}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 3. Outer Nested Dodecahedron Cage */}
      <mesh ref={hyperCubeRef}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 4. Tri-Axial Gyroscopic Orbital Rings */}
      <GyroRing radius={1.9} tiltX={Math.PI / 4} tiltZ={Math.PI / 5} speed={0.45} photonColor="#c4b5fd" isMobile={isMobile} />
      <GyroRing radius={2.25} tiltX={-Math.PI / 3} tiltZ={Math.PI / 4} speed={-0.35} photonColor="#a855f7" isMobile={isMobile} />
      <GyroRing radius={2.6} tiltX={Math.PI / 2.5} tiltZ={-Math.PI / 6} speed={0.25} photonColor="#8b5cf6" isMobile={isMobile} />

      {/* 5. Dynamic Synaptic Neural Constellation */}
      <NeuralConstellation count={110} isMobile={isMobile} />

      {/* 6. Volumetric Point Lights */}
      <pointLight color="#c4b5fd" intensity={3.5} distance={8} />
      <pointLight color="#9333ea" intensity={5} distance={4} />
      <pointLight color="#38bdf8" intensity={2} distance={6} position={[0, -1, 2]} />
    </group>
  )
}

export default AICore3D
