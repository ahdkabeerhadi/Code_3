'use client'

import type { DowntimeEstimatorBlock as DowntimeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  Flag,
  Laptop,
  MapPin,
  Presentation,
  Server,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

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

function ChipField({
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
              'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              value === i
                ? 'border-primary_red bg-primary_red text-white'
                : 'border-border bg-white text-gray-700 hover:border-primary_red/40 hover:text-primary_red',
            )}
          >
            {value === i && <Check className="h-3 w-3" />}
            {opt.text}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-primary_red">Please select an option.</p>}
    </div>
  )
}

function NumberField({
  label,
  Icon,
  placeholder,
  value,
  onChange,
  error,
}: {
  label?: string | null
  Icon: LucideIcon
  placeholder: string
  value: number | ''
  onChange: (value: number | '') => void
  error?: boolean
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 flex-none text-primary_red" />
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>
      </div>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red"
      />
      {error && <p className="mt-1 text-xs text-primary_red">Required.</p>}
    </div>
  )
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

        <Reveal delayMs={100} className="overflow-hidden rounded-2xl border border-border bg-gray-50/60">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
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

              <ChipField
                label={floorsLabel}
                Icon={Building2}
                options={safeFloors}
                value={floors}
                onChange={setFloors}
                error={attempted && floors === null}
              />

              <div className="grid grid-cols-2 gap-3.5">
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

              <ChipField
                label={currentLocationLabel}
                Icon={MapPin}
                options={safeCurrent}
                value={currentLocation}
                onChange={setCurrentLocation}
                error={attempted && currentLocation === null}
              />

              <ChipField
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
                    Estimated Move Complexity
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.label}</div>
                  {disclaimer && <p className="mt-3 text-sm text-gray-500">{disclaimer}</p>}
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Fill in the details and click &ldquo;{submitLabel}&rdquo; to see your estimated move complexity.
                </p>
              )}
            </div>
          </form>
        </Reveal>

        {ctaLabel && ctaUrl && (
          <div className="mt-6 flex justify-center">
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary_red px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-secondary_red"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
