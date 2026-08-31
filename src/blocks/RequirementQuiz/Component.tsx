'use client'

import type { RequirementQuizBlock as RequirementQuizBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, CircleDot, Headset, Layers, MapPin, Sparkles, Users, type LucideIcon } from 'lucide-react'

// Best-effort icon per question, matched by keyword so this stays sensible
// for any future question set, not just the 4 this was built for.
function getQuestionIcon(label?: string | null): LucideIcon {
  const l = (label || '').toLowerCase()
  if (l.includes('employee') || l.includes('staff') || l.includes('team') || l.includes('participant')) return Users
  if (l.includes('location') || l.includes('site') || l.includes('branch')) return MapPin
  if (l.includes('support')) return Headset
  if (l.includes('environment') || l.includes('infrastructure')) return Layers
  return CircleDot
}

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
    <section className={cn('bg-white py-6 md:py-7', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-4">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal
          delayMs={100}
          className="overflow-hidden rounded-2xl border border-border bg-gray-50/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_45px_-20px_rgba(0,0,0,0.15)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary_red via-red-400 to-primary_red" />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-5">
            <div className="space-y-3">
              {safeQuestions.map((question, qIndex) => {
                const QuestionIcon = getQuestionIcon(question.label)
                return (
                  <div key={question.id || qIndex}>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary_red/10 text-primary_red">
                        <QuestionIcon className="h-3 w-3" />
                      </span>
                      <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {question.label}
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(question.options || []).map((option, oIndex) => {
                        const isSelected = answers[qIndex] === oIndex
                        return (
                          <button
                            key={option.id || oIndex}
                            type="button"
                            onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))}
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                              isSelected
                                ? 'border-primary_red bg-primary_red text-white shadow-[0_4px_12px_-2px_rgba(201,14,29,0.45)]'
                                : 'border-border bg-white text-gray-700 hover:-translate-y-0.5 hover:border-primary_red/40 hover:text-primary_red hover:shadow-sm',
                            )}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                            {option.text}
                          </button>
                        )
                      })}
                    </div>
                    {attempted && answers[qIndex] === undefined && (
                      <p className="mt-1 text-xs text-primary_red">Please select an option.</p>
                    )}
                  </div>
                )
              })}

              <Button type="submit" variant="default" className="group w-full">
                {submitLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <div
              className={cn(
                'flex flex-col justify-center rounded-xl p-6 transition-all duration-300',
                result
                  ? 'border border-primary_red/15 bg-gradient-to-b from-primary_red/[0.06] to-white shadow-sm'
                  : 'bg-white shadow-sm',
              )}
            >
              {result ? (
                <>
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary_red/10 text-primary_red">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary_red">
                    Recommended For You
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.tierName}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{result.description}</p>
                  {result.url && (
                    <Link
                      href={result.url}
                      className="group/link mt-4 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary_red hover:underline"
                    >
                      View plan details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
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
