'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ServiceIcon } from '@/components/site/icons'
import { CtaButton } from '@/components/site/CtaButton'

interface Service {
  title: string
  description: string
  icon: string
  buttonLink?: string
  category?: 'infrastructure' | 'digital'
}

interface ServiceSolutionsBlockProps {
  blockId?: string
  badge?: string
  title?: string
  description?: string
  services?: Service[]
  serviceType?: 'infrastructure' | 'digital'
  className?: string
  ctaText?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

type Props = ServiceSolutionsBlockProps

export const ServiceSolutionsBlock: React.FC<Props> = ({
  blockId = 'service-section',
  className,
  badge,
  title,
  description,
  services = [],
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  if (services.length === 0) return null

  return (
    <section id={blockId} className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-8 max-w-2xl">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>}
        </Reveal>

        <Reveal delayMs={140} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const cardInner = (
              <>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-primary_red/40 bg-white">
                    <ServiceIcon preset={service.icon} className="h-5 w-5 text-primary_red" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                </div>
                {service.description && (
                  <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
                )}
              </>
            )

            return service.buttonLink && service.buttonLink !== '#' ? (
              <Link
                key={`${service.title}-${i}`}
                href={service.buttonLink}
                className="rounded-xl border border-border p-6 transition-colors duration-300 hover:border-primary_red hover:bg-gray-50"
              >
                {cardInner}
              </Link>
            ) : (
              <div key={`${service.title}-${i}`} className="rounded-xl border border-border p-6">
                {cardInner}
              </div>
            )
          })}
        </Reveal>

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-10" />
      </div>
    </section>
  )
}
