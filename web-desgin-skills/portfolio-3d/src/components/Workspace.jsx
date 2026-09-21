import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { createWoodTexture, createMetalTexture } from '../utils/textures'

export default function Workspace({ onSelectDesk, isZoomed }) {
  const [hoveredDesk, setHoveredDesk] = useState(false)
  const laptopScreenRef = useRef()
  const woodTexture = useMemo(() => createWoodTexture('#7a5030', '#3a2010', '#5a3820'), [])
  const metalTexture = useMemo(() => createMetalTexture(), [])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    // Soft screen brightness pulse
    if (laptopScreenRef.current) {
      laptopScreenRef.current.material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 4) * 0.1
    }
  })

  // Position workspace inside the corridor or as a separate alcove
  // Let's place it at Z = -31, right side of the corridor (X = 3.5, Z = -31)
  const x = 3.2
  const y = -1.95 // aligned on floor
  const z = -31

  return (
    <group position={[x, y, z]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Ambient fill light for workspace alcove */}
      <pointLight position={[0, 2.5, 0]} intensity={4.0} color="#e2e8f0" distance={12} decay={2} />

      {/* 
        Desk base + legs 
      */}
      <group 
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredDesk(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHoveredDesk(false)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelectDesk()
        }}
      >
        {/* Table top */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.08, 1.4]} />
          <meshStandardMaterial 
            map={woodTexture}
            color={hoveredDesk && !isZoomed ? '#ffffff' : '#d5d5d5'} 
            roughness={0.25} 
          />
        </mesh>
        
        {/* Table leg Front-Left */}
        <mesh position={[-1.5, 0.5, -0.6]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e58" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Table leg Front-Right */}
        <mesh position={[1.5, 0.5, -0.6]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e58" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Table leg Back-Left */}
        <mesh position={[-1.5, 0.5, 0.6]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e58" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Table leg Back-Right */}
        <mesh position={[1.5, 0.5, 0.6]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial map={metalTexture} color="#4a4e58" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 
        Laptop Model 
      */}
      <group position={[0, 1.04, 0]} rotation={[0, 0.05, 0]}>
        {/* Laptop base */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.015, 0.35]} />
          <meshStandardMaterial color="#8899aa" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Keyboard trackpad area */}
        <mesh position={[0, 0.008, 0.08]}>
          <planeGeometry args={[0.45, 0.16]} />
          <meshStandardMaterial color="#556677" roughness={0.6} />
        </mesh>
        {/* Laptop Screen (opened) */}
        <group position={[0, 0.008, -0.17]} rotation={[1.9, 0, 0]}>
          {/* Laptop lid */}
          <mesh position={[0, 0.16, 0.005]} castShadow>
            <boxGeometry args={[0.5, 0.32, 0.01]} />
            <meshStandardMaterial color="#8899aa" metalness={0.85} roughness={0.15} />
          </mesh>
          {/* Glowing screen display */}
          <mesh ref={laptopScreenRef} position={[0, 0.16, -0.002]}>
            <planeGeometry args={[0.47, 0.29]} />
            <meshStandardMaterial 
              color="#0d9488" // teal glow screen
              emissive="#22c55e"
              emissiveIntensity={0.6}
              roughness={0.1}
            />
          </mesh>
          
          {/* Green screen light source casting glow onto desk */}
          <spotLight
            position={[0, 0.16, -0.1]}
            target-position={[0, -0.5, 0.2]}
            intensity={4.0}
            angle={Math.PI / 3}
            penumbra={0.7}
            color="#22c55e"
          />
        </group>
      </group>

      {/* 
        Floor Lamp 
      */}
      <group position={[-1.7, 0, -0.6]}>
        {/* Lamp Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#22c55e"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Lamp Pole */}
        <mesh position={[0, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2.5, 16]} />
          <meshStandardMaterial map={metalTexture} color="#5a5e66" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Lamp Shade */}
        <mesh position={[0.4, 2.5, 0.4]} rotation={[0.4, 0, 0.8]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 0.3, 32]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#22c55e"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Warm spot light casting down on table — boosted */}
        <spotLight
          position={[0.4, 2.4, 0.4]}
          target-position={[1.5, 1.0, 0.8]}
          intensity={8.0}
          angle={Math.PI / 4}
          penumbra={0.6}
          color="#ffedd5" // warm light color
          castShadow
        />
        {/* Light cone helper */}
        <mesh position={[0.8, 1.7, 0.6]} rotation={[0, 0, -Math.PI / 5]} transparent>
          <coneGeometry args={[0.5, 1.6, 32, 1, true]} />
          <meshBasicMaterial 
            color="#ffedd5" 
            transparent 
            opacity={0.08} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 
        Workspace Potted Plant 
      */}
      <group position={[1.2, 1.04, -0.4]}>
        {/* Plant Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.07, 0.16, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.01, 16]} />
          <meshStandardMaterial color="#6b4a20" roughness={0.9} />
        </mesh>
        {/* Procedural foliage (spheres stacked) */}
        <mesh position={[0, 0.15, 0.02]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#22a04a" roughness={0.7} />
        </mesh>
        <mesh position={[-0.07, 0.2, -0.05]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#1a8a3a" roughness={0.6} />
        </mesh>
        <mesh position={[0.06, 0.24, 0.03]} castShadow>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#22a04a" roughness={0.8} />
        </mesh>
      </group>

      {/* 
        Sleek Office Chair 
      */}
      <group position={[0, 0.1, 0.9]} rotation={[0, -0.1, 0]}>
        {/* Seat cushion */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#2e3a4e" roughness={0.5} />
        </mesh>
        {/* Back rest */}
        <mesh position={[0, 0.85, 0.26]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.54, 0.7, 0.08]} />
          <meshStandardMaterial color="#2e3a4e" roughness={0.5} />
        </mesh>
        {/* Seat support / cylinder base */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial map={metalTexture} color="#5a5e66" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Star base legs */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.06]} />
          <meshStandardMaterial map={metalTexture} color="#5a5e66" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.06]} />
          <meshStandardMaterial map={metalTexture} color="#5a5e66" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 
        Designer Poster Frame on the Concrete Wall (behind the table)
        Note: The wall relative to desk position is at Back side (relative position Z = -0.7) 
      */}
      <group position={[0, 2.1, -0.69]}>
        {/* Frame Border */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.6, 0.03]} />
          <meshStandardMaterial color="#333" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Poster Paper */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.1, 1.5]} />
          <meshStandardMaterial color="#151518" roughness={0.9} />
        </mesh>
        {/* Poster Graphics */}
        <Text
          position={[0, 0.4, 0.03]}
          fontSize={0.10}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          DESIGN SYSTEM
        </Text>
        <Text
          position={[0, 0.2, 0.03]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          [ANTIGRAVITY KIT]
        </Text>
        {/* Graphical lines on poster */}
        <mesh position={[0, -0.2, 0.03]}>
          <planeGeometry args={[0.8, 0.02]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0, -0.3, 0.03]}>
          <planeGeometry args={[0.8, 0.01]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        <Text
          position={[0, -0.5, 0.03]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          KELLY CLOVIS
        </Text>

        {/* Poster spot light */}
        <spotLight 
          position={[0, 1.5, 0.8]}
          target-position={[0, 0, 0]}
          intensity={3.0}
          angle={Math.PI / 5}
          penumbra={0.6}
          color="#ffffff"
        />
      </group>
    </group>
  )
}
