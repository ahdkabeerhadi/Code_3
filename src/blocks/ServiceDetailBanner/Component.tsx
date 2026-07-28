import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

interface ServiceDetailBannerBlockProps {
  serviceName?: string
  title?: string
  description?: string
  showGradientLine?: boolean
  className?: string
  serviceBadge?: string
  backLinkLabel?: string
  backLinkUrl?: string
}

type Props = ServiceDetailBannerBlockProps

export const ServiceDetailBannerBlock: React.FC<Props> = ({
  className,
  serviceBadge,
  serviceName,
  title,
  description,
  backLinkLabel,
  backLinkUrl,
}) => {
  return (
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          {backLinkLabel && backLinkUrl && (
            <Link
              href={backLinkUrl}
              className="mb-3 flex w-fit items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary_red"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {backLinkLabel}
            </Link>
          )}
          {(serviceBadge || serviceName) && <Eyebrow>{serviceBadge || serviceName}</Eyebrow>}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
            {title || serviceName}
          </h1>
          {description && <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>}
        </Reveal>
      </div>
    </section>
  )
}
