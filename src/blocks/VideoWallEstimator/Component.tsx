'use client'

import type { VideoWallEstimatorBlock as VideoWallEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Check,
  LayoutTemplate,
  MapPin,
  Monitor,
  Ruler,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

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

        <Reveal
          delayMs={100}
          className="overflow-hidden rounded-2xl border border-border bg-gray-50/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_45px_-20px_rgba(0,0,0,0.15)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary_red via-red-400 to-primary_red" />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-7">
            <div className="space-y-3.5">
              <ChipQuestion
                label={locationLabel}
                Icon={MapPin}
                options={safeLocation}
                value={location}
                onChange={setLocation}
                error={attempted && location === null}
              />

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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
                    Recommended Technology
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.label}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    For a {result.locationText?.toLowerCase()} showing {result.contentTypeText?.toLowerCase()} across{' '}
                    {result.displaysText?.toLowerCase()} displays, a {result.label} setup is a strong fit.
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended video wall
                  technology.
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
