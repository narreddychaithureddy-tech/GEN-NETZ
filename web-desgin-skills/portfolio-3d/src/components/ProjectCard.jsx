import React from 'react'
import { X, ExternalLink } from 'lucide-react'
import { projects } from '../content/projects'

export default function ProjectCard({ selectedProject, onClose }) {
  if (!selectedProject) return null

  const project = projects.find((p) => p.id === selectedProject)
  if (!project) return null

  return (
    <div className="project-detail-overlay interactive-overlay" onClick={onClose}>
      <div className="project-detail-content" onClick={(e) => e.stopPropagation()}>
        {/* Visual Showcase (Mockup Image) */}
        <div className="project-detail-visual">
          <img src={project.image} alt={project.title} />
        </div>

        {/* Project Meta Information */}
        <div className="project-detail-info">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="slide-subtitle" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>{project.subtitle}</p>
                <h2 style={{ fontSize: '1.8rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>{project.title}</h2>
              </div>
              <button 
                onClick={onClose}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--foreground-muted)', 
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', marginTop: '1.2rem', lineHeight: '1.6' }}>
              {project.description}
            </p>

            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Role & Year
              </p>
              <p style={{ color: '#fff', fontSize: '0.9rem' }}>
                {project.role} &mdash; {project.year}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Technology Stack
              </p>
              <div className="project-detail-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <a
            href={project.link}
            download={project.link.endsWith('.pdf')}
            target={project.link.startsWith('http') || project.link.endsWith('.pdf') ? '_blank' : '_self'}
            rel="noreferrer"
            className="btn-glass active"
            style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
          >
            {project.link.endsWith('.pdf') ? 'Download PDF Playbook' : 'Explore Sprint Details'} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
