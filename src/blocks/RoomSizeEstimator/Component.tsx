'use client'

import type { RoomSizeEstimatorBlock as RoomSizeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'

type Props = {
  className?: string
} & RoomSizeEstimatorBlockProps

export const RoomSizeEstimatorBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  participantsLabel,
  tiers = [],
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const [participants, setParticipants] = useState<number | ''>('')
  // Separate from `participants` so the recommendation only appears once the
  // visitor clicks "Get Your Recommended Setup" - typing alone no longer
  // reveals it live.
  const [submittedCount, setSubmittedCount] = useState<number | null>(null)

  const result = (() => {
    if (!tiers || tiers.length === 0 || submittedCount === null) return null
    const match = tiers.find((tier) => tier.maxParticipants == null || submittedCount <= tier.maxParticipants)
    return match || tiers[tiers.length - 1]
  })()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (participants === '') return
    setSubmittedCount(participants)
  }

  if (!tiers || tiers.length === 0) return null

  const fieldClassName =
    'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red'

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
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                {participantsLabel}
              </label>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                placeholder="Enter the number of participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value === '' ? '' : Number(e.target.value))}
                className={fieldClassName}
              />
              <Button type="submit" variant="default" className="mt-3 w-full">
                Get Your Recommended Setup
              </Button>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-white p-5 shadow-sm">
              {result ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary_red">
                    {result.roomLabel}
                  </div>
                  <div className="mt-1 text-sm text-foreground">{result.recommendation}</div>
                  {result.url && (
                    <Link
                      href={result.url}
                      className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary_red hover:underline"
                    >
                      View recommended products →
                    </Link>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Enter your participant count and click &ldquo;Get Your Recommended Setup&rdquo; to see a
                  recommended room solution.
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
