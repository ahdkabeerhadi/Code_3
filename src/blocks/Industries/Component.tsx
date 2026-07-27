'use client'

import React, { useState } from 'react'
import type { IndustriesBlock as IndustriesBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ServiceIcon } from '@/components/site/icons'
import { CtaButton } from '@/components/site/CtaButton'

type Props = {
  className?: string
} & IndustriesBlockProps

type IndustryItem = NonNullable<IndustriesBlockProps['items']>[number]

function IndustryCard({ item }: { item: IndustryItem }) {
  const [flipped, setFlipped] = useState(false)
  const hasDescription = !!item.description

  return (
    <div
      className="h-40 [perspective:1000px]"
      onMouseEnter={() => hasDescription && setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => hasDescription && setFlipped((f) => !f)}
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]',
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-border p-4 text-center [backface-visibility:hidden] hover:border-primary_red transition-colors duration-300">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-primary_red/40">
            <ServiceIcon preset={item.icon} className="h-5 w-5 text-primary_red" />
          </span>
          <span className="text-sm font-semibold text-foreground">{item.name}</span>
        </div>

        {/* Back */}
        {hasDescription && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary_red p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-xs leading-relaxed text-white">{item.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const IndustriesBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  items = [],
  ctaLabel,
  ctaUrl,
}) => {
  const safeItems = items || []
  if (safeItems.length === 0) return null

  return (
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
        </Reveal>

        <Reveal
          delayMs={100}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {safeItems.map((item, i) => (
            <IndustryCard key={item.id || i} item={item} />
          ))}
        </Reveal>

        <CtaButton label={ctaLabel} url={ctaUrl} className="mt-8 inline-block" />
      </div>
    </section>
  )
}
