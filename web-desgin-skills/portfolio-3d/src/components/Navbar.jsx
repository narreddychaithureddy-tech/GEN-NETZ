import React from 'react'

export default function Navbar({ activeSection }) {
  const handleNavClick = (pageOffset) => {
    // Find the scroll overlay container created by Drei's ScrollControls
    const canvasContainer = document.querySelector('.canvas-container')
    if (canvasContainer) {
      // Drei's scroll container is the direct div inside canvas container that handles overflow
      const scrollEl = canvasContainer.querySelector('div')
      if (scrollEl) {
        const targetScrollTop = pageOffset * scrollEl.clientHeight
        scrollEl.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        })
      }
    }
  }

  const navItems = [
    { label: 'Intro', section: 0, page: 0 },
    { label: 'Sprints', section: 1, page: 1.2 },
    { label: 'Edit Suite', section: 2, page: 2.4 },
    { label: 'Resources & Contact', section: 3, page: 3.6 }
  ]

  return (
    <nav className="navbar interactive-overlay">
      {navItems.map((item) => (
        <span
          key={item.label}
          onClick={() => handleNavClick(item.page)}
          className={`navbar-link ${activeSection === item.section ? 'active' : ''}`}
        >
          {item.label}
        </span>
      ))}
    </nav>
  )
}
