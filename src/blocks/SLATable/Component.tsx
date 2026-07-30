import type { SLATableBlock as SLATableBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { CtaButton } from '@/components/site/CtaButton'

type Props = {
  className?: string
} & SLATableBlockProps

const severityStyles = {
  red: {
    card: 'border-red-200 bg-red-50/60',
    bar: 'bg-red-500',
    pill: 'bg-red-500 text-white',
    stat: 'text-red-600',
  },
  amber: {
    card: 'border-amber-200 bg-amber-50/60',
    bar: 'bg-amber-500',
    pill: 'bg-amber-500 text-white',
    stat: 'text-amber-600',
  },
  blue: {
    card: 'border-blue-200 bg-blue-50/60',
    bar: 'bg-blue-500',
    pill: 'bg-blue-500 text-white',
    stat: 'text-blue-600',
  },
  green: {
    card: 'border-green-200 bg-green-50/60',
    bar: 'bg-green-500',
    pill: 'bg-green-500 text-white',
    stat: 'text-green-600',
  },
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

        <Reveal delayMs={100} className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {rows.map((row, index) => {
            const styles = severityStyles[row.severity || 'blue']
            return (
              <div
                key={row.id || index}
                className={cn(
                  'relative overflow-hidden rounded-2xl border-2 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1',
                  styles.card,
                )}
              >
                <div className={cn('absolute inset-x-0 top-0 h-1.5', styles.bar)} />

                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide',
                    styles.pill,
                  )}
                >
                  {row.priority} Priority
                </span>

                <p className="mt-3 text-sm text-gray-600">{row.impact}</p>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/5 pt-4">
                  <div>
                    <div className={cn('text-2xl font-bold', styles.stat)}>{row.remoteSupportTime}</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Remote Support</div>
                  </div>
                  <div>
                    <div className={cn('text-2xl font-bold', styles.stat)}>{row.onsiteSupportTime}</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Onsite Support</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{row.helpdeskAvailability}</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Helpdesk</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{row.resolutionTarget}</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Resolution</div>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-6" />
      </div>
    </section>
  )
}
