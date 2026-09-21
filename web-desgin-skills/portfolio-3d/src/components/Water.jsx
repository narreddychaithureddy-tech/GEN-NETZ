import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createWaterTexture } from '../utils/textures'

export default function Water() {
  const meshRef = useRef()
  const waterTexture = useMemo(() => createWaterTexture(), [])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Bob water gently and rotate slowly to catch reflections
      meshRef.current.position.y = -2.15 + Math.sin(elapsedTime * 0.6) * 0.02
      meshRef.current.rotation.z = elapsedTime * 0.004

      // Slowly scroll the water texture for a flowing effect
      if (meshRef.current.material.map) {
        meshRef.current.material.map.offset.x = elapsedTime * 0.01
        meshRef.current.material.map.offset.y = elapsedTime * 0.008
      }
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2.15, 0]} 
      receiveShadow
    >
      <planeGeometry args={[120, 120, 64, 64]} />
      <meshStandardMaterial
        map={waterTexture}
        color="#0a3050" // Visible deep ocean blue
        roughness={0.15} // Very reflective
        metalness={0.85} // Highly metallic mirror finish
        flatShading={true} // Polygonal wave look
      />
    </mesh>
  )
}
