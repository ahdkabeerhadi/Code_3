'use client'

import type { CastingEstimatorBlock as CastingEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, estimatorFormClassName, estimatorQuestionsClassName } from '@/components/site/estimator/Shell'
import { ArrowRight, Laptop, MapPin, Tv, Users, Video } from 'lucide-react'

// Best-effort recommended casting label from the selected device platform.
function deviceLabel(text?: string | null): string {
  const t = (text || '').toLowerCase()
  if (t.includes('windows')) return 'Windows Wireless Casting'
  if (t.includes('mac')) return 'Mac Wireless Casting'
  if (t.includes('iphone') || t.includes('ipad') || t.includes('ios')) return 'iOS Wireless Casting'
  if (t.includes('android')) return 'Android Wireless Casting'
  return 'Cross-Platform Wireless Casting'
}

type Props = {
  className?: string
} & CastingEstimatorBlockProps

export const CastingEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  locationLabel,
  locationOptions = [],
  participantsLabel,
  participantsOptions = [],
  currentDisplayLabel,
  currentDisplayOptions = [],
  devicesLabel,
  devicesOptions = [],
  vcLabel,
  vcOptions = [],
  submitLabel,
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeLocation = locationOptions || []
  const safeParticipants = participantsOptions || []
  const safeCurrentDisplay = currentDisplayOptions || []
  const safeDevices = devicesOptions || []
  const safeVc = vcOptions || []

  const [location, setLocation] = useState<number | null>(null)
  const [participants, setParticipants] = useState<number | null>(null)
  const [currentDisplay, setCurrentDisplay] = useState<number | null>(null)
  const [devices, setDevices] = useState<number | null>(null)
  const [vc, setVc] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (
    safeLocation.length === 0 ||
    safeParticipants.length === 0 ||
    safeCurrentDisplay.length === 0 ||
    safeDevices.length === 0 ||
    safeVc.length === 0
  ) {
    return null
  }

  const allAnswered =
    location !== null && participants !== null && currentDisplay !== null && devices !== null && vc !== null

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
    const participantsText = safeParticipants[participants as number]?.text
    const currentDisplayText = safeCurrentDisplay[currentDisplay as number]?.text
    const devicesText = safeDevices[devices as number]?.text
    const vcText = (safeVc[vc as number]?.text || '').toLowerCase()

    const label = deviceLabel(devicesText)

    let vcNote =
      "We'll help you determine whether conferencing-ready casting makes sense for your setup."
    if (vcText.includes('yes')) {
      vcNote =
        "We'll include conferencing-ready casting so remote participants can join every session."
    } else if (vcText.includes('no')) {
      vcNote =
        "Since video conferencing isn't required, we'll focus on fast, reliable local screen sharing."
    }

    return { label, locationText, participantsText, currentDisplayText, devicesText, vcNote }
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
                    label={participantsLabel}
                    Icon={Users}
                    options={safeParticipants}
                    value={participants}
                    onChange={setParticipants}
                    error={attempted && participants === null}
                  />
                  <ChipQuestion
                    label={currentDisplayLabel}
                    Icon={Tv}
                    options={safeCurrentDisplay}
                    value={currentDisplay}
                    onChange={setCurrentDisplay}
                    error={attempted && currentDisplay === null}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ChipQuestion
                    label={devicesLabel}
                    Icon={Laptop}
                    options={safeDevices}
                    value={devices}
                    onChange={setDevices}
                    error={attempted && devices === null}
                  />
                  <ChipQuestion
                    label={vcLabel}
                    Icon={Video}
                    options={safeVc}
                    value={vc}
                    onChange={setVc}
                    error={attempted && vc === null}
                  />
                </div>

                <Button type="submit" variant="default" className="group w-full">
                  {submitLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>

              <EstimatorResultPanel
                hasResult={Boolean(result)}
                eyebrow="Recommended Casting Setup"
                headline={result?.label}
                emptyText={<>Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended casting setup.</>}
              >
                {result && (
                  <>
                    For a {result.locationText?.toLowerCase()} with {result.participantsText?.toLowerCase()}{' '}
                    participants using a {result.currentDisplayText?.toLowerCase()}, this setup is a strong fit.{' '}
                    {result.vcNote}
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
