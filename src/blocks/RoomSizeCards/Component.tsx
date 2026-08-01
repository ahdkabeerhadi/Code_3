import type { RoomSizeCardsBlock as RoomSizeCardsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
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

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-none opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <path
        d="M3.333 8h9.334M8.667 3.667L13 8l-4.333 4.333"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

        <Reveal delayMs={100} className={cn('grid grid-cols-1 gap-4', GRID_COLS[tiers.length] || 'sm:grid-cols-2 lg:grid-cols-4')}>
          {tiers.map((tier, index) => {
            const fillPercent = Math.round(((index + 1) / tiers.length) * 100)
            const capacityLabel = tier.maxCapacity ? `${tier.minCapacity}-${tier.maxCapacity}` : `${tier.minCapacity}+`

            const cardClassName = cn(
              'group flex flex-col rounded-2xl border border-border bg-white p-5 transition-shadow duration-300',
              tier.url && 'hover:shadow-md',
            )

            const cardBody = (
              <>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FDEBEC] text-primary_red">
                  <UsersIcon />
                </span>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{capacityLabel}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">People</span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary_red transition-all duration-700"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  <h3 className="text-base font-semibold text-foreground">{tier.label}</h3>
                  {tier.url && <ArrowIcon />}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{tier.description}</p>
              </>
            )

            if (tier.url) {
              return (
                <Link key={tier.id || index} href={tier.url} className={cardClassName}>
                  {cardBody}
                </Link>
              )
            }

            return (
              <div key={tier.id || index} className={cardClassName}>
                {cardBody}
              </div>
            )
          })}
        </Reveal>

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-6" />
      </div>
    </section>
  )
}
