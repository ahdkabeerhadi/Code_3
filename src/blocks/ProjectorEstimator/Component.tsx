'use client'

import type { ProjectorEstimatorBlock as ProjectorEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, StartOverButton, estimatorBodyClassName } from '@/components/site/estimator/Shell'
import { WizardNav, WizardProgress } from '@/components/site/estimator/Wizard'
import { MapPin, Maximize2, Projector, Sun, Tv, Users } from 'lucide-react'

// Best-effort recommended projector type, matched the same way as the
// page's own "Projector Solutions for Every Space" types: an explicit
// short-throw preference is honored first, then large spaces/crowds,
// then high ambient light, defaulting to a general business projector.
function projectorLabel(
  spaceText?: string | null,
  roomSizeText?: string | null,
  peopleText?: string | null,
  lightText?: string | null,
  projectionText?: string | null,
): string {
  const space = (spaceText || '').toLowerCase()
  const roomSize = (roomSizeText || '').toLowerCase()
  const people = (peopleText || '').toLowerCase()
  const light = (lightText || '').toLowerCase()
  const projection = (projectionText || '').toLowerCase()

  if (projection.includes('short throw')) return 'Short-Throw Projector'
  if (roomSize.includes('large') || people.includes('50+') || space.includes('auditorium') || space.includes('event space')) {
    return 'Large Venue Projector'
  }
  if (light.includes('high')) return 'High-Brightness Projector'
  return 'Business Projector'
}

// Picks "a" or "an" based on the leading sound of the given text.
function article(text?: string | null): string {
  return /^[aeiou]/i.test((text || '').trim()) ? 'an' : 'a'
}

type Props = {
  className?: string
} & ProjectorEstimatorBlockProps

export const ProjectorEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  spaceLabel,
  spaceOptions = [],
  roomSizeLabel,
  roomSizeOptions = [],
  peopleLabel,
  peopleOptions = [],
  lightLabel,
  lightOptions = [],
  projectionLabel,
  projectionOptions = [],
  screenLabel,
  screenOptions = [],
  submitLabel,
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeSpace = spaceOptions || []
  const safeRoomSize = roomSizeOptions || []
  const safePeople = peopleOptions || []
  const safeLight = lightOptions || []
  const safeProjection = projectionOptions || []
  const safeScreen = screenOptions || []

  const [space, setSpace] = useState<number | null>(null)
  const [roomSize, setRoomSize] = useState<number | null>(null)
  const [people, setPeople] = useState<number | null>(null)
  const [light, setLight] = useState<number | null>(null)
  const [projection, setProjection] = useState<number | null>(null)
  const [screen, setScreen] = useState<number | null>(null)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (
    safeSpace.length === 0 ||
    safeRoomSize.length === 0 ||
    safePeople.length === 0 ||
    safeLight.length === 0 ||
    safeProjection.length === 0 ||
    safeScreen.length === 0
  ) {
    return null
  }

  const steps = [
    {
      answered: space !== null,
      content: <ChipQuestion label={spaceLabel} Icon={MapPin} options={safeSpace} value={space} onChange={setSpace} />,
    },
    {
      answered: roomSize !== null,
      content: <ChipQuestion label={roomSizeLabel} Icon={Maximize2} options={safeRoomSize} value={roomSize} onChange={setRoomSize} />,
    },
    {
      answered: people !== null,
      content: <ChipQuestion label={peopleLabel} Icon={Users} options={safePeople} value={people} onChange={setPeople} />,
    },
    {
      answered: light !== null,
      content: <ChipQuestion label={lightLabel} Icon={Sun} options={safeLight} value={light} onChange={setLight} />,
    },
    {
      answered: projection !== null,
      content: (
        <ChipQuestion label={projectionLabel} Icon={Projector} options={safeProjection} value={projection} onChange={setProjection} />
      ),
    },
    {
      answered: screen !== null,
      content: <ChipQuestion label={screenLabel} Icon={Tv} options={safeScreen} value={screen} onChange={setScreen} />,
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
    setSpace(null)
    setRoomSize(null)
    setPeople(null)
    setLight(null)
    setProjection(null)
    setScreen(null)
    setStep(0)
    setSubmitted(false)
  }

  const result = (() => {
    if (!submitted) return null

    const spaceText = safeSpace[space as number]?.text
    const roomSizeText = safeRoomSize[roomSize as number]?.text
    const peopleText = safePeople[people as number]?.text
    const lightText = safeLight[light as number]?.text
    const projectionText = safeProjection[projection as number]?.text
    const screenText = safeScreen[screen as number]?.text

    const label = projectorLabel(spaceText, roomSizeText, peopleText, lightText, projectionText)
    const needsScreen = (screenText || '').toLowerCase().includes('need recommendation')

    return { label, spaceText, peopleText, lightText, needsScreen }
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
                  <EstimatorResultPanel eyebrow="Recommended Projector" headline={result.label}>
                    For {article(result.spaceText)} {result.spaceText?.toLowerCase()} with {result.peopleText?.toLowerCase()}{' '}
                    people and {result.lightText?.toLowerCase()} ambient light, a {result.label.toLowerCase()} is a strong
                    fit.{' '}
                    {result.needsScreen
                      ? "We'll also recommend the right screen size for your room."
                      : "We'll match the projector to your existing screen setup."}
                  </EstimatorResultPanel>
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
