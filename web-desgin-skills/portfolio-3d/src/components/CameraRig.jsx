import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraRig({ isZoomed, selectedProject, activeSection, setActiveSection }) {
  const scroll = useScroll()
  const tempTarget = useRef(new THREE.Vector3())
  const tempLookAt = useRef(new THREE.Vector3())

  // Reduced motion query
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((state, delta) => {
    const offset = scroll.offset // Value between 0 and 1
    
    // Determine active section based on scroll offset
    let section = 0
    if (offset < 0.2) section = 0 // Home/Deck
    else if (offset < 0.55) section = 1 // Projects/Gallery
    else if (offset < 0.85) section = 2 // Workspace/Desk
    else section = 3 // Skills/Contact

    if (activeSection !== section) {
      setActiveSection(section)
    }

    // Camera target position & look-at vector
    let targetPos = new THREE.Vector3(0, 0, 4)
    let lookAtTarget = new THREE.Vector3(0, 0, -5)

    if (prefersReducedMotion) {
      // Reduced motion: Jump static camera positions, no scrolling camera paths
      if (section === 0) {
        targetPos.set(0, 0, 4)
        lookAtTarget.set(0, 0, -5)
      } else if (section === 1) {
        // Position at project in focus
        if (selectedProject === 'cyber-hunter') {
          targetPos.set(-3.5, 1, -15.5)
          lookAtTarget.set(-5.78, 1, -15.5)
        } else if (selectedProject === 'studly') {
          targetPos.set(-3.5, 1, -23.0)
          lookAtTarget.set(-5.78, 1, -23.0)
        } else {
          targetPos.set(-3.5, 1, -8.0)
          lookAtTarget.set(-5.78, 1, -8.0)
        }
      } else if (section === 2) {
        if (isZoomed) {
          targetPos.set(2.4, -0.85, -30.8) // close to laptop
          lookAtTarget.set(3.2, -0.95, -31.0)
        } else {
          targetPos.set(1.4, -0.6, -29.0)
          lookAtTarget.set(3.2, -0.95, -31.0)
        }
      } else {
        targetPos.set(1.2, 0.4, -36.0)
        lookAtTarget.set(3.6, 0.85, -38.5)
      }
    } else {
      // Cinematic Camera Path along scroll
      if (offset <= 0.25) {
        // Section 0: Deck to Gallery Entry
        // Interpolate offset 0.0 -> 0.25 to t 0.0 -> 1.0
        const t = offset / 0.25
        targetPos.set(
          0,
          THREE.MathUtils.lerp(0.5, 0.9, t),
          THREE.MathUtils.lerp(4.0, -2.0, t)
        )
        lookAtTarget.set(
          0,
          THREE.MathUtils.lerp(0.5, 1.0, t),
          THREE.MathUtils.lerp(-5.0, -8.0, t)
        )
      } else if (offset <= 0.6) {
        // Section 1: Gallery corridor projects view
        // Interpolate offset 0.25 -> 0.6 to t 0.0 -> 1.0
        const t = (offset - 0.25) / 0.35
        
        // Let the camera travel down the center of the corridor (Z = -2.0 to -24.0)
        // Shift camera slightly to the right (X = 0.5) to view the paintings on the left wall
        const currentZ = THREE.MathUtils.lerp(-2.0, -24.0, t)
        targetPos.set(0.5, 0.8, currentZ)

        // Adjust camera focus target dynamically to slide along the left wall
        // Focus slightly ahead of camera position
        lookAtTarget.set(-5.78, 1.0, currentZ - 2.5)
        
        // If a project is selected, override look-at to focus on the frame
        if (selectedProject) {
          let projectIndex = 0
          if (selectedProject === 'cyber-hunter') projectIndex = 1
          if (selectedProject === 'studly') projectIndex = 2
          const targetZ = -8 - projectIndex * 7.5
          
          // Move camera slightly closer to selected frame
          targetPos.set(-2.5, 1.0, targetZ)
          lookAtTarget.set(-5.78, 1.0, targetZ)
        }
      } else if (offset <= 0.85) {
        // Section 2: Entering workspace desk area
        // Interpolate offset 0.6 -> 0.85 to t 0.0 -> 1.0
        const t = (offset - 0.6) / 0.25

        if (isZoomed) {
          // Zoomed on desk
          targetPos.set(2.4, -0.85, -30.8)
          lookAtTarget.set(3.2, -0.95, -31.0)
        } else {
          // Normal workspace view
          targetPos.set(
            THREE.MathUtils.lerp(0.5, 1.4, t),
            THREE.MathUtils.lerp(0.8, -0.6, t),
            THREE.MathUtils.lerp(-24.0, -29.0, t)
          )
          lookAtTarget.set(
            THREE.MathUtils.lerp(-5.78, 3.2, t),
            THREE.MathUtils.lerp(1.0, -0.95, t),
            THREE.MathUtils.lerp(-26.5, -31.0, t)
          )
        }
      } else {
        // Section 3: Transition to Skills Wall & Contact Board
        // Interpolate offset 0.85 -> 1.0 to t 0.0 -> 1.0
        const t = (offset - 0.85) / 0.15

        targetPos.set(
          THREE.MathUtils.lerp(1.4, 1.2, t),
          THREE.MathUtils.lerp(-0.6, 0.4, t),
          THREE.MathUtils.lerp(-29.0, -36.0, t)
        )
        
        // Pan lookat to the contact board at the end wall on the right (X = 3.6, Z = -38.5)
        lookAtTarget.set(
          THREE.MathUtils.lerp(3.2, 3.6, t),
          THREE.MathUtils.lerp(-0.95, 0.85, t),
          THREE.MathUtils.lerp(-31.0, -38.5, t)
        )
      }
    }

    // Smooth camera movements with lerp for organic delay feel
    state.camera.position.lerp(targetPos, delta * 3.5)
    
    // Smooth look-at movements
    tempLookAt.current.lerp(lookAtTarget, delta * 4.0)
    state.camera.lookAt(tempLookAt.current)
  })

  return null
}
