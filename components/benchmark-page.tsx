'use client'

import { CartesianGrid, Label, ReferenceLine, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const scanners = [
  { name: 'Scanner A', recall: 15, precision: 9.5, color: '#c4cdca' },
  { name: 'Scanner B', recall: 40, precision: 61.1, color: '#9aa9a3' },
  { name: 'Scanner C', recall: 55, precision: 72.7, color: '#6e8179' },
  { name: 'KLUE', recall: 76.5, precision: 100, color: '#14945a', featured: true },
]

const chartConfig = {
  precision: { label: 'Precision', color: '#14945a' },
  recall: { label: 'Recall', color: '#6e8179' },
}

function Point({ cx, cy, payload }: { cx?: number; cy?: number; payload?: (typeof scanners)[number] }) {
  if (cx == null || cy == null || !payload) return null

  return (
    <g className={payload.featured ? 'benchmark-point benchmark-point-featured' : 'benchmark-point'}>
      {payload.featured && (
        <>
          <circle className="benchmark-pulse" cx={cx} cy={cy} r={24} fill="none" stroke="#14945a" strokeWidth={1.5} />
          <line className="benchmark-projection" x1={cx} y1={cy} x2={cx} y2={cy + 260} />
          <line className="benchmark-projection" x1={cx} y1={cy} x2={cx - 260} y2={cy} />
        </>
      )}
      <circle cx={cx} cy={cy} r={payload.featured ? 8 : 6} fill={payload.color} stroke="#ffffff" strokeWidth={3} />
      {payload.featured && <image href="/icon.svg" x={cx + 14} y={cy - 31} width={28} height={28} aria-label="KLUE logo" />}
      <text x={cx + (payload.featured ? 48 : 13)} y={cy - 9} fill="#26332f" fontSize={12} fontWeight={payload.featured ? 700 : 500}>
        {payload.name}
      </text>
    </g>
  )
}

export function BenchmarkPage() {
  return (
    <main className="benchmark-page" aria-label="KLUE benchmark graph">
      <section className="benchmark-graph" aria-labelledby="benchmark-title">
        <h1 id="benchmark-title" className="sr-only">Precision and recall benchmark</h1>
        <ChartContainer config={chartConfig} className="h-[min(88svh,820px)] w-full">
          <ScatterChart margin={{ top: 42, right: 92, bottom: 52, left: 42 }}>
            <CartesianGrid strokeDasharray="2 8" vertical={false} stroke="#dce5e2" />
            <XAxis type="number" dataKey="recall" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#71817b', fontSize: 12 }}>
              <Label value="Recall" position="insideBottom" offset={-30} fill="#71817b" fontSize={12} />
            </XAxis>
            <YAxis type="number" dataKey="precision" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#71817b', fontSize: 12 }}>
              <Label value="Precision" angle={-90} position="insideLeft" offset={12} fill="#71817b" fontSize={12} />
            </YAxis>
            <ReferenceLine x={50} stroke="#cdd6d5" strokeDasharray="3 7" />
            <ReferenceLine y={50} stroke="#cdd6d5" strokeDasharray="3 7" />
            <Tooltip cursor={{ stroke: '#cdd6d5' }} content={<ChartTooltipContent hideLabel />} />
            <Scatter data={scanners} shape={<Point />} />
          </ScatterChart>
        </ChartContainer>
      </section>
    </main>
  )
}
