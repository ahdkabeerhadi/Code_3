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
  cardBadge?: string
  cardHeading?: string
  cardDescription?: string
  cardLinkText?: string
  cardLinkHref?: string
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
  cardBadge,
  cardHeading,
  cardDescription,
  cardLinkText,
  cardLinkHref,
}) => {
  const showCard = Boolean(cardHeading)

  return (
    <section className={cn('bg-white pt-8 pb-2 md:pt-10 md:pb-3', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={cn('grid gap-10', showCard && 'lg:grid-cols-[1fr_360px] lg:items-start')}>
          <Reveal className={cn('max-w-2xl', !showCard && 'lg:max-w-[calc(100%-420px)]')}>
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

          {showCard && (
            <Reveal delayMs={100}>
              <div className="rounded-2xl bg-gray-50 p-8 md:p-10">
                {cardBadge && (
                  <span className="text-sm md:text-base font-semibold uppercase tracking-[0.12em] text-primary_red">
                    {cardBadge}
                  </span>
                )}
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {cardHeading}
                </h2>
                {cardDescription && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{cardDescription}</p>
                )}
                {cardLinkText && cardLinkHref && (
                  <a
                    href={cardLinkHref}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary_red hover:text-primary_red"
                  >
                    {cardLinkText}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
