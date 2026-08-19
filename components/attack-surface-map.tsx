'use client'

import { useEffect, useState } from 'react'

const klueLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-fic1zzIWQkGwfHsqP1XHI2DsxXuOIf.png'

type Node = { id: string; logo: string; x: string; y: string }

const nodes: Node[] = [
  { id: 'cloud', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/aws/default.svg', x: '16%', y: '29%' },
  { id: 'web', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cloudflare/default.svg', x: '84%', y: '29%' },
  { id: 'code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', x: '12%', y: '70%' },
  { id: 'identity', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/okta/default.svg', x: '88%', y: '70%' },
  { id: 'data', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud/default.svg', x: '32%', y: '87%' },
  { id: 'productivity', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', x: '68%', y: '87%' },
]

export function AttackSurfaceMap() {
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState('web')

  useEffect(() => {
    const reveal = window.setTimeout(() => setExpanded(true), 1450)
    const cycle = window.setInterval(() => setActive((current) => nodes[(nodes.findIndex((node) => node.id === current) + 1) % nodes.length].id), 3200)
    return () => { window.clearTimeout(reveal); window.clearInterval(cycle) }
  }, [])

  return (
    <main className="graph-stage" aria-label="Klue attack surface graph">
      <div className={`graph-canvas ${expanded ? 'graph-expanded' : 'graph-intro'}`}>
        <div className="radar-sweep" aria-hidden="true" />
        <div className="scan-ring scan-ring-one" aria-hidden="true" />
        <div className="scan-ring scan-ring-two" aria-hidden="true" />
        <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#c7d7d2" /><stop offset=".5" stopColor="#1e9b63" /><stop offset="1" stopColor="#c7d7d2" /></linearGradient></defs>
          {nodes.map((node) => <g key={node.id} className={`graph-branch graph-branch-${node.id} ${active === node.id ? 'graph-branch-active' : ''}`}>
            <line x1="50" y1="50" x2={node.x.replace('%', '')} y2={node.y.replace('%', '')} stroke="url(#line)" strokeWidth=".14" strokeDasharray=".7 .45" className="graph-line" />
            <circle cx={node.x.replace('%', '')} cy={node.y.replace('%', '')} r="1.1" className={`signal signal-${node.id}`} />
          </g>)}
          <path d="M16 29 Q50 10 84 29" className="network-link network-link-a" />
          <path d="M12 70 Q50 96 88 70" className="network-link network-link-b" />
          <path d="M32 87 Q50 72 68 87" className="network-link network-link-c" />
        </svg>
        <button className="klue-core" aria-label="Klue logo" onClick={() => setExpanded((value) => !value)}><img src={klueLogo} alt="Klue logo" /></button>
        <div className="logo-nodes">
          {nodes.map((node) => <button key={node.id} aria-label={`${node.id} component logo`} onClick={() => setActive(node.id)} className={`logo-node ${active === node.id ? 'logo-node-active' : ''}`} style={{ left: node.x, top: node.y }}><img src={node.logo} alt={`${node.id} logo`} /></button>)}
        </div>
      </div>
    </main>
  )
}
