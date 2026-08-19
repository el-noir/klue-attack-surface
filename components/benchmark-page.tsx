'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, Crosshair, ShieldCheck, Target } from 'lucide-react'
import {
  CartesianGrid,
  Label,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const scanners = [
  { name: 'Scanner A', recall: 15, precision: 9.5, color: 'var(--chart-2)', note: 'Low signal' },
  { name: 'Scanner B', recall: 40, precision: 61.1, color: 'var(--chart-3)', note: 'Mid-pack' },
  { name: 'Scanner C', recall: 55, precision: 72.7, color: 'var(--chart-4)', note: 'Closest competitor' },
  { name: 'KLUE', recall: 76.5, precision: 100, color: 'var(--chart-1)', note: 'Best signal', featured: true },
]

const chartConfig = {
  precision: { label: 'Precision', color: 'var(--chart-1)' },
  recall: { label: 'Recall', color: 'var(--chart-2)' },
}

function Point({ cx, cy, payload }: { cx?: number; cy?: number; payload?: (typeof scanners)[number] }) {
  if (cx == null || cy == null || !payload) return null
  const size = payload.featured ? 11 : 8
  return (
    <g>
      {payload.featured && <circle cx={cx} cy={cy} r={20} fill="var(--chart-1)" opacity={0.13} />}
      <circle cx={cx} cy={cy} r={size} fill={payload.color} stroke="var(--background)" strokeWidth={3} />
      <text x={cx + 14} y={cy - 12} fill="var(--foreground)" fontSize={12} fontWeight={payload.featured ? 700 : 500}>
        {payload.name}
      </text>
    </g>
  )
}

export function BenchmarkPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <header className="flex flex-col gap-6 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <span className="grid size-8 place-items-center rounded-full border border-primary/30 text-primary"><Crosshair className="size-4" /></span>
              KLUE / BENCHMARKS
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Precision that finds the signal.</h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">A comparison of precision and recall across AI security scanners. The farther right and higher up, the more useful the findings.</p>
            </div>
          </div>
          <nav aria-label="Primary" className="flex items-center gap-2 rounded-full border border-border bg-card p-1">
            <Button asChild variant="ghost" size="sm"><Link href="/">Attack surface</Link></Button>
            <Button size="sm" className="rounded-full">Benchmark</Button>
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]" aria-labelledby="comparison-title">
          <Card className="overflow-hidden border-border bg-card shadow-none">
            <CardHeader className="gap-2 border-b border-border px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <CardTitle id="comparison-title" className="text-xl">Precision vs. recall</CardTitle>
                  <CardDescription>Independent benchmark snapshot · percentage points</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1"><span className="size-2 rounded-full bg-primary" /> KLUE leads</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-5 pt-7 sm:px-6">
              <ChartContainer config={chartConfig} className="h-[420px] w-full sm:h-[520px]">
                <ScatterChart margin={{ top: 25, right: 42, bottom: 32, left: 8 }}>
                  <CartesianGrid strokeDasharray="2 6" vertical={false} stroke="var(--border)" />
                  <XAxis type="number" dataKey="recall" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}>
                    <Label value="Recall →" position="insideBottom" offset={-20} fill="var(--muted-foreground)" fontSize={12} />
                  </XAxis>
                  <YAxis type="number" dataKey="precision" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}>
                    <Label value="Precision ↑" angle={-90} position="insideLeft" offset={12} fill="var(--muted-foreground)" fontSize={12} />
                  </YAxis>
                  <ReferenceLine x={76.5} stroke="var(--primary)" strokeDasharray="4 5" opacity={0.35} />
                  <ReferenceLine y={100} stroke="var(--primary)" strokeDasharray="4 5" opacity={0.35} />
                  <Tooltip cursor={{ stroke: 'var(--border)' }} content={<ChartTooltipContent hideLabel />} />
                  <Scatter data={scanners} shape={<Point />} />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <aside className="flex flex-col gap-4">
            <Card className="border-primary/30 bg-primary text-primary-foreground shadow-none">
              <CardHeader className="gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15"><ShieldCheck className="size-5" /></div>
                <CardTitle className="text-2xl">KLUE sits alone in the top-right.</CardTitle>
                <CardDescription className="text-primary-foreground/75">More coverage without sacrificing trust in every finding.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between border-t border-primary-foreground/20 pt-3"><span>Precision</span><strong>100%</strong></div>
                <div className="flex items-center justify-between"><span>Recall</span><strong>76.5%</strong></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-none">
              <CardHeader><CardTitle className="text-base">How to read this</CardTitle><CardDescription>Good scanners move in two directions.</CardDescription></CardHeader>
              <CardContent className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground">
                <div className="flex gap-3"><Target className="mt-1 size-4 shrink-0 text-primary" /><span><strong className="text-foreground">Recall</strong> measures how much of the real attack surface gets found.</span></div>
                <div className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" /><span><strong className="text-foreground">Precision</strong> measures how often a finding is actually valid.</span></div>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Benchmark values">
          {scanners.map((scanner) => (
            <Card key={scanner.name} className={`border-border bg-card shadow-none ${scanner.featured ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between gap-2"><span className="font-medium">{scanner.name}</span><span className="size-2 rounded-full" style={{ backgroundColor: scanner.color }} /></div>
                <div className="grid grid-cols-2 gap-3 text-sm"><div><div className="text-muted-foreground">Recall</div><div className="text-xl font-semibold">{scanner.recall}%</div></div><div><div className="text-muted-foreground">Precision</div><div className="text-xl font-semibold">{scanner.precision}%</div></div></div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowUpRight className="size-3" /> {scanner.note}</div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
