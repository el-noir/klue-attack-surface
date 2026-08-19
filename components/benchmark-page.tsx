'use client'

import { CartesianGrid, Label, ReferenceLine, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const scanners = [
  { name: 'Scanner A', recall: 15, precision: 9.5, color: '#b5c0bc' },
  { name: 'Scanner B', recall: 40, precision: 61.1, color: '#8b9b94' },
  { name: 'Scanner C', recall: 55, precision: 72.7, color: '#62766e' },
  { name: 'KLUE', recall: 76.5, precision: 100, color: '#1e9b63', featured: true },
]

const chartConfig = {
  precision: { label: 'Precision', color: '#1e9b63' },
  recall: { label: 'Recall', color: '#62766e' },
}

function Point({ cx, cy, payload }: { cx?: number; cy?: number; payload?: (typeof scanners)[number] }) {
  if (cx == null || cy == null || !payload) return null

  return (
    <g className={payload.featured ? 'benchmark-point benchmark-point-featured' : 'benchmark-point'}>
      {payload.featured && <circle className="benchmark-pulse" cx={cx} cy={cy} r={25} fill="none" stroke="#1e9b63" strokeWidth={1.5} />}
      <circle cx={cx} cy={cy} r={payload.featured ? 8 : 6} fill={payload.color} stroke="#f7f8f6" strokeWidth={3} />
      {payload.featured && (
        <image href="/icon.svg" x={cx + 13} y={cy - 25} width={24} height={24} aria-label="KLUE logo" />
      )}
      <text x={cx + (payload.featured ? 43 : 13)} y={cy - 7} fill="#26332f" fontSize={12} fontWeight={payload.featured ? 700 : 500}>
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
          <ScatterChart margin={{ top: 42, right: 72, bottom: 52, left: 42 }}>
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
