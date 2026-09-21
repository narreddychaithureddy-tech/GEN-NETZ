import { useState } from 'react'
import Experience from './components/Experience'
import Navbar from './components/Navbar'
import Overlay from './components/Overlay'
import ProjectCard from './components/ProjectCard'

export default function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleSelectDesk = () => {
    setIsZoomed(true)
  }

  const handleLeaveDesk = () => {
    setIsZoomed(false)
  }

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div className="canvas-container">
        <Experience
          isZoomed={isZoomed}
          onSelectDesk={handleSelectDesk}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Global Navbar Overlay */}
      <Navbar activeSection={activeSection} />

      {/* HTML Slide Overlays */}
      <Overlay
        activeSection={activeSection}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        isZoomed={isZoomed}
        onSelectDesk={handleSelectDesk}
        onLeaveDesk={handleLeaveDesk}
      />

      {/* Detailed Project Showcase Popover Sheets */}
      <ProjectCard
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
