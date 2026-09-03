'use client'

import type { ProjectorEstimatorBlock as ProjectorEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Check,
  MapPin,
  Maximize2,
  Projector,
  Sparkles,
  Sun,
  Tv,
  Users,
  type LucideIcon,
} from 'lucide-react'

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
  const [attempted, setAttempted] = useState(false)
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

  const allAnswered =
    space !== null && roomSize !== null && people !== null && light !== null && projection !== null && screen !== null

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

        <Reveal
          delayMs={100}
          className="overflow-hidden rounded-2xl border border-border bg-gray-50/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_45px_-20px_rgba(0,0,0,0.15)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary_red via-red-400 to-primary_red" />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-7">
            <div className="space-y-3.5">
              <ChipQuestion
                label={spaceLabel}
                Icon={MapPin}
                options={safeSpace}
                value={space}
                onChange={setSpace}
                error={attempted && space === null}
              />

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <ChipQuestion
                  label={roomSizeLabel}
                  Icon={Maximize2}
                  options={safeRoomSize}
                  value={roomSize}
                  onChange={setRoomSize}
                  error={attempted && roomSize === null}
                />
                <ChipQuestion
                  label={peopleLabel}
                  Icon={Users}
                  options={safePeople}
                  value={people}
                  onChange={setPeople}
                  error={attempted && people === null}
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <ChipQuestion
                  label={lightLabel}
                  Icon={Sun}
                  options={safeLight}
                  value={light}
                  onChange={setLight}
                  error={attempted && light === null}
                />
                <ChipQuestion
                  label={projectionLabel}
                  Icon={Projector}
                  options={safeProjection}
                  value={projection}
                  onChange={setProjection}
                  error={attempted && projection === null}
                />
              </div>

              <ChipQuestion
                label={screenLabel}
                Icon={Tv}
                options={safeScreen}
                value={screen}
                onChange={setScreen}
                error={attempted && screen === null}
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
                    Recommended Projector
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.label}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    For {article(result.spaceText)} {result.spaceText?.toLowerCase()} with{' '}
                    {result.peopleText?.toLowerCase()} people and{' '}
                    {result.lightText?.toLowerCase()} ambient light, a {result.label.toLowerCase()} is a strong fit.{' '}
                    {result.needsScreen
                      ? "We'll also recommend the right screen size for your room."
                      : "We'll match the projector to your existing screen setup."}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended projector.
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
