'use client'

import type { VideoWallEstimatorBlock as VideoWallEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, estimatorFormClassName, estimatorQuestionsClassName } from '@/components/site/estimator/Shell'
import { ArrowRight, LayoutTemplate, MapPin, Monitor, Ruler } from 'lucide-react'

// Best-effort recommended technology, matched the same way as the page's
// own "Video Wall Technologies for Every Environment" guidance: close
// viewing favors Fine-Pitch LED, control/command/security rooms favor
// LCD, everything else favors Direct View LED for large-format impact.
function techLabel(distanceText?: string | null, locationText?: string | null): string {
  const distance = (distanceText || '').toLowerCase()
  const location = (locationText || '').toLowerCase()

  if (distance.includes('close')) return 'Fine-Pitch LED'
  if (location.includes('control room') || location.includes('command center') || location.includes('security room')) {
    return 'LCD Video Wall'
  }
  return 'Direct View LED'
}

type Props = {
  className?: string
} & VideoWallEstimatorBlockProps

export const VideoWallEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  locationLabel,
  locationOptions = [],
  displaysLabel,
  displaysOptions = [],
  contentTypeLabel,
  contentTypeOptions = [],
  distanceLabel,
  distanceOptions = [],
  submitLabel,
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeLocation = locationOptions || []
  const safeDisplays = displaysOptions || []
  const safeContentType = contentTypeOptions || []
  const safeDistance = distanceOptions || []

  const [location, setLocation] = useState<number | null>(null)
  const [displays, setDisplays] = useState<number | null>(null)
  const [contentType, setContentType] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (
    safeLocation.length === 0 ||
    safeDisplays.length === 0 ||
    safeContentType.length === 0 ||
    safeDistance.length === 0
  ) {
    return null
  }

  const allAnswered = location !== null && displays !== null && contentType !== null && distance !== null

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

    const locationText = safeLocation[location as number]?.text
    const displaysText = safeDisplays[displays as number]?.text
    const contentTypeText = safeContentType[contentType as number]?.text
    const distanceText = safeDistance[distance as number]?.text

    const label = techLabel(distanceText, locationText)

    return { label, locationText, displaysText, contentTypeText }
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
                  label={locationLabel}
                  Icon={MapPin}
                  options={safeLocation}
                  value={location}
                  onChange={setLocation}
                  error={attempted && location === null}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ChipQuestion
                    label={displaysLabel}
                    Icon={Monitor}
                    options={safeDisplays}
                    value={displays}
                    onChange={setDisplays}
                    error={attempted && displays === null}
                  />
                  <ChipQuestion
                    label={distanceLabel}
                    Icon={Ruler}
                    options={safeDistance}
                    value={distance}
                    onChange={setDistance}
                    error={attempted && distance === null}
                  />
                </div>

                <ChipQuestion
                  label={contentTypeLabel}
                  Icon={LayoutTemplate}
                  options={safeContentType}
                  value={contentType}
                  onChange={setContentType}
                  error={attempted && contentType === null}
                />

                <Button type="submit" variant="default" className="group w-full">
                  {submitLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>

              <EstimatorResultPanel
                hasResult={Boolean(result)}
                eyebrow="Recommended Technology"
                headline={result?.label}
                emptyText={<>Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended video wall technology.</>}
              >
                {result && (
                  <>
                    For a {result.locationText?.toLowerCase()} showing {result.contentTypeText?.toLowerCase()} across{' '}
                    {result.displaysText?.toLowerCase()} displays, a {result.label} setup is a strong fit.
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
