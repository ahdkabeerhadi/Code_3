'use client'

import type { PASystemEstimatorBlock as PASystemEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Building2,
  Check,
  Grid2x2,
  ListChecks,
  Maximize2,
  Plug,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

// Best-effort recommended PA system type, matched the same way as the
// page's own "Public Address Systems for Every Requirement" types: an
// emergency need always takes priority (life-safety), then an explicit
// network/IP integration preference, then the other stated needs (with
// zone count implying zoning even if not explicitly chosen), defaulting
// to a general commercial system.
function paSystemLabel(needText?: string | null, integrationText?: string | null, zonesText?: string | null): string {
  const need = (needText || '').toLowerCase()
  const integration = (integrationText || '').toLowerCase()
  const zones = (zonesText || '').toLowerCase()

  if (need.includes('emergency')) return 'Voice Evacuation System'
  if (integration.includes('network') || integration.includes('ip')) return 'IP-Based PA System'
  if (need.includes('background music')) return 'Background Music System'
  if (need.includes('zoned paging') || zones.includes('6–10') || zones.includes('10+')) return 'Zoned PA System'
  if (need.includes('general announcements')) return 'Paging System'
  return 'Commercial PA System'
}

// Picks "a" or "an" based on the leading sound of the given text.
function article(text?: string | null): string {
  return /^[aeiou]/i.test((text || '').trim()) ? 'an' : 'a'
}

function ChipQuestion({
  label,
  Icon,
  options,
  value,
  onChange,
  error,
}: {
  label?: string | null
  Icon: LucideIcon
  options: { text: string; id?: string | null }[]
  value: number | null
  onChange: (index: number) => void
  error?: boolean
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 flex-none text-primary_red" />
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <button
            key={opt.id || i}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              value === i
                ? 'border-primary_red bg-primary_red text-white'
                : 'border-border bg-white text-gray-700 hover:border-primary_red/40 hover:text-primary_red',
            )}
          >
            {value === i && <Check className="h-3.5 w-3.5" />}
            {opt.text}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-primary_red">Please select an option.</p>}
    </div>
  )
}

type Props = {
  className?: string
} & PASystemEstimatorBlockProps

export const PASystemEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  facilityLabel,
  facilityOptions = [],
  areaLabel,
  areaOptions = [],
  zonesLabel,
  zonesOptions = [],
  needLabel,
  needOptions = [],
  integrationLabel,
  integrationOptions = [],
  submitLabel,
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeFacility = facilityOptions || []
  const safeArea = areaOptions || []
  const safeZones = zonesOptions || []
  const safeNeed = needOptions || []
  const safeIntegration = integrationOptions || []

  const [facility, setFacility] = useState<number | null>(null)
  const [area, setArea] = useState<number | null>(null)
  const [zones, setZones] = useState<number | null>(null)
  const [need, setNeed] = useState<number | null>(null)
  const [integration, setIntegration] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (
    safeFacility.length === 0 ||
    safeArea.length === 0 ||
    safeZones.length === 0 ||
    safeNeed.length === 0 ||
    safeIntegration.length === 0
  ) {
    return null
  }

  const allAnswered =
    facility !== null && area !== null && zones !== null && need !== null && integration !== null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allAnswered) {
      setAttempted(true)
      return
    }
    setSubmitted(true)
  }

  const result = (() => {
    if (!submitted || !allAnswered) return null

    const facilityText = safeFacility[facility as number]?.text
    const areaText = safeArea[area as number]?.text
    const zonesText = safeZones[zones as number]?.text
    const needText = safeNeed[need as number]?.text
    const integrationText = safeIntegration[integration as number]?.text

    const label = paSystemLabel(needText, integrationText, zonesText)

    let integrationNote = "We'll assess the best integration approach for your facility."
    const integrationLower = (integrationText || '').toLowerCase()
    if (integrationLower.includes('fire')) {
      integrationNote = "We'll ensure full integration with your fire and safety systems."
    } else if (integrationLower.includes('existing av')) {
      integrationNote = "We'll integrate with your existing AV setup."
    } else if (integrationLower.includes('network') || integrationLower.includes('ip')) {
      integrationNote = "We'll deploy this over your IP network for centralized control."
    }

    return { label, facilityText, areaText, zonesText, needText, integrationNote }
  })()

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal
          delayMs={100}
          className="overflow-hidden rounded-2xl border border-border bg-gray-50/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_45px_-20px_rgba(0,0,0,0.15)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary_red via-red-400 to-primary_red" />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-7">
            <div className="space-y-3.5">
              <ChipQuestion
                label={facilityLabel}
                Icon={Building2}
                options={safeFacility}
                value={facility}
                onChange={setFacility}
                error={attempted && facility === null}
              />

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <ChipQuestion
                  label={areaLabel}
                  Icon={Maximize2}
                  options={safeArea}
                  value={area}
                  onChange={setArea}
                  error={attempted && area === null}
                />
                <ChipQuestion
                  label={zonesLabel}
                  Icon={Grid2x2}
                  options={safeZones}
                  value={zones}
                  onChange={setZones}
                  error={attempted && zones === null}
                />
              </div>

              <ChipQuestion
                label={needLabel}
                Icon={ListChecks}
                options={safeNeed}
                value={need}
                onChange={setNeed}
                error={attempted && need === null}
              />

              <ChipQuestion
                label={integrationLabel}
                Icon={Plug}
                options={safeIntegration}
                value={integration}
                onChange={setIntegration}
                error={attempted && integration === null}
              />

              <Button type="submit" variant="default" className="group w-full">
                {submitLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <div
              className={cn(
                'flex flex-col justify-center rounded-xl p-5 transition-all duration-300',
                result
                  ? 'border border-primary_red/15 bg-gradient-to-b from-primary_red/[0.06] to-white shadow-sm'
                  : 'bg-white shadow-sm',
              )}
            >
              {result ? (
                <>
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary_red/10 text-primary_red">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary_red">
                    Recommended PA System
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.label}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    For {article(result.facilityText)} {result.facilityText?.toLowerCase()} ({result.areaText?.toLowerCase()})
                    {' '}with {result.zonesText?.toLowerCase()} zone(s) needing {result.needText?.toLowerCase()}, a{' '}
                    {result.label.toLowerCase()} is a strong fit. {result.integrationNote}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended PA system.
                </p>
              )}
            </div>
          </form>

          <div className="flex flex-col gap-3 border-t border-border bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            {disclaimer && <p className="text-xs text-gray-500">{disclaimer}</p>}
            {ctaLabel && ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-flex flex-none items-center gap-2 rounded-full bg-primary_red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-secondary_red"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
