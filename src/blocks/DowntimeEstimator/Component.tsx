'use client'

import type { DowntimeEstimatorBlock as DowntimeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { NumberField } from '@/components/site/estimator/NumberField'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, StartOverButton, estimatorBodyClassName } from '@/components/site/estimator/Shell'
import { WizardNav, WizardProgress } from '@/components/site/estimator/Wizard'
import { Building2, Camera, Flag, Laptop, MapPin, Presentation, Server } from 'lucide-react'

// Buckets a raw count into a 0-3 complexity contribution. Kept in code (not
// CMS-configurable) since it's a formula, not content — only the resulting
// tier ranges/labels are admin-editable.
function bucket(value: number, steps: number[]): number {
  for (let i = 0; i < steps.length; i++) {
    if (value <= steps[i]) return i
  }
  return steps.length
}

export const DowntimeEstimatorBlock: React.FC<
  {
    className?: string
  } & DowntimeEstimatorBlockProps
> = ({
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
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const safeFloors = floorsOptions || []
  const safeCurrent = currentLocationOptions || []
  const safeNew = newLocationOptions || []
  const safeTiers = complexityTiers || []
  if (safeTiers.length === 0) return null

  const steps = [
    {
      answered: workstations !== '',
      content: (
        <NumberField label={workstationsLabel} Icon={Laptop} placeholder="e.g. 20" value={workstations} onChange={setWorkstations} />
      ),
    },
    {
      answered: servers !== '',
      content: <NumberField label={serversLabel} Icon={Server} placeholder="e.g. 2" value={servers} onChange={setServers} />,
    },
    {
      answered: floors !== null,
      content: <ChipQuestion label={floorsLabel} Icon={Building2} options={safeFloors} value={floors} onChange={setFloors} />,
    },
    {
      answered: cctv !== '',
      content: <NumberField label={cctvLabel} Icon={Camera} placeholder="e.g. 4" value={cctv} onChange={setCctv} />,
    },
    {
      answered: meetingRooms !== '',
      content: (
        <NumberField label={meetingRoomsLabel} Icon={Presentation} placeholder="e.g. 2" value={meetingRooms} onChange={setMeetingRooms} />
      ),
    },
    {
      answered: currentLocation !== null,
      content: (
        <ChipQuestion
          label={currentLocationLabel}
          Icon={MapPin}
          options={safeCurrent}
          value={currentLocation}
          onChange={setCurrentLocation}
        />
      ),
    },
    {
      answered: newLocation !== null,
      content: (
        <ChipQuestion label={newLocationLabel} Icon={Flag} options={safeNew} value={newLocation} onChange={setNewLocation} />
      ),
    },
  ]
  const isLast = step === steps.length - 1
  const current = steps[step]

  const handleNext = () => {
    if (!current.answered) return
    if (isLast) setSubmitted(true)
    else setStep((s) => s + 1)
  }
  const handleBack = () => setStep((s) => Math.max(0, s - 1))
  const handleStartOver = () => {
    setWorkstations('')
    setServers('')
    setFloors(null)
    setCctv('')
    setMeetingRooms('')
    setCurrentLocation(null)
    setNewLocation(null)
    setStep(0)
    setSubmitted(false)
  }

  const result = (() => {
    if (!submitted) return null
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
            <div className={estimatorBodyClassName}>
              {result ? (
                <div>
                  <EstimatorResultPanel eyebrow="Estimated Move Complexity" headline={result.label} />
                  <StartOverButton onClick={handleStartOver} />
                </div>
              ) : (
                <div key={step}>
                  <WizardProgress current={step} total={steps.length} />
                  {current.content}
                  <WizardNav
                    showBack={step > 0}
                    onBack={handleBack}
                    onNext={handleNext}
                    nextLabel={isLast ? submitLabel || 'Submit' : 'Next'}
                    nextDisabled={!current.answered}
                  />
                </div>
              )}
            </div>

            <EstimatorFooter disclaimer={disclaimer} ctaLabel={ctaLabel} ctaUrl={ctaUrl} />
          </EstimatorCard>
        </Reveal>
      </div>
    </section>
  )
}
