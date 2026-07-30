import type { SLATableBlock as SLATableBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { CtaButton } from '@/components/site/CtaButton'

type Props = {
  className?: string
} & SLATableBlockProps

const severityClasses = {
  red: 'bg-red-50 text-red-700 border-red-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
} as const

const COLUMNS = ['Priority', 'Impact', 'Remote Support', 'Onsite Support', 'Helpdesk Availability', 'Critical Issue Resolution']

export const SLATableBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  rows = [],
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  if (!rows || rows.length === 0) return null

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
          <div className="hidden overflow-x-auto rounded-2xl border border-border lg:block">
            <div className="grid min-w-[900px] grid-cols-[0.8fr,1.4fr,1fr,1fr,1.1fr,1.2fr] bg-gray-50/80 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {COLUMNS.map((col) => (
                <div key={col} className="px-4 py-3">
                  {col}
                </div>
              ))}
            </div>
            {rows.map((row, index) => (
              <div
                key={row.id || index}
                className={cn(
                  'grid min-w-[900px] grid-cols-[0.8fr,1.4fr,1fr,1fr,1.1fr,1.2fr] items-center border-t border-border',
                  index % 2 === 1 && 'bg-gray-50/40',
                )}
              >
                <div className="px-4 py-4">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                      severityClasses[row.severity || 'blue'],
                    )}
                  >
                    {row.priority}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm text-gray-600">{row.impact}</div>
                <div className="px-4 py-4 text-sm font-medium text-foreground">{row.remoteSupportTime}</div>
                <div className="px-4 py-4 text-sm font-medium text-foreground">{row.onsiteSupportTime}</div>
                <div className="px-4 py-4 text-sm font-medium text-foreground">{row.helpdeskAvailability}</div>
                <div className="px-4 py-4 text-sm font-medium text-foreground">{row.resolutionTarget}</div>
              </div>
            ))}
          </div>

          {/* Mobile / tablet cards */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {rows.map((row, index) => (
              <div key={row.id || index} className="rounded-2xl border border-border p-4">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                    severityClasses[row.severity || 'blue'],
                  )}
                >
                  {row.priority}
                </span>
                <p className="mt-2 text-sm text-gray-600">{row.impact}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Remote Support</div>
                    <div className="font-medium text-foreground">{row.remoteSupportTime}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Onsite Support</div>
                    <div className="font-medium text-foreground">{row.onsiteSupportTime}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Helpdesk Availability</div>
                    <div className="font-medium text-foreground">{row.helpdeskAvailability}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Critical Issue Resolution</div>
                    <div className="font-medium text-foreground">{row.resolutionTarget}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-6" />
      </div>
    </section>
  )
}
