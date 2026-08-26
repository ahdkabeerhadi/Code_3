import type { ResultsShowcaseBlock as ResultsShowcaseBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & ResultsShowcaseBlockProps

export const ResultsShowcaseBlock: React.FC<Props> = ({ badge, className, title, subtitle, results = [] }) => {
  if (!results || results.length === 0) return null

  // Dynamic column count can't be a computed Tailwind class string (JIT only picks up
  // literal class names found at build time), so map to a fixed set instead.
  const gridColsClass =
    { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' }[results.length] ||
    'md:grid-cols-4'

  return (
    <section className={cn('relative overflow-hidden bg-[#140505] py-14 md:py-20', className)}>
      {/* Ambient texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_0%,rgba(214,29,42,0.25),transparent),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(214,29,42,0.15),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary_red/60 to-transparent"
      />

      <div className="container relative mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-xl text-center md:mb-14">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-3 text-white/60 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100}>
          <div className={cn('grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-0', gridColsClass)}>
            {results.map((r, i) => (
              <div
                key={r.id || i}
                className={cn(
                  'relative px-0 text-center md:px-8',
                  i > 0 && 'md:border-l md:border-white/10',
                )}
              >
                <div className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  <span className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">{r.value}</span>
                </div>
                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-primary_red">{r.label}</div>
                <p className="mx-auto mt-3 max-w-[220px] text-sm leading-relaxed text-white/55">{r.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
