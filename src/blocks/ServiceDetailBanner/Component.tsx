import React from 'react'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { MiniContactForm } from '@/components/site/MiniContactForm'

interface ServiceDetailBannerBlockProps {
  serviceName?: string
  title?: string
  description?: string
  showGradientLine?: boolean
  className?: string
  serviceBadge?: string
}

type Props = ServiceDetailBannerBlockProps

export const ServiceDetailBannerBlock: React.FC<Props> = ({
  className,
  serviceBadge,
  serviceName,
  title,
  description,
}) => {
  return (
    <section className={cn('bg-white py-6 md:py-8', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
          <Reveal>
            {(serviceBadge || serviceName) && <Eyebrow>{serviceBadge || serviceName}</Eyebrow>}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              {title || serviceName}
            </h1>
            {description && <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>}
          </Reveal>

          <Reveal delayMs={100}>
            <MiniContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
