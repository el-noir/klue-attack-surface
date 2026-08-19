'use client'

import { useEffect, useState } from 'react'

const klueLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-fic1zzIWQkGwfHsqP1XHI2DsxXuOIf.png'

type Node = { id: string; name: string; logo: string; x: string; y: string }

const nodes: Node[] = [
  { id: 'cloud', name: 'AWS', logo: 'https://thesvg.org/icons/aws/default.svg', x: '16%', y: '29%' },
  { id: 'web', name: 'Cloudflare', logo: 'https://thesvg.org/icons/cloudflare/default.svg', x: '84%', y: '29%' },
  { id: 'code', name: 'GitHub', logo: 'https://thesvg.org/icons/github/dark.svg', x: '12%', y: '70%' },
  { id: 'identity', name: 'Okta', logo: 'https://thesvg.org/icons/okta/default.svg', x: '88%', y: '70%' },
  { id: 'data', name: 'Google Cloud', logo: 'https://thesvg.org/icons/google-cloud/default.svg', x: '32%', y: '87%' },
  { id: 'productivity', name: 'Microsoft 365', logo: 'https://thesvg.org/icons/microsoft-365/default.svg', x: '68%', y: '87%' },
]

export function AttackSurfaceMap() {
  const [scan, setScan] = useState(78)
  const [active, setActive] = useState('web')

  useEffect(() => {
    const timer = window.setInterval(() => setScan((value) => (value >= 99 ? 63 : value + 1)), 1800)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#0e1d2b]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <div className="flex items-center gap-3"><img src={klueLogo} alt="Klue logo" className="size-8 object-contain" /><span className="font-mono text-[10px] tracking-[.2em] text-[#62717c]">EXPOSURE MAP</span></div>
        <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[.16em] text-[#62717c] sm:flex"><span className="size-1.5 rounded-full bg-[#1e9b63]" />LIVE MONITORING</div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-6"><div><p className="mb-3 font-mono text-[10px] tracking-[.28em] text-[#1e9b63]">EXTERNAL EXPOSURE / 08.19.2026</p><h1 className="text-balance text-4xl font-semibold tracking-[-.045em] sm:text-6xl">The connected surface,<br /><span className="text-[#8b969d]">made visible.</span></h1></div><p className="hidden max-w-xs pb-1 text-right text-sm leading-6 text-[#62717c] md:block">A precise view of every cloud, web, identity, and code surface in motion.</p></div>
        <div className="relative h-[620px] overflow-hidden border border-[#cdd6d5] bg-[#fbfcfa] sm:h-[680px]">
          <div className="radar-sweep" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#b9c8c7" /><stop offset=".5" stopColor="#1e9b63" /><stop offset="1" stopColor="#b9c8c7" /></linearGradient></defs>{nodes.map((node) => <line key={node.id} x1="50" y1="51" x2={node.x.replace('%', '')} y2={node.y.replace('%', '')} stroke="url(#line)" strokeWidth=".12" strokeDasharray=".65 .4" />)}</svg>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"><div className="grid size-32 place-items-center rounded-full border border-[#1e9b63] bg-white sm:size-40"><img src={klueLogo} alt="Klue logo" className="size-20 object-contain sm:size-24" /></div><p className="mt-4 font-mono text-[9px] tracking-[.2em] text-[#62717c]">CONTROL PLANE</p></div>
          {nodes.map((node) => <button key={node.id} aria-label={`${node.name} logo`} onClick={() => setActive(node.id)} className={`logo-node absolute z-20 -translate-x-1/2 -translate-y-1/2 ${active === node.id ? 'logo-node-active' : ''}`} style={{ left: node.x, top: node.y }}><img src={node.logo} alt={`${node.name} logo`} className="size-12 object-contain sm:size-16" /><span className="sr-only">{active === node.id ? `Scanning ${scan}%` : node.name}</span></button>)}
          <div className="absolute bottom-5 left-5 font-mono text-[9px] tracking-[.14em] text-[#8b969d]">ASSET GRAPH / EXTERNAL VIEW</div><div className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[.14em] text-[#8b969d]">{nodes.length + 1} LOGOS CONNECTED</div>
        </div>
      </section>
    </main>
  )
}
