'use client'

import type { RequirementQuizBlock as RequirementQuizBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'

type Props = {
  className?: string
} & RequirementQuizBlockProps

export const RequirementQuizBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  questions = [],
  submitLabel,
  resultTiers = [],
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeQuestions = questions || []
  const safeTiers = resultTiers || []

  // answers[questionIndex] = selected option index within that question
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, number> | null>(null)
  const [attempted, setAttempted] = useState(false)

  if (safeQuestions.length === 0 || safeTiers.length === 0) return null

  const allAnswered = safeQuestions.every((_, i) => answers[i] !== undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allAnswered) {
      setAttempted(true)
      return
    }
    setSubmittedAnswers(answers)
  }

  const result = (() => {
    if (!submittedAnswers) return null
    const score = safeQuestions.reduce((sum, _, i) => sum + (submittedAnswers[i] ?? 0), 0)
    const match = safeTiers.find((tier) => score >= tier.minScore && score <= tier.maxScore)
    // Fall back to the highest tier if the score exceeds every configured
    // range (e.g. admin added an option without extending the top range).
    return match || safeTiers[safeTiers.length - 1]
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-6">
              {safeQuestions.map((question, qIndex) => (
                <div key={question.id || qIndex}>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {question.label}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(question.options || []).map((option, oIndex) => {
                      const isSelected = answers[qIndex] === oIndex
                      return (
                        <button
                          key={option.id || oIndex}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))}
                          className={cn(
                            'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                            isSelected
                              ? 'border-primary_red bg-primary_red text-white'
                              : 'border-border bg-white text-gray-700 hover:border-primary_red/40 hover:text-primary_red',
                          )}
                        >
                          {option.text}
                        </button>
                      )
                    })}
                  </div>
                  {attempted && answers[qIndex] === undefined && (
                    <p className="mt-1.5 text-xs text-primary_red">Please select an option.</p>
                  )}
                </div>
              ))}

              <Button type="submit" variant="default" className="w-full">
                {submitLabel}
              </Button>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-white p-5 shadow-sm">
              {result ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary_red">
                    Recommended
                  </div>
                  <div className="mt-1 text-lg font-bold text-foreground">{result.tierName}</div>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{result.description}</p>
                  {result.url && (
                    <Link
                      href={result.url}
                      className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary_red hover:underline"
                    >
                      View plan details →
                    </Link>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended service
                  level.
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
