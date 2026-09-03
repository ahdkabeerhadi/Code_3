'use client'

import type { RoomSizeEstimatorBlock as RoomSizeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, StartOverButton, estimatorBodyClassName } from '@/components/site/estimator/Shell'
import { Users } from 'lucide-react'

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
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  const [participants, setParticipants] = useState<number | ''>('')
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

  const handleStartOver = () => {
    setParticipants('')
    setSubmittedCount(null)
  }

  if (!tiers || tiers.length === 0) return null

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
                  <EstimatorResultPanel eyebrow="Recommended Setup" headline={result.roomLabel}>
                    <p>{result.recommendation}</p>
                    {result.url && (
                      <Link
                        href={result.url}
                        className="mx-auto mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary_red hover:underline"
                      >
                        View recommended products →
                      </Link>
                    )}
                  </EstimatorResultPanel>
                  <StartOverButton onClick={handleStartOver} />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red">
                      <Users className="h-5 w-5" />
                    </span>
                    <label className="text-base font-semibold text-foreground">{participantsLabel}</label>
                  </div>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Enter the number of participants"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red"
                  />
                  <Button type="submit" variant="default" className="mt-5 w-full">
                    Get Your Recommended Setup
                  </Button>
                </form>
              )}
            </div>

            <EstimatorFooter disclaimer={disclaimer} ctaText={ctaText} ctaLabel={ctaLabel} ctaUrl={ctaUrl} />
          </EstimatorCard>
        </Reveal>
      </div>
    </section>
  )
}
