import type { ProcessTimelineBlock as ProcessTimelineBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & ProcessTimelineBlockProps

export const ProcessTimelineBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  steps = [],
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  if (!steps || steps.length === 0) return null

  return (
    <section className={cn('bg-white py-14 md:py-20', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100}>
          {/* Desktop: horizontal connected timeline */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-5 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
            >
              {steps.map((step, index) => (
                <div key={step.id || index} className="relative px-4 text-center first:pl-0 last:pr-0">
                  <div className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary_red bg-white text-sm font-bold text-primary_red shadow-[0_0_0_6px_white]">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical connected timeline */}
          <div className="relative md:hidden">
            <div className="absolute bottom-0 left-5 top-5 w-[2px] bg-border" />
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id || index} className="relative flex gap-4 pl-0">
                  <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-primary_red bg-white text-sm font-bold text-primary_red shadow-[0_0_0_6px_white]">
                    {index + 1}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {ctaText && ctaLabel && ctaUrl && (
            <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-16">
              <p className="text-sm font-medium text-gray-600">{ctaText}</p>
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-2 rounded-full bg-primary_red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
