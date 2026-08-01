import type { SpecComparisonTableBlock as SpecComparisonTableBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & SpecComparisonTableBlockProps

export const SpecComparisonTableBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  columns = [],
  rows = [],
}) => {
  if (!columns || columns.length === 0 || !rows || rows.length === 0) return null

  // Dynamic column count (2-4) can't be expressed as a static Tailwind class, since
  // Tailwind only picks up class strings it can find verbatim at build time.
  const gridStyle = { gridTemplateColumns: `1fr repeat(${columns.length}, 1fr)` }

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100}>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-border md:block">
            <div
              className="grid min-w-[640px] bg-gray-50/80 text-xs font-semibold uppercase tracking-wide text-gray-500"
              style={gridStyle}
            >
              <div className="px-5 py-3" />
              {columns.map((col, index) => (
                <div key={col.id || index} className="px-5 py-3 text-foreground">
                  {col.label}
                </div>
              ))}
            </div>
            {rows.map((row, rIndex) => (
              <div
                key={row.id || rIndex}
                className={cn('grid min-w-[640px] items-start border-t border-border', rIndex % 2 === 1 && 'bg-gray-50/40')}
                style={gridStyle}
              >
                <div className="px-5 py-4 text-sm font-semibold text-foreground">{row.rowLabel}</div>
                {(row.values || []).map((val, vIndex) => (
                  <div key={val.id || vIndex} className="px-5 py-4 text-sm text-gray-600">
                    {val.text}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile cards - one per column */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {columns.map((col, cIndex) => (
              <div key={col.id || cIndex} className="rounded-2xl border border-border p-4">
                <div className="mb-3 text-sm font-bold text-primary_red">{col.label}</div>
                <dl className="space-y-2">
                  {rows.map((row, rIndex) => (
                    <div key={row.id || rIndex}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{row.rowLabel}</dt>
                      <dd className="text-sm text-gray-700">{row.values?.[cIndex]?.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
