import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { projects } from '../content/projects'
import { createWoodTexture, createConcreteTexture, createMetalTexture, createCeilingTexture } from '../utils/textures'

export default function GalleryRoom({ onSelectProject, activeProject }) {
  const [hoveredFrame, setHoveredFrame] = useState(null)
  
  const floorTexture = useMemo(() => createWoodTexture('#5e3318', '#2a1508', '#442818'), [])
  const wallTexture = useMemo(() => createConcreteTexture(), [])
  const metalTexture = useMemo(() => createMetalTexture(), [])
  const ceilingTexture = useMemo(() => createCeilingTexture(), [])

  // Corridor walls, ceiling, floor meshes
  return (
    <group>
      {/* Wooden floor for the gallery corridor — starts at Z=-5 where deck ends */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, -20]} receiveShadow>
        <planeGeometry args={[12, 30]} />
        <meshStandardMaterial 
          map={floorTexture}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Gallery Walls (Left and Right) */}
      {/* Left Wall - concrete panel style */}
      <mesh position={[-6, 1, -15]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[40, 6]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Right Wall - concrete panel style */}
      <mesh position={[6, 1, -15]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[40, 6]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Ceiling — with panel grid texture */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, -15]} receiveShadow>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial 
          map={ceilingTexture} 
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* === Neon Strip Lights Along Corridor === */}
      {/* Floor-level green neon strips — left wall */}
      <mesh position={[-5.85, -1.9, -15]}>
        <boxGeometry args={[0.04, 0.04, 40]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Floor-level green neon strips — right wall */}
      <mesh position={[5.85, -1.9, -15]}>
        <boxGeometry args={[0.04, 0.04, 40]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Ceiling-level accent strips — left */}
      <mesh position={[-5.85, 3.95, -15]}>
        <boxGeometry args={[0.04, 0.04, 40]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Ceiling-level accent strips — right */}
      <mesh position={[5.85, 3.95, -15]}>
        <boxGeometry args={[0.04, 0.04, 40]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Green neon point lights along the floor strips for actual illumination */}
      {[-5, -10, -15, -20, -25, -30].map((z, idx) => (
        <pointLight 
          key={`neon-${idx}`}
          position={[0, -1.8, z]} 
          color="#22c55e" 
          intensity={0.8} 
          distance={8} 
          decay={2} 
        />
      ))}

      {/* Structural Pillars along the corridor — with metal texture */}
      {[-30, -20, -10, 0].map((z, idx) => (
        <group key={idx}>
          {/* Left Pillar */}
          <mesh position={[-5.8, 1, z]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 6, 0.4]} />
            <meshStandardMaterial 
              map={metalTexture} 
              color="#3a3e48" 
              roughness={0.35} 
              metalness={0.85}
            />
          </mesh>
          {/* Right Pillar */}
          <mesh position={[5.8, 1, z]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 6, 0.4]} />
            <meshStandardMaterial 
              map={metalTexture} 
              color="#3a3e48" 
              roughness={0.35} 
              metalness={0.85}
            />
          </mesh>
          {/* Pillar base accent glow — left */}
          <mesh position={[-5.8, -1.9, z]}>
            <boxGeometry args={[0.5, 0.06, 0.5]} />
            <meshStandardMaterial 
              color="#22c55e" 
              emissive="#22c55e" 
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Pillar base accent glow — right */}
          <mesh position={[5.8, -1.9, z]}>
            <boxGeometry args={[0.5, 0.06, 0.5]} />
            <meshStandardMaterial 
              color="#22c55e" 
              emissive="#22c55e" 
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* --- Art Frames on the Left Wall --- */}
      {projects.map((project, idx) => {
        // Space them along the corridor at z = -8, z = -15, z = -22
        const frameZ = -8 - idx * 7.5
        const frameY = 1.0
        const isHovered = hoveredFrame === project.id
        const isActive = activeProject === project.id

        return (
          <group key={project.id} position={[-5.78, frameY, frameZ]}>
            {/* Frame Border — metallic */}
            <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[3.2, 2.2, 0.08]} />
              <meshStandardMaterial 
                color="#333" 
                roughness={0.3} 
                metalness={0.9}
                emissive={project.color}
                emissiveIntensity={isActive ? 0.1 : 0.02}
              />
            </mesh>

            {/* Glowing screen/painting center */}
            <mesh 
              rotation={[0, Math.PI / 2, 0]}
              position={[0.05, 0, 0]}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredFrame(project.id)
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                setHoveredFrame(null)
                document.body.style.cursor = 'default'
              }}
              onClick={(e) => {
                e.stopPropagation()
                onSelectProject(project.id)
              }}
            >
              <planeGeometry args={[3.0, 2.0]} />
              <meshStandardMaterial 
                color={isActive ? '#ffffff' : (isHovered ? '#dddddd' : '#999999')}
                roughness={0.1}
                metalness={0.9}
                emissive={project.color}
                emissiveIntensity={isActive ? 0.4 : (isHovered ? 0.2 : 0.05)}
              />
            </mesh>

            {/* Spotlight directly above pointing at painting */}
            <spotLight
              position={[2, 2.5, 0]} // Offset towards center of corridor, pointing back
              target-position={[0, 0, 0]}
              intensity={isActive ? 12 : (isHovered ? 6 : 4)}
              angle={Math.PI / 6}
              penumbra={0.5}
              color={project.color}
              castShadow
            />

            {/* 3D Label Text */}
            <Text
              position={[0.1, -1.35, 0]}
              rotation={[0, Math.PI / 2, 0]}
              fontSize={0.22}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              {project.title}
            </Text>

            <Text
              position={[0.1, -1.6, 0]}
              rotation={[0, Math.PI / 2, 0]}
              fontSize={0.12}
              color={project.color}
              anchorX="center"
              anchorY="middle"
            >
              {project.subtitle}
            </Text>

            {/* Spotlight cone helper mesh */}
            <mesh position={[1, 1.25, 0]} rotation={[0, 0, -Math.PI / 4.5]} transparent>
              <coneGeometry args={[0.3, 2.5, 32, 1, true]} />
              <meshBasicMaterial 
                color={project.color} 
                transparent 
                opacity={isActive ? 0.1 : (isHovered ? 0.06 : 0.03)} 
                side={THREE.DoubleSide} 
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
