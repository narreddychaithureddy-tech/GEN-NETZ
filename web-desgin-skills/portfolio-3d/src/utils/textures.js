import * as THREE from 'three'

// Generates a rich mahogany wood plank texture with grain noise
export function createWoodTexture(baseColor = '#6b4226', lineColor = '#3a2010', grainColor = '#523318') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Base wood color fill — warm visible brown
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 512, 512)

  // Add warm highlight patches for realism
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 60 + Math.random() * 40)
    grad.addColorStop(0, 'rgba(180, 120, 60, 0.15)')
    grad.addColorStop(1, 'rgba(180, 120, 60, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(x - 80, y - 80, 160, 160)
  }
  
  // Draw parallel wood plank separator lines
  ctx.strokeStyle = lineColor
  ctx.lineWidth = 3
  const plankHeight = 64
  for (let i = 0; i <= 512; i += plankHeight) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
  }
  
  // Draw organic flowing wood grain lines
  ctx.strokeStyle = grainColor
  ctx.lineWidth = 1.2
  for (let i = 0; i < 240; i++) {
    const y = Math.random() * 512
    const h = Math.random() * 15 + 5
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(128, y + h, 384, y - h, 512, y)
    ctx.stroke()
  }

  // Add lighter grain streaks for depth
  ctx.strokeStyle = 'rgba(200, 150, 80, 0.12)'
  ctx.lineWidth = 0.8
  for (let i = 0; i < 80; i++) {
    const y = Math.random() * 512
    const h = Math.random() * 8 + 3
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(180, y + h, 350, y - h, 512, y)
    ctx.stroke()
  }

  // Add micro noise for tactile roughness
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
  for (let i = 0; i < 1500; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1)
  }
  ctx.fillStyle = 'rgba(255, 220, 160, 0.03)'
  for (let i = 0; i < 1000; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

// Generates a dark brick pattern for the skills display wall
export function createBrickTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Base brick color — visible dark tone
  ctx.fillStyle = '#1e1e24'
  ctx.fillRect(0, 0, 512, 512)
  
  const rows = 16
  const cols = 8
  const rh = 512 / rows
  const cw = 512 / cols
  
  // Draw individual bricks with subtle color variation
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : cw / 2
    for (let c = 0; c <= cols; c++) {
      const bx = c * cw - offset
      const by = r * rh
      // Subtle per-brick color variation
      const variation = Math.floor(Math.random() * 15)
      ctx.fillStyle = `rgb(${30 + variation}, ${30 + variation}, ${36 + variation})`
      ctx.fillRect(bx + 3, by + 3, cw - 6, rh - 6)
    }
  }
  
  // Mortar / grout line coloring
  ctx.strokeStyle = '#3a3a42'
  ctx.lineWidth = 4
  
  // Draw horizontal brick lines
  for (let i = 0; i <= rows; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * rh)
    ctx.lineTo(512, i * rh)
    ctx.stroke()
  }
  
  // Draw vertical offset lines representing a running bond layout
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : cw / 2
    for (let c = 0; c <= cols + 1; c++) {
      ctx.beginPath()
      ctx.moveTo(c * cw - offset, r * rh)
      ctx.lineTo(c * cw - offset, (r + 1) * rh)
      ctx.stroke()
    }
  }
  
  // Add subtle brick speckling
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
  for (let i = 0; i < 2000; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
  for (let i = 0; i < 1000; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)
  return texture
}

// Generates concrete noise texture for gallery corridor walls
export function createConcreteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  
  // Visible dark concrete base — not pitch black
  ctx.fillStyle = '#2a2a30'
  ctx.fillRect(0, 0, 256, 256)

  // Large blotchy patches for concrete variation
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const r = 30 + Math.random() * 50
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(60, 60, 68, 0.3)')
    grad.addColorStop(1, 'rgba(42, 42, 48, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 256)
  }
  
  // Add heavy dust and bump noise
  for (let i = 0; i < 6000; i++) {
    const opacity = Math.random() * 0.12
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }

  for (let i = 0; i < 3000; i++) {
    const opacity = Math.random() * 0.1
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }

  // Faint horizontal streaks for poured-concrete look
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
  ctx.lineWidth = 1
  for (let i = 0; i < 30; i++) {
    const y = Math.random() * 256
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(256, y + (Math.random() - 0.5) * 4)
    ctx.stroke()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

// Generates a brushed metal texture for pillars and metal surfaces
export function createMetalTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  
  // Dark steel base
  ctx.fillStyle = '#2c3038'
  ctx.fillRect(0, 0, 256, 256)

  // Brushed horizontal streaks
  ctx.strokeStyle = 'rgba(180, 190, 210, 0.06)'
  ctx.lineWidth = 0.5
  for (let i = 0; i < 400; i++) {
    const y = Math.random() * 256
    const len = 40 + Math.random() * 150
    const x = Math.random() * 256
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + len, y + (Math.random() - 0.5) * 1.5)
    ctx.stroke()
  }

  // Subtle highlight patches
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 40)
    grad.addColorStop(0, 'rgba(140, 160, 190, 0.1)')
    grad.addColorStop(1, 'rgba(140, 160, 190, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 256)
  }

  // Micro grain noise
  for (let i = 0; i < 4000; i++) {
    const v = Math.random() * 0.06
    ctx.fillStyle = `rgba(255, 255, 255, ${v})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 2)
  return texture
}

// Generates a dark ceiling panel / grid texture
export function createCeilingTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Dark ceiling base
  ctx.fillStyle = '#18181c'
  ctx.fillRect(0, 0, 512, 512)

  // Panel grid lines
  const panelSize = 64
  ctx.strokeStyle = '#2a2a32'
  ctx.lineWidth = 2
  for (let i = 0; i <= 512; i += panelSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 512)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
  }

  // Subtle per-panel variation
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const variation = Math.random() * 8
      ctx.fillStyle = `rgba(255, 255, 255, ${variation * 0.003})`
      ctx.fillRect(c * panelSize + 2, r * panelSize + 2, panelSize - 4, panelSize - 4)
    }
  }

  // Micro noise
  for (let i = 0; i < 3000; i++) {
    const v = Math.random() * 0.05
    ctx.fillStyle = `rgba(255, 255, 255, ${v})`
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 6)
  return texture
}

// Generates a procedural water normal-like texture for ocean ripples
export function createWaterTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Deep ocean base
  ctx.fillStyle = '#061e2e'
  ctx.fillRect(0, 0, 512, 512)

  // Ripple patterns — overlapping circles and waves
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = 20 + Math.random() * 80
    const grad = ctx.createRadialGradient(x, y, r * 0.3, x, y, r)
    grad.addColorStop(0, 'rgba(10, 80, 120, 0.15)')
    grad.addColorStop(0.5, 'rgba(20, 100, 140, 0.08)')
    grad.addColorStop(1, 'rgba(6, 30, 46, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Wave highlights
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.06)'
  ctx.lineWidth = 1.5
  for (let i = 0; i < 60; i++) {
    const y = Math.random() * 512
    const amplitude = Math.random() * 8 + 3
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x <= 512; x += 8) {
      ctx.lineTo(x, y + Math.sin(x * 0.04 + i) * amplitude)
    }
    ctx.stroke()
  }

  // Foam specks
  ctx.fillStyle = 'rgba(180, 220, 255, 0.04)'
  for (let i = 0; i < 2000; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}
