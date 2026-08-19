'use client'

import { useEffect, useRef, useState } from 'react'

const W = 760
const H = 420
const PL = 52
const PR = 28
const PT = 28
const PB = 48
const pW = W - PL - PR
const pH = H - PT - PB
const ink = '#1c1b19'

const x = (r: number) => PL + (r / 100) * pW
const y = (p: number) => H - PB - (p / 100) * pH

const ceiling = `M ${x(0)} ${y(92)} Q ${x(50)} ${y(72)}, ${x(100)} ${y(0)}`
const zone = `${ceiling} L ${x(100)} ${PT} L ${x(0)} ${PT} Z`

const scanners = [
  { recall: 15, precision: 9.5, label: 'Legacy DAST', color: '#94403a' },
  { recall: 40, precision: 61.1, label: 'Open-source Scanner', color: '#8a6d2e' },
  { recall: 55, precision: 72.7, label: 'Enterprise SAST', color: '#5a6e64' },
]

const klue = { recall: 76.5, precision: 100 }
const mono = "'JetBrains Mono', 'SF Mono', Menlo, monospace"
const sans = "'Space Grotesk', system-ui, sans-serif"

function competitorAreaPath() {
  const pts = scanners.map(s => [x(s.recall), y(s.precision)] as const)
  const first = pts[0]
  const last = pts[pts.length - 1]
  let d = `M ${x(0)} ${H - PB}`
  d += ` L ${first[0]} ${H - PB}`
  d += ` L ${first[0]} ${first[1]}`
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1][0] + pts[i][0]) / 2
    d += ` C ${cpx} ${pts[i - 1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`
  }
  d += ` L ${last[0]} ${H - PB} Z`
  return d
}

function competitorLinePath() {
  const pts = scanners.map(s => [x(s.recall), y(s.precision)] as const)
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1][0] + pts[i][0]) / 2
    d += ` C ${cpx} ${pts[i - 1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`
  }
  return d
}

export function BenchmarkPage() {
  const [phase, setPhase] = useState(0)
  const ref = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    ref.current = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2400),
    ]
    return () => ref.current.forEach(clearTimeout)
  }, [])

  const kx = x(klue.recall)
  const ky = y(klue.precision)
  const lastS = scanners[scanners.length - 1]
  const lsx = x(lastS.recall)
  const lsy = y(lastS.precision)

  return (
    <main className="benchmark-page" aria-label="KLUE benchmark graph">
      <section className="benchmark-graph" aria-labelledby="benchmark-title">
        <h1 id="benchmark-title" className="sr-only">Precision and recall benchmark</h1>
        <div className="bench-card">
          <svg viewBox={`0 0 ${W} ${H}`} className="benchmark-svg">
            <defs>
              <linearGradient id="evZone" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#157f3c" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#157f3c" stopOpacity="0.10" />
              </linearGradient>
              <clipPath id="logoClip"><circle cx={kx} cy={ky} r="9" /></clipPath>
            </defs>

            {/* Plot area */}
            <rect x={PL} y={PT} width={pW} height={pH} fill={ink} fillOpacity="0.02" rx="4" />

            {/* Zone above ceiling */}
            {phase >= 1 && <path d={zone} fill="url(#evZone)" className="bench-zone" />}

            {/* Grid */}
            {[25, 50, 75].map(v => (
              <line key={`gx${v}`} x1={x(v)} y1={PT} x2={x(v)} y2={H - PB} stroke={ink} strokeOpacity="0.06" strokeWidth="1" />
            ))}
            {[25, 50, 75].map(v => (
              <line key={`gy${v}`} x1={PL} y1={y(v)} x2={W - PR} y2={y(v)} stroke={ink} strokeOpacity="0.06" strokeWidth="1" />
            ))}

            {/* Axes */}
            <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke={ink} strokeOpacity="0.18" strokeWidth="1" />
            <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke={ink} strokeOpacity="0.18" strokeWidth="1" />

            {/* Axis labels */}
            <text x={(PL + W - PR) / 2} y={H - 8} fontSize="9" fontFamily={mono} fontWeight="600" letterSpacing="1.5" fill={ink} fillOpacity="0.35" textAnchor="middle">RECALL</text>
            <text x={14} y={(PT + H - PB) / 2} fontSize="9" fontFamily={mono} fontWeight="600" letterSpacing="1.5" fill={ink} fillOpacity="0.35" textAnchor="middle" transform={`rotate(-90 14 ${(PT + H - PB) / 2})`}>PRECISION</text>

            {/* Ticks */}
            {[0, 25, 50, 75, 100].map(t => (
              <text key={`ax${t}`} x={x(t)} y={H - PB + 18} fontSize="9" fontFamily={mono} fill={ink} fillOpacity="0.3" textAnchor="middle">{t}</text>
            ))}
            {[0, 25, 50, 75, 100].map(t => (
              <text key={`ay${t}`} x={PL - 8} y={y(t) + 3} fontSize="9" fontFamily={mono} fill={ink} fillOpacity="0.3" textAnchor="end">{t}</text>
            ))}

            {/* Phase 1: Ceiling curve */}
            {phase >= 1 && (
              <g>
                <path d={ceiling} stroke={ink} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="bench-ceiling-draw" />
                <text x={x(6)} y={y(74)} fontSize="8" fontFamily={mono} fontWeight="700" letterSpacing="1.5" fill={ink} fillOpacity="0.28" className="bench-fade-in">RULE-BASED CEILING</text>
              </g>
            )}

            {/* Phase 1: Competitor area fill */}
            {phase >= 1 && (
              <path d={competitorAreaPath()} fill={ink} fillOpacity="0.03" className="bench-zone" />
            )}

            {/* Phase 1: Competitor connection line */}
            {phase >= 1 && (
              <path d={competitorLinePath()} fill="none" stroke={ink} strokeOpacity="0.15" strokeWidth="1.5" className="bench-ceiling-draw" style={{ animationDelay: '0.3s' }} />
            )}

            {/* Phase 1: Competitors */}
            {phase >= 1 && scanners.map((s, i) => {
              const cx = x(s.recall)
              const cy = y(s.precision)
              return (
                <g key={s.label} className="bench-competitor" style={{ animationDelay: `${0.15 + i * 0.18}s` }}>
                  <line x1={cx} y1={cy + 6} x2={cx} y2={H - PB} stroke={s.color} strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                  <circle cx={cx} cy={cy} r="5" fill={s.color} fillOpacity="0.1" />
                  <circle cx={cx} cy={cy} r="3" fill={s.color} fillOpacity="0.7" />
                  <text x={cx + 10} y={cy - 5} fontSize="11" fontFamily={sans} fontWeight="600" fill={s.color}>{s.label}</text>
                  <text x={cx + 10} y={cy + 8} fontSize="8.5" fontFamily={mono} fontWeight="500" fill={s.color} fillOpacity="0.5">{s.precision}% / {s.recall}%</text>
                </g>
              )
            })}

            {/* Phase 2: Gap area */}
            {phase >= 2 && (
              <rect
                x={lsx}
                y={ky}
                width={kx - lsx}
                height={lsy - ky}
                fill="#157f3c"
                fillOpacity="0.04"
                className="bench-zone"
                style={{ animationDelay: '0.2s' }}
              />
            )}

            {/* Phase 2: KLUE */}
            {phase >= 2 && (
              <g className="bench-klue-enter">
                <line x1={kx} y1={y(30)} x2={kx} y2={ky + 14} stroke="#157f3c" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />

                {/* Thin outer ring */}
                <circle cx={kx} cy={ky} r="14" fill="none" stroke="#157f3c" strokeWidth="1" strokeOpacity="0.25" />
                {/* White disc */}
                <circle cx={kx} cy={ky} r="9" fill="#fff" />
                {/* Logo */}
                <image href="/klue-logo.png" x={kx - 9} y={ky - 9} width="18" height="18" clipPath="url(#logoClip)" />

                {/* Label */}
                <text x={kx + 22} y={ky - 8} fontSize="16" fontFamily={sans} fontWeight="800" fill="#157f3c" letterSpacing="-0.01em">KLUE</text>
                <text x={kx + 22} y={ky + 7} fontSize="9" fontFamily={mono} fontWeight="600" fill="#157f3c" fillOpacity="0.55">100% / 76.5%</text>
                <text x={kx + 22} y={ky + 22} fontSize="10.5" fontFamily={sans} fontWeight="700" fill="#157f3c" fillOpacity="0.8">0 false positives</text>
              </g>
            )}
          </svg>
        </div>
      </section>
    </main>
  )
}
