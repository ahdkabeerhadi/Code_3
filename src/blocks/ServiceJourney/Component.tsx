import type { ServiceJourneyBlock as ServiceJourneyBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ArrowRight, Building2, Check, ShieldCheck, Truck, type LucideIcon } from 'lucide-react'

// Best-effort icon per step, matched by keyword.
function getStepIcon(label?: string | null): LucideIcon {
  const l = (label || '').toLowerCase()
  if (l.includes('relocat') || l.includes('move')) return Truck
  if (l.includes('new office') || l.includes('setup')) return Building2
  if (l.includes('amc') || l.includes('support') || l.includes('maintenance')) return ShieldCheck
  return Building2
}

type Props = {
  className?: string
} & ServiceJourneyBlockProps

export const ServiceJourneyBlock: React.FC<Props> = ({ className, badge, title, subtitle, steps = [] }) => {
  const safeSteps = steps || []
  if (safeSteps.length === 0) return null

  return (
    <section className={cn('bg-gray-50/80 py-10 md:py-14', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal
          delayMs={100}
          className="mx-auto flex max-w-4xl flex-col items-center gap-3 md:flex-row md:justify-center md:gap-3"
        >
          {safeSteps.map((step, index) => {
            const Icon = getStepIcon(step.label)
            const isMuted = step.emphasis === 'muted'
            const isPrimary = step.emphasis === 'primary'

            const cardClassName = cn(
              'group flex w-full flex-col items-center gap-2 rounded-2xl border px-6 py-5 text-center transition-all duration-200 md:w-56',
              isMuted && 'border-dashed border-gray-300 bg-white text-gray-500',
              isPrimary &&
                'border-primary_red bg-primary_red text-white shadow-[0_16px_32px_-16px_rgba(201,14,29,0.55)] hover:scale-[1.02]',
              !isMuted && !isPrimary && 'border-primary_red/20 bg-[#FDEBEC] text-foreground hover:-translate-y-0.5 hover:shadow-md',
            )

            const inner = (
              <>
                <span
                  className={cn(
                    'flex h-10 w-10 flex-none items-center justify-center rounded-full',
                    isMuted && 'bg-gray-100 text-gray-400',
                    isPrimary && 'bg-white/15 text-white',
                    !isMuted && !isPrimary && 'bg-primary_red/10 text-primary_red',
                  )}
                >
                  {isMuted ? <Check className="h-4 w-4" /> : <Icon className="h-5 w-5" />}
                </span>
                <span className="text-sm font-semibold leading-snug">{step.label}</span>
                {isMuted && <span className="text-xs uppercase tracking-wide text-gray-400">You are here</span>}
              </>
            )

            return (
              <React.Fragment key={step.id || index}>
                {step.url && !isMuted ? (
                  <Link href={step.url} className={cardClassName}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClassName}>{inner}</div>
                )}
                {index < safeSteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 flex-none rotate-90 text-gray-300 md:rotate-0" strokeWidth={2.5} />
                )}
              </React.Fragment>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
