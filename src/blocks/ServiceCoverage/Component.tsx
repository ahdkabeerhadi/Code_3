import type { ServiceCoverageBlock as ServiceCoverageBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & ServiceCoverageBlockProps

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 flex-none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  )
}

export const ServiceCoverageBlock: React.FC<Props> = ({ badge, className, title, subtitle, areas = [], note }) => {
  if (!areas || areas.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map((area, index) => (
            <div
              key={area.id || index}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-gray-50/60 px-4 py-3"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#FDEBEC] text-primary_red">
                <PinIcon />
              </span>
              <span className="text-sm font-medium text-foreground">{area.name}</span>
            </div>
          ))}
        </Reveal>

        {note && <p className="mt-5 text-sm text-gray-500">{note}</p>}
      </div>
    </section>
  )
}
