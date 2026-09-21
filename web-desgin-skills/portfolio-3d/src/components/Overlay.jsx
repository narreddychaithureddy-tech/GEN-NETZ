import React from 'react'
import { Mail, ArrowRight, CornerDownLeft, ZoomIn } from 'lucide-react'
import { projects } from '../content/projects'

export default function Overlay({
  activeSection,
  selectedProject,
  onSelectProject,
  isZoomed,
  onSelectDesk,
  onLeaveDesk
}) {
  const handleExploreClick = (pageOffset) => {
    const canvasContainer = document.querySelector('.canvas-container')
    if (canvasContainer) {
      const scrollEl = canvasContainer.querySelector('div')
      if (scrollEl) {
        scrollEl.scrollTo({
          top: pageOffset * scrollEl.clientHeight,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <>
      {/* 
        Awwwards nominee badge clone (floating on right) 
      */}
      <div className="nominee-badge">
        Creative Web 3D Nominee
      </div>

      {/* 
        Floating social media links HUD (fixed bottom-left) 
      */}
      <div className="hud-socials interactive-overlay">
        <a href="#github" className="social-icon" aria-label="GitHub">
          <svg className="lucide lucide-github" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
          <svg className="lucide lucide-linkedin" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a href="#email" className="social-icon" aria-label="Email"><Mail size={18} /></a>
      </div>

      {/* 
        Slide Section HTML Overlays 
      */}
      <div className="scroll-container">
        
        {/* Slide 0: Home / Deck */}
        <section className={`slide ${activeSection === 0 ? '' : 'inactive'}`} style={{ opacity: activeSection === 0 ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: activeSection === 0 ? 'auto' : 'none' }}>
          <div className="glass-card interactive-overlay">
            <p className="slide-subtitle" style={{ color: '#39FF14' }}>100 DAYS AI CHALLENGE</p>
            <h1 className="slide-title">Making Money using AI</h1>
            <p className="slide-text">
              A live startup reality series. We build real side hustles, land Hyderabad clients, automate work pipelines using generative AI, and document the revenue transparency from ₹0 to ₹1 Lakh+.
            </p>
            <button className="btn-glass active" onClick={() => handleExploreClick(1.2)}>
              Explore Sprints <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Slide 1: Gallery / Projects */}
        <section className={`slide ${activeSection === 1 ? '' : 'inactive'}`} style={{ opacity: activeSection === 1 ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: activeSection === 1 ? 'auto' : 'none' }}>
          <div className="glass-card interactive-overlay">
            <p className="slide-subtitle">ACTIVE HUSTLES</p>
            <h2 className="slide-title">The Sprints</h2>
            <p className="slide-text" style={{ marginBottom: '1.5rem' }}>
              Click on the spotlit project frames inside the gallery corridor to view scripts, deliverables, and download resource playbooks.
            </p>

            <div className="project-card-container">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className={`project-item ${selectedProject === project.id ? 'active' : ''}`}
                >
                  <h3 style={{ borderColor: project.accent }}>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 2: Workspace / About */}
        <section className={`slide ${activeSection === 2 ? '' : 'inactive'}`} style={{ opacity: activeSection === 2 ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: activeSection === 2 ? 'auto' : 'none' }}>
          {!isZoomed ? (
            <div className="glass-card interactive-overlay">
              <p className="slide-subtitle">BEHIND THE SCREENS</p>
              <h2 className="slide-title">The Edit Suite</h2>
              <p className="slide-text">
                Where prompts meet profits. Zoom into the workstation to check our scripts, daily checklist, and see the software models driving our automation.
              </p>
              <button className="btn-glass active" onClick={onSelectDesk}>
                Zoom to Laptop <ZoomIn size={16} />
              </button>
            </div>
          ) : (
            // Zoomed in overlay HUD
            <div className="interactive-overlay leave-view-btn">
              <button className="btn-glass" onClick={onLeaveDesk}>
                <CornerDownLeft size={16} /> Leave Desktop view
              </button>
            </div>
          )}
        </section>

        {/* Slide 3: Skills & Contact Form */}
        <section className={`slide ${activeSection === 3 ? '' : 'inactive'}`} style={{ opacity: activeSection === 3 ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: activeSection === 3 ? 'auto' : 'none', justifyContent: 'flex-end' }}>
          <div className="glass-card interactive-overlay">
            <p className="slide-subtitle">GET IN TOUCH</p>
            <h2 className="slide-title">Let's Collaborate</h2>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="form-name">Name</label>
                <input className="form-input" id="form-name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-email">Email</label>
                <input className="form-input" id="form-email" type="email" placeholder="you@domain.com" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-message">Message</label>
                <textarea className="form-input" id="form-message" rows="3" placeholder="Tell me about your project idea..." required></textarea>
              </div>
              <button className="btn-glass active" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
              </button>
            </form>
          </div>
        </section>

      </div>
    </>
  )
}
