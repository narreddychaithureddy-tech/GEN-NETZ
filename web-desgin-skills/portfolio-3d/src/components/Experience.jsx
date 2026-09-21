import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import OceanSky from './OceanSky'
import Water from './Water'
import Deck from './Deck'
import GalleryRoom from './GalleryRoom'
import Workspace from './Workspace'
import SkillsWall from './SkillsWall'
import ContactBoard from './ContactBoard'
import CameraRig from './CameraRig'

export default function Experience({
  isZoomed,
  onSelectDesk,
  selectedProject,
  onSelectProject,
  activeSection,
  setActiveSection
}) {
  return (
    <Canvas
      shadows
      // Performance optimization: limit DPR to 1.5 to prevent lag on retina/4K screens
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 4], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Environment, Sky, and Water */}
        <OceanSky />
        <Water />

        {/* ScrollControls: maps vertical scroll directly to the fiber useScroll offset */}
        {/* pages={4} corresponds to 4 full viewport heights to scroll through */}
        <ScrollControls pages={4} damping={0.25} distance={1.2}>
          {/* Main 3D Models and Layouts */}
          <Deck />
          <GalleryRoom 
            onSelectProject={onSelectProject} 
            activeProject={selectedProject} 
          />
          <Workspace 
            onSelectDesk={onSelectDesk} 
            isZoomed={isZoomed} 
          />
          <SkillsWall />
          <ContactBoard />

          {/* Scroll-driven Camera Controller */}
          <CameraRig
            isZoomed={isZoomed}
            selectedProject={selectedProject}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}
