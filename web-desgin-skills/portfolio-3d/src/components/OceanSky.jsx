import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Sky } from '@react-three/drei'
import * as THREE from 'three'

export default function OceanSky() {
  const starsRef = useRef()

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    if (starsRef.current) {
      starsRef.current.rotation.y = elapsedTime * 0.015
      starsRef.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.02
    }
  })

  return (
    <>
      {/* Sky environment */}
      <Sky 
        distance={450000} 
        sunPosition={[10, 2.0, -20]} // Raised sun position so it lights up the sky
        inclination={0.6} 
        azimuth={0.25} 
      />

      {/* Atmospheric Fog — pushed back so interior is visible */}
      <fog attach="fog" args={['#090d16', 35, 100]} />

      {/* Ambient light — boosted for overall scene visibility */}
      <ambientLight intensity={1.8} color="#cbd5e1" />

      {/* Primary directional light — strong sun-like fill from above/front */}
      <directionalLight
        position={[10, 15, 15]}
        intensity={4.0}
        color="#a7f3d0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />

      {/* Secondary directional light — illuminates deep corridor (Z = -25 to -40) */}
      <directionalLight
        position={[-5, 10, -30]}
        intensity={2.5}
        color="#e2e8f0"
      />

      {/* Third fill light — from behind to add rim lighting */}
      <directionalLight
        position={[0, 8, -45]}
        intensity={1.5}
        color="#a7f3d0"
      />

      {/* Hemisphere light — boosted sky/ground fill */}
      <hemisphereLight args={['#ffffff', '#1e293b', 1.5]} />

      {/* Corridor fill point lights — evenly spaced along the Z axis */}
      <pointLight position={[0, 3, -5]} intensity={3.0} color="#e2e8f0" distance={20} decay={2} />
      <pointLight position={[0, 3, -15]} intensity={3.0} color="#e2e8f0" distance={20} decay={2} />
      <pointLight position={[0, 3, -25]} intensity={3.0} color="#e2e8f0" distance={20} decay={2} />
      <pointLight position={[0, 3, -35]} intensity={3.0} color="#e2e8f0" distance={20} decay={2} />

      {/* Stars and Floating Dust Particles */}
      <group ref={starsRef}>
        <Sparkles 
          count={window.innerWidth < 768 ? 35 : 120} 
          scale={[40, 20, 40]} 
          size={1.5} 
          speed={0.3} 
          noise={1} 
          color="#22c55e" // green glowing sparkles
        />
        <Sparkles 
          count={window.innerWidth < 768 ? 20 : 80} 
          scale={[50, 25, 50]} 
          size={2.5} 
          speed={0.5} 
          noise={2} 
          color="#67e8f9" // cyan sparkles
        />
      </group>

      {/* Horizon glow helper */}
      <mesh position={[0, -2, -35]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 20]} />
        <meshBasicMaterial 
          color="#0d382e" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}
