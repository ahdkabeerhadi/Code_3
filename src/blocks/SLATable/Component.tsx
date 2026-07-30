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
          <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
            <div className="grid grid-cols-[1fr,2fr,1fr,1fr] bg-gray-50/80 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <div className="px-5 py-3">Priority</div>
              <div className="px-5 py-3">Impact</div>
              <div className="px-5 py-3">Response Time</div>
              <div className="px-5 py-3">Resolution Target</div>
            </div>
            {rows.map((row, index) => (
              <div
                key={row.id || index}
                className={cn(
                  'grid grid-cols-[1fr,2fr,1fr,1fr] items-center border-t border-border',
                  index % 2 === 1 && 'bg-gray-50/40',
                )}
              >
                <div className="px-5 py-4">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                      severityClasses[row.severity || 'blue'],
                    )}
                  >
                    {row.priority}
                  </span>
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">{row.description}</div>
                <div className="px-5 py-4 text-sm font-medium text-foreground">{row.responseTime}</div>
                <div className="px-5 py-4 text-sm font-medium text-foreground">{row.resolutionTarget}</div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
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
                <p className="mt-2 text-sm text-gray-600">{row.description}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Response</div>
                    <div className="font-medium text-foreground">{row.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400">Resolution</div>
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
