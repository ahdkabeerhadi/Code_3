'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Reveal } from '@/components/site/Reveal'
import { ServiceIcon } from '@/components/site/icons'
import { CtaButton } from '@/components/site/CtaButton'

export interface ServiceItemData {
  icon: string
  title: string
  description?: string
  href?: string
}

export interface ServiceCategoryData {
  label: string
  items: ServiceItemData[]
}

export interface ServiceCatalogClientProps {
  className?: string
  titleHighlight?: string | null
  title?: string | null
  categories: ServiceCategoryData[]
  ctaText?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export const ServiceCatalogClient: React.FC<ServiceCatalogClientProps> = ({
  className,
  titleHighlight,
  title,
  categories,
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  const safeCategories = categories || []
  const [activeIndex, setActiveIndex] = useState(0)
  const active = safeCategories[activeIndex]
  const items = active?.items || []
  const itemsRef = useRef<HTMLDivElement>(null)

  return (
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-8">
          <span className="block h-[3px] w-9 bg-primary_red mb-3" />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="text-primary_red">{titleHighlight}</span>{' '}
            <span className="text-foreground">{title}</span>
          </h2>
        </Reveal>

        {safeCategories.length > 1 && (
          <Reveal delayMs={80} className="flex flex-wrap gap-2.5 mb-6">
            {safeCategories.map((cat, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200',
                    isActive
                      ? 'bg-foreground text-white border-foreground'
                      : 'bg-white text-gray-600 border-border hover:border-gray-400',
                  )}
                >
                  {cat.label}
                </button>
              )
            })}
          </Reveal>
        )}

        {active?.label && (
          <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary_red/20 bg-primary_red/5 px-6 py-5 sm:flex-row">
            <p className="text-sm font-medium text-foreground sm:text-base">
              Here&rsquo;s everything included in {active.label}
            </p>
            <button
              type="button"
              onClick={() => itemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group inline-flex flex-none items-center gap-2.5 rounded-full bg-primary_red px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary_red/20 transition-all duration-300 hover:scale-[1.03] hover:bg-secondary_red hover:shadow-lg hover:shadow-primary_red/30 active:scale-[0.98]"
            >
              View All Services
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 flex-none transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        )}

        <div ref={itemsRef}>
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">
              No published sub-service pages found under &ldquo;{active?.label}&rdquo; yet.
            </p>
          ) : (
            <Reveal delayMs={140} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => {
                const cardInner = (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="h-11 w-11 flex-none rounded-full border-2 border-primary_red/40 bg-white flex items-center justify-center">
                        <ServiceIcon preset={item.icon} className="h-5 w-5 text-primary_red" />
                      </span>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </>
                )

                return item.href ? (
                  <Link
                    key={`${item.title}-${i}`}
                    href={item.href}
                    className="rounded-xl border border-border p-6 transition-colors duration-300 hover:border-primary_red hover:bg-gray-50"
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <div key={`${item.title}-${i}`} className="rounded-xl border border-border p-6">
                    {cardInner}
                  </div>
                )
              })}
            </Reveal>
          )}
        </div>

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-10" />
      </div>
    </section>
  )
}
