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

// Brand red (#DF3341) blended from a light tint up to full strength as room size grows,
// so the icon badge color itself reinforces the small-to-large progression.
const RED = [223, 51, 65]

function PeopleIcon({ count }: { count: number }) {
  const positions = [
    [12, 12],
    [6, 13],
    [18, 13],
    [12, 6],
  ].slice(0, count)

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      {positions.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.1" />
      ))}
    </svg>
  )
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

        <Reveal delayMs={100} className={cn('grid grid-cols-1 gap-5', GRID_COLS[tiers.length] || 'sm:grid-cols-2 lg:grid-cols-4')}>
          {tiers.map((tier, index) => {
            const progress = tiers.length > 1 ? index / (tiers.length - 1) : 1
            const fillPercent = Math.round(((index + 1) / tiers.length) * 100)
            const capacityLabel = tier.maxCapacity ? `${tier.minCapacity}-${tier.maxCapacity}` : `${tier.minCapacity}+`

            const alpha = 0.14 + progress * 0.86
            const iconBg = `rgba(${RED[0]}, ${RED[1]}, ${RED[2]}, ${alpha})`
            const iconColor = alpha > 0.5 ? '#fff' : `rgb(${RED.join(',')})`
            const numberColor = `rgba(${RED[0]}, ${RED[1]}, ${RED[2]}, ${Math.max(alpha, 0.55)})`

            return (
              <div
                key={tier.id || index}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-xl"
              >
                <div
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl rounded-br-none transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: iconBg, color: iconColor }}
                >
                  <PeopleIcon count={index + 1} />
                </div>

                <div className="px-5 pt-4">
                  <span className="text-4xl font-extrabold tracking-tight transition-colors duration-300" style={{ color: numberColor }}>
                    {capacityLabel}
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">People</div>
                </div>

                <div className="px-5 pt-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${fillPercent}%`, backgroundColor: `rgb(${RED.join(',')})` }}
                    />
                  </div>
                </div>

                <div className="px-5 pb-5 pt-4">
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
