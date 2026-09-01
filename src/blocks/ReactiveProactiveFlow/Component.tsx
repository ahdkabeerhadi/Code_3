import type { ReactiveProactiveFlowBlock as ReactiveProactiveFlowBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Headset,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

type Props = {
  className?: string
} & ReactiveProactiveFlowBlockProps

// Best-effort icon per proactive step, matched by keyword. The reactive row
// deliberately gets no icons — plain, faceless steps read as the "before" state.
function getProactiveIcon(text?: string | null): LucideIcon {
  const t = (text || '').toLowerCase()
  if (t.includes('monitor')) return Eye
  if (t.includes('detect')) return Search
  if (t.includes('prevent')) return ShieldCheck
  if (t.includes('maintain')) return Wrench
  if (t.includes('support')) return Headset
  return CheckCircle2
}

export const ReactiveProactiveFlowBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  reactiveLabel,
  reactiveSteps = [],
  proactiveLabel,
  proactiveSteps = [],
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  const safeReactive = reactiveSteps || []
  const safeProactive = proactiveSteps || []
  if (safeReactive.length === 0 || safeProactive.length === 0) return null

  return (
    <section className={cn('bg-white py-10 md:py-14', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          {/* Without AMC — reactive, muted, dashed */}
          <div className="flex flex-col gap-4 border-b border-border bg-gray-50/70 p-6 md:flex-row md:items-center md:p-7">
            <span className="inline-flex w-fit flex-none items-center rounded-full bg-gray-200/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 md:w-40">
              {reactiveLabel}
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {safeReactive.map((step, i) => (
                <React.Fragment key={step.id || i}>
                  <span className="rounded-lg border border-dashed border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-500">
                    {step.text}
                  </span>
                  {i < safeReactive.length - 1 && <ArrowRight className="h-4 w-4 flex-none text-gray-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* With CODE3 AMC — proactive, branded, icon-led */}
          <div className="flex flex-col gap-4 bg-white p-6 md:flex-row md:items-center md:p-7">
            <span className="inline-flex w-fit flex-none items-center rounded-full bg-primary_red px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white md:w-40">
              {proactiveLabel}
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {safeProactive.map((step, i) => {
                const Icon = getProactiveIcon(step.text)
                return (
                  <React.Fragment key={step.id || i}>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary_red/20 bg-[#FDEBEC] px-3.5 py-2 text-sm font-semibold text-foreground">
                      <Icon className="h-3.5 w-3.5 flex-none text-primary_red" />
                      {step.text}
                    </span>
                    {i < safeProactive.length - 1 && (
                      <ArrowRight className="h-4 w-4 flex-none text-primary_red/50" />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </Reveal>

        {ctaText && ctaLabel && ctaUrl && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center md:mt-12">
            <p className="text-sm font-medium text-gray-600">{ctaText}</p>
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary_red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
