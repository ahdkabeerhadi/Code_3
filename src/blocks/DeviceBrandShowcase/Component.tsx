import type { DeviceBrandShowcaseBlock as DeviceBrandShowcaseBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { BrandHubCards } from '@/components/DeviceCatalog/BrandHubCards'

type Props = {
  className?: string
} & DeviceBrandShowcaseBlockProps

export const DeviceBrandShowcaseBlock: React.FC<Props> = ({ badge, className, title, subtitle }) => {
  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100}>
          <BrandHubCards />
        </Reveal>
      </div>
    </section>
  )
}
