import type { PricingFactorsBlock as PricingFactorsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & PricingFactorsBlockProps

export const PricingFactorsBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  factors = [],
  ctaHeading,
  ctaDescription,
  ctaLabel,
  ctaUrl,
}) => {
  if (!factors || factors.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-8">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {factors.map((factor, index) => (
              <div
                key={factor.id || index}
                className="flex items-center gap-3 rounded-xl border border-border bg-gray-50/60 px-4 py-3.5 transition-colors hover:bg-primary_red/[0.04]"
              >
                {factor.icon && (
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary_red/10 text-lg leading-none">
                    {factor.icon}
                  </span>
                )}
                <span className="text-sm font-semibold text-foreground">{factor.text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {(ctaHeading || ctaDescription || (ctaLabel && ctaUrl)) && (
          <Reveal delayMs={150}>
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-primary_red/15 bg-gradient-to-b from-primary_red/[0.05] to-primary_red/[0.02] px-6 py-10 text-center md:mt-14 md:px-10">
              {ctaHeading && <h3 className="text-xl font-bold text-foreground md:text-2xl">{ctaHeading}</h3>}
              {ctaDescription && <p className="max-w-lg text-sm text-gray-600 leading-relaxed">{ctaDescription}</p>}
              {ctaLabel && ctaUrl && (
                <Link
                  href={ctaUrl}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary_red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(201,14,29,0.5)] transition-colors hover:bg-red-700"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
