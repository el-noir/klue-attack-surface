'use client'

import { useEffect, useState } from 'react'

type Node = {
  id: string
  name: string
  category: string
  logo: string
  x: string
  y: string
  tone: 'cyan' | 'blue' | 'violet' | 'orange'
}

const nodes: Node[] = [
  { id: 'cloud', name: 'AWS', category: 'CLOUD INFRASTRUCTURE', logo: 'https://thesvg.org/icons/aws/default.svg', x: '16%', y: '29%', tone: 'orange' },
  { id: 'web', name: 'Cloudflare', category: 'EDGE & WEB', logo: 'https://thesvg.org/icons/cloudflare/default.svg', x: '84%', y: '29%', tone: 'cyan' },
  { id: 'code', name: 'GitHub', category: 'SOURCE CODE', logo: 'https://thesvg.org/icons/github/dark.svg', x: '12%', y: '70%', tone: 'blue' },
  { id: 'identity', name: 'Okta', category: 'IDENTITY', logo: 'https://thesvg.org/icons/okta/default.svg', x: '88%', y: '70%', tone: 'violet' },
  { id: 'data', name: 'Google Cloud', category: 'DATA PLATFORM', logo: 'https://thesvg.org/icons/google-cloud/default.svg', x: '32%', y: '87%', tone: 'blue' },
  { id: 'productivity', name: 'Microsoft 365', category: 'PRODUCTIVITY', logo: 'https://thesvg.org/icons/microsoft-365/default.svg', x: '68%', y: '87%', tone: 'cyan' },
]

export function AttackSurfaceMap() {
  const [scan, setScan] = useState(78)
  const [active, setActive] = useState('web')

  useEffect(() => {
    const timer = window.setInterval(() => setScan((value) => (value >= 99 ? 63 : value + 1)), 1800)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#050a12] text-slate-100">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-cyan-400 text-lg font-black text-[#06121a]">K</span>
          <div><p className="font-mono text-sm font-bold tracking-[0.24em]">KLUE</p><p className="font-mono text-[9px] tracking-[0.18em] text-slate-500">ATTACK SURFACE</p></div>
        </div>
        <div className="hidden items-center gap-7 font-mono text-[10px] tracking-[0.18em] text-slate-500 sm:flex"><span>LIVE MONITORING</span><span className="flex items-center gap-2 text-cyan-300"><i className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />SYSTEM NOMINAL</span></div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="mb-8 max-w-xl"><p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan-300">EXTERNAL EXPOSURE // 08.19.2026</p><h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">See every surface.<br /><span className="text-slate-500">Miss nothing.</span></h1></div>
        <div className="relative h-[620px] border border-slate-800/80 bg-[radial-gradient(circle_at_center,rgba(8,48,69,.36),transparent_44%),linear-gradient(rgba(32,58,77,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(32,58,77,.16)_1px,transparent_1px)] bg-[size:auto,44px_44px,44px_44px] sm:h-[680px]">
          <div className="radar-sweep" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#1e5165" /><stop offset=".5" stopColor="#67e8f9" /><stop offset="1" stopColor="#1e5165" /></linearGradient></defs>{nodes.map((node) => <line key={node.id} x1="50" y1="51" x2={node.x.replace('%','')} y2={node.y.replace('%','')} stroke="url(#line)" strokeWidth=".12" strokeDasharray=".65 .4" />)}</svg>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"><div className="mx-auto grid size-28 place-items-center rounded-full border border-cyan-300/60 bg-[#071824] shadow-[0_0_0_12px_rgba(29,133,160,.08),0_0_50px_rgba(34,211,238,.25)] sm:size-36"><div><div className="mx-auto mb-1 grid size-11 place-items-center rounded bg-cyan-300 text-2xl font-black text-[#071824]">K</div><p className="font-mono text-xs font-bold tracking-[.28em] text-white">KLUE</p></div></div><p className="mt-4 font-mono text-[9px] tracking-[.2em] text-cyan-200">ORCHESTRATION CORE</p></div>
          {nodes.map((node) => <button key={node.id} onClick={() => setActive(node.id)} className={`node-card absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left ${active === node.id ? 'node-active' : ''}`} style={{ left: node.x, top: node.y }}><div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-md border border-slate-700/80 bg-[#0d1722] p-2.5"><img src={node.logo} alt={`${node.name} logo`} className="size-full object-contain" /></span><span><span className="block font-mono text-[9px] tracking-[.12em] text-slate-500">{node.category}</span><strong className="block whitespace-nowrap text-sm font-medium text-slate-100">{node.name}</strong></span></div><span className="mt-3 block border-t border-slate-800 pt-2 font-mono text-[9px] tracking-[.12em] text-cyan-300">{active === node.id ? 'SCANNING' : 'MONITORED'} <span className="float-right text-slate-500">{active === node.id ? `${scan}%` : '100%'}</span></span></button>)}
          <div className="absolute bottom-5 left-5 font-mono text-[9px] leading-5 tracking-[.14em] text-slate-600">ASSET GRAPH / EXTERNAL VIEW<br />ENCRYPTED TELEMETRY STREAM</div><div className="absolute bottom-5 right-5 font-mono text-[9px] leading-5 tracking-[.14em] text-slate-600">{nodes.length + 1} NODES CONNECTED<br />THREAT SIGNALS: 0</div>
        </div>
      </section>
    </main>
  )
}
      
