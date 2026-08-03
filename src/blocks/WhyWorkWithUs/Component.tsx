import type { WhyWorkWithUsBlock as WhyWorkWithUsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { IconMedia } from '@/components/site/IconMedia'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & WhyWorkWithUsBlockProps

export const WhyWorkWithUsBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  features = [],
}) => {
  return (
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-4 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        {features && features.length > 0 && (
          <Reveal delayMs={100} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.id || index}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-[#FDEBEC] text-primary_red transition-transform duration-300 group-hover:scale-105">
                    {feature.icon && typeof feature.icon === 'object' ? (
                      <IconMedia resource={feature.icon} className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="text-base font-bold">{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
