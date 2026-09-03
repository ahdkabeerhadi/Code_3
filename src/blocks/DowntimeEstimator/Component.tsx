'use client'

import type { DowntimeEstimatorBlock as DowntimeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { NumberField } from '@/components/site/estimator/NumberField'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, estimatorFormClassName, estimatorQuestionsClassName } from '@/components/site/estimator/Shell'
import { ArrowRight, Building2, Camera, Flag, Laptop, MapPin, Presentation, Server } from 'lucide-react'

type Props = {
  className?: string
} & DowntimeEstimatorBlockProps

// Buckets a raw count into a 0-3 complexity contribution. Kept in code (not
// CMS-configurable) since it's a formula, not content — only the resulting
// tier ranges/labels are admin-editable.
function bucket(value: number, steps: number[]): number {
  for (let i = 0; i < steps.length; i++) {
    if (value <= steps[i]) return i
  }
  return steps.length
}

export const DowntimeEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  workstationsLabel,
  serversLabel,
  floorsLabel,
  floorsOptions = [],
  cctvLabel,
  meetingRoomsLabel,
  currentLocationLabel,
  currentLocationOptions = [],
  newLocationLabel,
  newLocationOptions = [],
  submitLabel,
  complexityTiers = [],
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const [workstations, setWorkstations] = useState<number | ''>('')
  const [servers, setServers] = useState<number | ''>('')
  const [floors, setFloors] = useState<number | null>(null)
  const [cctv, setCctv] = useState<number | ''>('')
  const [meetingRooms, setMeetingRooms] = useState<number | ''>('')
  const [currentLocation, setCurrentLocation] = useState<number | null>(null)
  const [newLocation, setNewLocation] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const safeFloors = floorsOptions || []
  const safeCurrent = currentLocationOptions || []
  const safeNew = newLocationOptions || []
  const safeTiers = complexityTiers || []
  if (safeTiers.length === 0) return null

  const allAnswered =
    workstations !== '' && servers !== '' && floors !== null && cctv !== '' && meetingRooms !== '' && currentLocation !== null && newLocation !== null

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
    const score =
      bucket(Number(workstations), [10, 25, 50]) +
      bucket(Number(servers), [1, 3]) +
      (floors ?? 0) +
      bucket(Number(cctv), [0, 5]) +
      bucket(Number(meetingRooms), [0, 3]) +
      (currentLocation !== null && newLocation !== null && currentLocation !== newLocation ? 2 : 0)

    return safeTiers.find((t) => score >= t.minScore && score <= t.maxScore) || safeTiers[safeTiers.length - 1]
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
                <div className="grid grid-cols-2 gap-5">
                  <NumberField
                    label={workstationsLabel}
                    Icon={Laptop}
                    placeholder="e.g. 20"
                    value={workstations}
                    onChange={setWorkstations}
                    error={attempted && workstations === ''}
                  />
                  <NumberField
                    label={serversLabel}
                    Icon={Server}
                    placeholder="e.g. 2"
                    value={servers}
                    onChange={setServers}
                    error={attempted && servers === ''}
                  />
                </div>

                <ChipQuestion
                  label={floorsLabel}
                  Icon={Building2}
                  options={safeFloors}
                  value={floors}
                  onChange={setFloors}
                  error={attempted && floors === null}
                />

                <div className="grid grid-cols-2 gap-5">
                  <NumberField
                    label={cctvLabel}
                    Icon={Camera}
                    placeholder="e.g. 4"
                    value={cctv}
                    onChange={setCctv}
                    error={attempted && cctv === ''}
                  />
                  <NumberField
                    label={meetingRoomsLabel}
                    Icon={Presentation}
                    placeholder="e.g. 2"
                    value={meetingRooms}
                    onChange={setMeetingRooms}
                    error={attempted && meetingRooms === ''}
                  />
                </div>

                <ChipQuestion
                  label={currentLocationLabel}
                  Icon={MapPin}
                  options={safeCurrent}
                  value={currentLocation}
                  onChange={setCurrentLocation}
                  error={attempted && currentLocation === null}
                />

                <ChipQuestion
                  label={newLocationLabel}
                  Icon={Flag}
                  options={safeNew}
                  value={newLocation}
                  onChange={setNewLocation}
                  error={attempted && newLocation === null}
                />

                <Button type="submit" variant="default" className="group w-full">
                  {submitLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>

              <EstimatorResultPanel
                hasResult={Boolean(result)}
                eyebrow="Estimated Move Complexity"
                headline={result?.label}
                emptyText={<>Fill in the details and click &ldquo;{submitLabel}&rdquo; to see your estimated move complexity.</>}
              />
            </form>

            <EstimatorFooter disclaimer={disclaimer} ctaLabel={ctaLabel} ctaUrl={ctaUrl} />
          </EstimatorCard>
        </Reveal>
      </div>
    </section>
  )
}
