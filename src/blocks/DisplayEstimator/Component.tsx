'use client'

import type { DisplayEstimatorBlock as DisplayEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ChipQuestion } from '@/components/site/estimator/ChipQuestion'
import { EstimatorResultPanel } from '@/components/site/estimator/ResultPanel'
import { EstimatorCard, EstimatorFooter, estimatorFormClassName, estimatorQuestionsClassName } from '@/components/site/estimator/Shell'
import { ArrowRight, MapPin, Users, Video } from 'lucide-react'

// Maps a "Number of Users" option index to a recommended screen-size tier
// index within sizeTiers (0-based, smallest to largest). Kept in code as a
// best-effort default since there's no explicit screen-size question anymore.
const USERS_TO_SIZE_TIER = [0, 1, 1, 2]

type Props = {
  className?: string
} & DisplayEstimatorBlockProps

export const DisplayEstimatorBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  locationLabel,
  locationOptions = [],
  usersLabel,
  usersOptions = [],
  sizeTiers = [],
  vcLabel,
  vcOptions = [],
  submitLabel,
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeLocation = locationOptions || []
  const safeUsers = usersOptions || []
  const safeSizeTiers = sizeTiers || []
  const safeVc = vcOptions || []

  const [location, setLocation] = useState<number | null>(null)
  const [users, setUsers] = useState<number | null>(null)
  const [vc, setVc] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (safeLocation.length === 0 || safeUsers.length === 0 || safeSizeTiers.length === 0 || safeVc.length === 0) {
    return null
  }

  const allAnswered = location !== null && users !== null && vc !== null

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

    const wantsVc = (safeVc[vc as number]?.text || '').toLowerCase().includes('yes')
    const tierIndex = Math.min(USERS_TO_SIZE_TIER[users as number] ?? 0, safeSizeTiers.length - 1)

    return {
      size: safeSizeTiers[tierIndex]?.text,
      locationText: safeLocation[location as number]?.text,
      usersText: safeUsers[users as number]?.text,
      wantsVc,
    }
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
                <ChipQuestion
                  label={usersLabel}
                  Icon={Users}
                  options={safeUsers}
                  value={users}
                  onChange={setUsers}
                  error={attempted && users === null}
                />
                <ChipQuestion
                  label={vcLabel}
                  Icon={Video}
                  options={safeVc}
                  value={vc}
                  onChange={setVc}
                  error={attempted && vc === null}
                />

                <Button type="submit" variant="default" className="group w-full">
                  {submitLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>

              <EstimatorResultPanel
                hasResult={Boolean(result)}
                eyebrow="Recommended Display Size"
                headline={result?.size}
                emptyText={<>Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended display size.</>}
              >
                {result && (
                  <>
                    For a {result.locationText?.toLowerCase()} with {result.usersText} people, this size keeps the
                    screen clearly visible from every seat.
                    {result.wantsVc && " We'll include an integrated camera and audio setup for seamless video conferencing."}
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
