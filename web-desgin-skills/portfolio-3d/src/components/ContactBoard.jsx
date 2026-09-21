import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { createConcreteTexture } from '../utils/textures'

export default function ContactBoard() {
  const z = -38.5 // End of the gallery corridor
  const concreteTexture = useMemo(() => createConcreteTexture(), [])

  return (
    <group position={[0, -1.95, z]}>
      {/* Area fill light for contact section */}
      <pointLight position={[0, 3, 2]} intensity={5.0} color="#e2e8f0" distance={15} decay={2} />

      {/* 
        End Corridor Wall with Window Cutout 
      */}
      {/* Wall Left Section */}
      <mesh position={[-4.5, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 6.0, 0.2]} />
        <meshStandardMaterial map={concreteTexture} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Wall Right Section */}
      <mesh position={[4.0, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 6.0, 0.2]} />
        <meshStandardMaterial map={concreteTexture} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Wall Top Header (above window and board) */}
      <mesh position={[0, 5.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.0, 1.6, 0.2]} />
        <meshStandardMaterial map={concreteTexture} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* 
        Window Frame (looking out to the sea)
        Opening is at X = -3.0 to 2.0 roughly
      */}
      <mesh position={[-0.5, 2.2, 0]}>
        <boxGeometry args={[5.0, 0.08, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.5, 4.4, 0]}>
        <boxGeometry args={[5.0, 0.08, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-3.0, 3.3, 0]}>
        <boxGeometry args={[0.08, 2.2, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.0, 3.3, 0]}>
        <boxGeometry args={[0.08, 2.2, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Semi-transparent window pane */}
      <mesh position={[-0.5, 3.3, 0]} transparent>
        <planeGeometry args={[4.92, 2.12]} />
        <meshStandardMaterial 
          color="#a7f3d0" 
          transparent 
          opacity={0.12} 
          roughness={0.05} 
          metalness={0.95} 
        />
      </mesh>

      {/* 
        Bulletin board on the right side of the end wall
      */}
      <group position={[3.6, 2.8, 0.12]}>
        {/* Board Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.4, 1.6, 0.08]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.3}
            emissive="#22c55e"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Cork/Dark Board center */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial color="#1a2030" roughness={0.9} />
        </mesh>

        {/* Floating neon text */}
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          GET IN TOUCH
        </Text>

        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.08}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          sayhello@portfolio.com
        </Text>

        <Text
          position={[0, -0.3, 0.06]}
          fontSize={0.08}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          or fill in the form
        </Text>

        {/* Direct spotlight shining on contact board — boosted */}
        <spotLight
          position={[-1.2, 1.8, 1.5]}
          target-position={[0, 0, 0]}
          intensity={10.0}
          angle={Math.PI / 5}
          penumbra={0.5}
          color="#22c55e"
          castShadow
        />

        {/* Secondary white fill light */}
        <pointLight
          position={[0, 0, 1.0]}
          intensity={3.0}
          color="#ffffff"
          distance={5}
          decay={2}
        />
      </group>
    </group>
  )
}
