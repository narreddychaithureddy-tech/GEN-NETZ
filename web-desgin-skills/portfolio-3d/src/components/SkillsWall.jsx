import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { createBrickTexture } from '../utils/textures'

export default function SkillsWall() {
  const containerRef = useRef()
  const brickTexture = useMemo(() => createBrickTexture(), [])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    if (containerRef.current) {
      // Gentle floating animation for all skills
      containerRef.current.position.y = -1.95 + Math.sin(elapsedTime * 1.5) * 0.05
      
      // Select children elements to rotate them slightly
      containerRef.current.children.forEach((child, idx) => {
        if (child.type === 'Group') {
          child.rotation.y = Math.sin(elapsedTime + idx * 0.8) * 0.08
          child.rotation.x = Math.cos(elapsedTime * 0.8 + idx * 0.5) * 0.04
        }
      })
    }
  })

  // Aligned on the left side of the room at X = -3.5, Z = -31
  const x = -3.5
  const y = -1.95
  const z = -31

  const items = [
    { text: 'React', color: '#61dafb', xOff: -1.0, yOff: 2.2, zOff: -0.2 },
    { text: 'Three.js', color: '#22c55e', xOff: 0.8, yOff: 2.3, zOff: 0.2 },
    { text: 'WebGL', color: '#ff6b6b', xOff: -0.8, yOff: 1.4, zOff: 0.4 },
    { text: 'GSAP', color: '#8888ff', xOff: 0.8, yOff: 1.5, zOff: -0.4 },
    { text: 'Shaders', color: '#f59e0b', xOff: 0.0, yOff: 1.85, zOff: 0.0 }
  ]

  return (
    <group ref={containerRef} position={[x, y, z]} rotation={[0, Math.PI / 2, 0]}>
      {/* Area fill light for skills section */}
      <pointLight position={[0, 2.5, 1]} intensity={5.0} color="#e2e8f0" distance={12} decay={2} />

      {/* 
        A clean backing grid wall with a neon border 
      */}
      <mesh position={[0, 1.8, -0.6]} castShadow receiveShadow>
        <planeGeometry args={[3.6, 2.6]} />
        <meshStandardMaterial 
          map={brickTexture}
          roughness={0.7} 
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Neon glowing outline for the backing wall */}
      <mesh position={[0, 1.8, -0.58]}>
        <planeGeometry args={[3.7, 2.7]} />
        <meshBasicMaterial 
          color="#22c55e" 
          wireframe
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Floating skill terms */}
      {items.map((item, idx) => (
        <group key={idx} position={[item.xOff, item.yOff, item.zOff]}>
          {/* Glowing background halo — boosted */}
          <pointLight 
            position={[0, 0, -0.2]} 
            color={item.color} 
            intensity={3.0} 
            distance={3} 
            decay={2}
          />
          
          {/* Main 3D Text */}
          <Text
            fontSize={0.26}
            color={item.color}
            anchorX="center"
            anchorY="middle"
          >
            {item.text}
          </Text>

          {/* Subtly offset backing text for a glowing drop shadow effect */}
          <Text
            position={[0, 0, -0.01]}
            fontSize={0.27}
            color={item.color}
            anchorX="center"
            anchorY="middle"
            transparent
            opacity={0.4}
          >
            {item.text}
          </Text>
        </group>
      ))}

      {/* Tech Grid helper mesh */}
      <gridHelper args={[4, 10, '#22c55e', '#2e3a4e']} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}
