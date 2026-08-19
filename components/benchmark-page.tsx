'use client'

import Link from 'next/link'
import { CartesianGrid, Label, ReferenceLine, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const scanners = [
  { name: 'Scanner A', recall: 15, precision: 9.5, color: '#aab7b3' },
  { name: 'Scanner B', recall: 40, precision: 61.1, color: '#7f918b' },
  { name: 'Scanner C', recall: 55, precision: 72.7, color: '#52665f' },
  { name: 'KLUE', recall: 76.5, precision: 100, color: '#1e9b63', featured: true },
]

const chartConfig = {
  precision: { label: 'Precision', color: '#1e9b63' },
  recall: { label: 'Recall', color: '#52665f' },
}

function Point({ cx, cy, payload }: { cx?: number; cy?: number; payload?: (typeof scanners)[number] }) {
  if (cx == null || cy == null || !payload) return null
  return (
    <g className={payload.featured ? 'benchmark-point benchmark-point-featured' : 'benchmark-point'}>
      {payload.featured && <circle cx={cx} cy={cy} r={24} fill="#1e9b63" opacity={0.12} />}
      <circle cx={cx} cy={cy} r={payload.featured ? 9 : 7} fill={payload.color} stroke="#fff" strokeWidth={3} />
      <text x={cx + 14} y={cy - 12} fill="#26332f" fontSize={12} fontWeight={payload.featured ? 700 : 500}>
        {payload.name}
      </text>
    </g>
  )
}

export function BenchmarkPage() {
  return (
    <main className="benchmark-page" aria-label="KLUE benchmark graph">
      <header className="benchmark-header">
        <Link href="/" aria-label="KLUE home" className="benchmark-logo">
          <img src="/icon.svg" alt="KLUE" />
        </Link>
        <nav aria-label="Primary" className="benchmark-nav">
          <Link href="/">Attack surface</Link>
          <span aria-current="page">Benchmark</span>
        </nav>
      </header>

      <section className="benchmark-graph" aria-labelledby="benchmark-title">
        <h1 id="benchmark-title" className="sr-only">Precision and recall benchmark</h1>
        <ChartContainer config={chartConfig} className="h-[min(78svh,700px)] w-full">
          <ScatterChart margin={{ top: 30, right: 52, bottom: 44, left: 20 }}>
            <CartesianGrid strokeDasharray="2 7" vertical={false} stroke="#dce5e2" />
            <XAxis type="number" dataKey="recall" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#71817b', fontSize: 12 }}>
              <Label value="Recall" position="insideBottom" offset={-28} fill="#71817b" fontSize={12} />
            </XAxis>
            <YAxis type="number" dataKey="precision" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#71817b', fontSize: 12 }}>
              <Label value="Precision" angle={-90} position="insideLeft" offset={12} fill="#71817b" fontSize={12} />
            </YAxis>
            <ReferenceLine x={76.5} stroke="#1e9b63" strokeDasharray="4 5" opacity={0.35} />
            <ReferenceLine y={100} stroke="#1e9b63" strokeDasharray="4 5" opacity={0.35} />
            <Tooltip cursor={{ stroke: '#cdd6d5' }} content={<ChartTooltipContent hideLabel />} />
            <Scatter data={scanners} shape={<Point />} />
          </ScatterChart>
        </ChartContainer>
      </section>
    </main>
  )
}
