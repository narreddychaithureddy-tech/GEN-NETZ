import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createWoodTexture, createMetalTexture } from '../utils/textures'

export default function Deck() {
  const boatRef = useRef()
  const woodTexture = useMemo(() => createWoodTexture('#6b4226', '#3a2010', '#523318'), [])
  const metalTexture = useMemo(() => createMetalTexture(), [])
  const boatWoodTexture = useMemo(() => createWoodTexture('#7a4e2a', '#4a2a12', '#5e3a1e'), [])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    if (boatRef.current) {
      // Bobbing animation for the boat on the waves
      boatRef.current.position.y = -1.88 + Math.sin(elapsedTime * 1.8) * 0.05
      // Gentle rocking animation
      boatRef.current.rotation.z = Math.sin(elapsedTime * 1.2) * 0.04
      boatRef.current.rotation.x = Math.cos(elapsedTime * 1.4) * 0.03
      boatRef.current.rotation.y = elapsedTime * 0.05 // slow drift rotation
    }
  })

  return (
    <group>
      {/* 
        Main Wooden Deck Platform 
        Aligned at Z = 2.0 to -4.0, X = -5.0 to 5.0
      */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]} receiveShadow castShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial 
          map={woodTexture}
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Columns holding up the deck canopy — brushed metal */}
      <group>
        {/* Post back-left */}
        <mesh position={[-5.8, 0.5, -4.8]} castShadow>
          <boxGeometry args={[0.2, 5.0, 0.2]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e56" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Post back-right */}
        <mesh position={[5.8, 0.5, -4.8]} castShadow>
          <boxGeometry args={[0.2, 5.0, 0.2]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e56" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Post front-left */}
        <mesh position={[-5.8, 0.5, 4.8]} castShadow>
          <boxGeometry args={[0.2, 5.0, 0.2]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e56" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Post front-right */}
        <mesh position={[5.8, 0.5, 4.8]} castShadow>
          <boxGeometry args={[0.2, 5.0, 0.2]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e56" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* Safety Railings along the front edge */}
      <group position={[0, -1.3, 4.8]}>
        {/* Rail Bar — glowing green neon */}
        <mesh castShadow>
          <boxGeometry args={[11.8, 0.08, 0.08]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#22c55e"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Vertical Balusters */}
        {[-5.0, -2.5, 0, 2.5, 5.0].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
            <meshStandardMaterial map={metalTexture} color="#5a5e66" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Left safety rail */}
      <group position={[-5.8, -1.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[9.6, 0.08, 0.08]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#22c55e"
            emissiveIntensity={0.4}
          />
        </mesh>
        {[-4.0, -2.0, 0, 2.0, 4.0].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
            <meshStandardMaterial map={metalTexture} color="#5a5e66" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Right safety rail */}
      <group position={[5.8, -1.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[9.6, 0.08, 0.08]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#22c55e"
            emissiveIntensity={0.4}
          />
        </mesh>
        {[-4.0, -2.0, 0, 2.0, 4.0].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
            <meshStandardMaterial map={metalTexture} color="#5a5e66" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Neon glow strip lights along deck edges */}
      {/* Front edge */}
      <mesh position={[0, -1.93, 4.9]}>
        <boxGeometry args={[12, 0.03, 0.03]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Left edge */}
      <mesh position={[-5.9, -1.93, 0]}>
        <boxGeometry args={[0.03, 0.03, 10]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Right edge */}
      <mesh position={[5.9, -1.93, 0]}>
        <boxGeometry args={[0.03, 0.03, 10]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* 
        A small wooden rowboat / dinghy bobbing in the water 
        Placed at X = -7.5, Y = -1.9, Z = 2.0
      */}
      <group ref={boatRef} position={[-8.5, -1.88, 2.0]} rotation={[0, -0.4, 0]}>
        {/* Boat hull bottom */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.1, 0.8]} />
          <meshStandardMaterial map={boatWoodTexture} roughness={0.6} />
        </mesh>
        {/* Boat left wall */}
        <mesh position={[0, 0.2, -0.38]} castShadow>
          <boxGeometry args={[1.6, 0.4, 0.06]} />
          <meshStandardMaterial 
            color="#22c55e" 
            roughness={0.5} 
            metalness={0.3}
            emissive="#22c55e"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Boat right wall */}
        <mesh position={[0, 0.2, 0.38]} castShadow>
          <boxGeometry args={[1.6, 0.4, 0.06]} />
          <meshStandardMaterial 
            color="#22c55e" 
            roughness={0.5} 
            metalness={0.3}
            emissive="#22c55e"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Boat bow (pointed front) */}
        <mesh position={[0.88, 0.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.06]} />
          <meshStandardMaterial 
            color="#22c55e" 
            roughness={0.5}
            emissive="#22c55e"
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh position={[0.88, 0.2, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.06]} />
          <meshStandardMaterial 
            color="#22c55e" 
            roughness={0.5}
            emissive="#22c55e"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Boat transom (flat back) */}
        <mesh position={[-0.78, 0.2, 0]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.74]} />
          <meshStandardMaterial map={boatWoodTexture} roughness={0.6} />
        </mesh>
        {/* Bench seat inside */}
        <mesh position={[-0.1, 0.15, 0]} castShadow>
          <boxGeometry args={[0.2, 0.05, 0.7]} />
          <meshStandardMaterial map={boatWoodTexture} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
