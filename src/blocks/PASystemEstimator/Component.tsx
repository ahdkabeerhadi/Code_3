'use client'

import type { PASystemEstimatorBlock as PASystemEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, estimatorFormClassName, estimatorQuestionsClassName } from '@/components/site/estimator/Shell'
import { ArrowRight, Building2, Grid2x2, ListChecks, Maximize2, Plug } from 'lucide-react'

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

        <Reveal delayMs={100}>
          <EstimatorCard>
            <form onSubmit={handleSubmit} className={estimatorFormClassName}>
              <div className={estimatorQuestionsClassName}>
                <ChipQuestion
                  label={facilityLabel}
                  Icon={Building2}
                  options={safeFacility}
                  value={facility}
                  onChange={setFacility}
                  error={attempted && facility === null}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

              <EstimatorResultPanel
                hasResult={Boolean(result)}
                eyebrow="Recommended PA System"
                headline={result?.label}
                emptyText={<>Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended PA system.</>}
              >
                {result && (
                  <>
                    For {article(result.facilityText)} {result.facilityText?.toLowerCase()} ({result.areaText?.toLowerCase()}) with{' '}
                    {result.zonesText?.toLowerCase()} zone(s) needing {result.needText?.toLowerCase()}, a{' '}
                    {result.label.toLowerCase()} is a strong fit. {result.integrationNote}
                  </>
                )}
              </EstimatorResultPanel>
            </form>

            <EstimatorFooter disclaimer={disclaimer} ctaLabel={ctaLabel} ctaUrl={ctaUrl} />
          </EstimatorCard>
        </Reveal>
      </div>
    </section>
  )
}
