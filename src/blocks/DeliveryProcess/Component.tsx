'use client'

import React from 'react'
import type { DeliveryProcessBlock as DeliveryProcessBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & DeliveryProcessBlockProps

type StepItem = NonNullable<DeliveryProcessBlockProps['steps']>[number]

function StepLabel({ step, index }: { step: StepItem; index: number }) {
  return step.stepLabel || `STEP ${String(index + 1).padStart(2, '0')}`
}

export const DeliveryProcessBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  description,
  steps = [],
}) => {
  const safeSteps = steps || []
  if (safeSteps.length === 0) return null

  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-16">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>
          )}
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start">
          {safeSteps.map((step, index) => (
            <Reveal
              key={step.id || index}
              delayMs={index * 100}
              className="relative flex-1 px-4 text-left first:pl-0 last:pr-0"
            >
              <div className="mb-6 flex items-center">
                <div className="relative z-[1] h-3.5 w-3.5 flex-none rounded-full border-[3px] border-primary_red bg-white" />
                {index < safeSteps.length - 1 && (
                  <div className="h-0.5 flex-1 bg-border" />
                )}
              </div>
              <span className="mb-2 block text-xs font-semibold tracking-wider text-primary_red">
                <StepLabel step={step} index={index} />
              </span>
              <h3 className="mb-2 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-[6px] top-2 bottom-2 w-0.5 bg-border" />
          <div className="space-y-8">
            {safeSteps.map((step, index) => (
              <Reveal key={step.id || index} delayMs={index * 80} className="relative pl-8">
                <div className="absolute left-0 top-1.5 h-3.5 w-3.5 flex-none rounded-full border-[3px] border-primary_red bg-white" />
                <span className="mb-1 block text-xs font-semibold tracking-wider text-primary_red">
                  <StepLabel step={step} index={index} />
                </span>
                <h3 className="mb-1 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
