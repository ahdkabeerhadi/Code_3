import type { CoverageTableBlock as CoverageTableBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & CoverageTableBlockProps

export const CoverageTableBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  areaHeaderLabel,
  managedHeaderLabel,
  rows = [],
  closingStatement,
  pills = [],
  ctaLabel,
  ctaUrl,
}) => {
  if (!rows || rows.length === 0) return null
  const pillList = pills || []

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
          <div className="hidden overflow-hidden rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_45px_-20px_rgba(0,0,0,0.15)] md:block">
            <div className="grid grid-cols-[1fr_1.6fr] border-b border-primary_red/15 bg-primary_red/[0.04] text-xs font-bold uppercase tracking-wide text-primary_red">
              <div className="px-5 py-3.5">{areaHeaderLabel || 'IT Area'}</div>
              <div className="border-l border-primary_red/10 px-5 py-3.5">{managedHeaderLabel || 'What We Manage'}</div>
            </div>
            {rows.map((row, index) => (
              <div
                key={row.id || index}
                className={cn(
                  'group grid grid-cols-[1fr_1.6fr] items-center border-t border-border transition-colors hover:bg-primary_red/[0.03]',
                  index % 2 === 1 && 'bg-gray-50/50',
                )}
              >
                <div className="flex items-center gap-3 px-5 py-4 text-sm font-semibold text-foreground">
                  {row.icon && (
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary_red/10 text-lg leading-none transition-colors group-hover:bg-primary_red/15">
                      {row.icon}
                    </span>
                  )}
                  {row.area}
                </div>
                <div className="border-l border-border px-5 py-4 text-sm text-gray-600">{row.description}</div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {rows.map((row, index) => (
              <div
                key={row.id || index}
                className="flex items-start gap-3 rounded-2xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                {row.icon && (
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary_red/10 text-lg leading-none">
                    {row.icon}
                  </span>
                )}
                <div>
                  <div className="text-sm font-bold text-foreground">{row.area}</div>
                  <p className="mt-1 text-sm text-gray-600">{row.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {(closingStatement || pillList.length > 0 || (ctaLabel && ctaUrl)) && (
          <Reveal delayMs={150}>
            <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-primary_red/15 bg-gradient-to-b from-primary_red/[0.05] to-primary_red/[0.02] px-6 py-10 text-center md:mt-14 md:px-10">
              {closingStatement && <p className="max-w-xl text-lg font-semibold text-foreground md:text-xl">{closingStatement}</p>}
              {pillList.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {pillList.map((pill, index) => (
                    <span
                      key={pill.id || index}
                      className="rounded-full border border-primary_red/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary_red shadow-sm"
                    >
                      {pill.text}
                    </span>
                  ))}
                </div>
              )}
              {ctaLabel && ctaUrl && (
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-primary_red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(201,14,29,0.5)] transition-colors hover:bg-red-700"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
