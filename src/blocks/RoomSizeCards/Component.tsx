import type { RoomSizeCardsBlock as RoomSizeCardsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { CtaButton } from '@/components/site/CtaButton'

type Props = {
  className?: string
} & RoomSizeCardsBlockProps

const GRID_COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
  6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
}

export const RoomSizeCardsBlock: React.FC<Props> = ({ badge, className, title, subtitle, tiers = [], ctaText, ctaLabel, ctaUrl }) => {
  if (!tiers || tiers.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className={cn('grid grid-cols-1 gap-4', GRID_COLS[tiers.length] || 'sm:grid-cols-2 lg:grid-cols-4')}>
          {tiers.map((tier, index) => {
            const fillPercent = Math.round(((index + 1) / tiers.length) * 100)
            const capacityLabel = tier.maxCapacity ? `${tier.minCapacity}-${tier.maxCapacity}` : `${tier.minCapacity}+`

            return (
              <div
                key={tier.id || index}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="px-5 pt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-primary_red transition-all duration-700" style={{ width: `${fillPercent}%` }} />
                  </div>
                </div>

                <div className="px-5 pt-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-foreground">{capacityLabel}</span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">People</div>
                </div>

                <div className="px-5 pb-5 pt-3">
                  <h3 className="text-base font-semibold text-foreground">{tier.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{tier.description}</p>
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
