'use client'

import type { SetupEstimatorBlock as SetupEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Camera,
  Check,
  CheckSquare2,
  CircleDot,
  Cloud,
  KeyRound,
  Mail,
  Monitor,
  Network,
  Presentation,
  Settings2,
  ShieldCheck,
  Sparkles,
  Square,
  Users,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

// Best-effort icon per question, matched by keyword.
function getQuestionIcon(label?: string | null): LucideIcon {
  const l = (label || '').toLowerCase()
  if (l.includes('employee') || l.includes('staff') || l.includes('team')) return Users
  if (l.includes('floor')) return Building2
  if (l.includes('type')) return Briefcase
  if (l.includes('setup') || l.includes('need')) return Settings2
  return CircleDot
}

// Best-effort icon per checklist item, matched by keyword.
function getItemIcon(text?: string | null): LucideIcon {
  const t = (text || '').toLowerCase()
  if (t.includes('wi-fi') || t.includes('wifi')) return Wifi
  if (t.includes('network')) return Network
  if (t.includes('computer')) return Monitor
  if (t.includes('server') || t.includes('cloud')) return Cloud
  if (t.includes('cctv') || t.includes('camera')) return Camera
  if (t.includes('access control')) return KeyRound
  if (t.includes('meeting')) return Presentation
  if (t.includes('365') || t.includes('microsoft')) return Mail
  if (t.includes('security') || t.includes('cyber')) return ShieldCheck
  return CheckSquare2
}

type Props = {
  className?: string
} & SetupEstimatorBlockProps

export const SetupEstimatorBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  questions = [],
  submitLabel,
  sizeTiers = [],
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const safeQuestions = questions || []
  const safeTiers = sizeTiers || []

  // single questions: answers[qIndex] = selected option index
  // multi questions: answers[qIndex] = array of selected option indices
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({})
  const [submitted, setSubmitted] = useState<Record<number, number | number[]> | null>(null)
  const [attempted, setAttempted] = useState(false)

  if (safeQuestions.length === 0 || safeTiers.length === 0) return null

  const isAnswered = (qIndex: number, type?: string | null) => {
    const val = answers[qIndex]
    if (type === 'multi') return Array.isArray(val) && val.length > 0
    return typeof val === 'number'
  }
  const allAnswered = safeQuestions.every((q, i) => isAnswered(i, q.selectionType))

  const selectSingle = (qIndex: number, oIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))
  }
  const toggleMulti = (qIndex: number, oIndex: number) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[qIndex]) ? (prev[qIndex] as number[]) : []
      const next = current.includes(oIndex) ? current.filter((v) => v !== oIndex) : [...current, oIndex]
      return { ...prev, [qIndex]: next }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allAnswered) {
      setAttempted(true)
      return
    }
    setSubmitted(answers)
  }

  const result = (() => {
    if (!submitted) return null
    const score = safeQuestions.reduce((sum, q, i) => {
      if (q.selectionType !== 'single') return sum
      const v = submitted[i]
      return sum + (typeof v === 'number' ? v : 0)
    }, 0)
    const tier = safeTiers.find((t) => score >= t.minScore && score <= t.maxScore) || safeTiers[safeTiers.length - 1]

    const selectedItems = safeQuestions.flatMap((q, i) => {
      if (q.selectionType !== 'multi') return []
      const picked = Array.isArray(submitted[i]) ? (submitted[i] as number[]) : []
      return picked.map((oIndex) => q.options?.[oIndex]?.text).filter(Boolean) as string[]
    })

    return { tier, selectedItems }
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
            <div className="space-y-4">
              {safeQuestions.map((question, qIndex) => {
                const QuestionIcon = getQuestionIcon(question.label)
                const isMulti = question.selectionType === 'multi'
                return (
                  <div key={question.id || qIndex}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary_red/10 text-primary_red">
                        <QuestionIcon className="h-3.5 w-3.5" />
                      </span>
                      <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {question.label}
                        {isMulti && <span className="ml-1.5 normal-case text-gray-400">(select all that apply)</span>}
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(question.options || []).map((option, oIndex) => {
                        const isSelected = isMulti
                          ? Array.isArray(answers[qIndex]) && (answers[qIndex] as number[]).includes(oIndex)
                          : answers[qIndex] === oIndex
                        const ItemIcon = isMulti ? getItemIcon(option.text) : null
                        return (
                          <button
                            key={option.id || oIndex}
                            type="button"
                            onClick={() =>
                              isMulti ? toggleMulti(qIndex, oIndex) : selectSingle(qIndex, oIndex)
                            }
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200',
                              isSelected
                                ? 'border-primary_red bg-primary_red text-white shadow-[0_4px_12px_-2px_rgba(201,14,29,0.45)]'
                                : 'border-border bg-white text-gray-700 hover:-translate-y-0.5 hover:border-primary_red/40 hover:text-primary_red hover:shadow-sm',
                            )}
                          >
                            {isMulti ? (
                              isSelected ? (
                                <CheckSquare2 className="h-3.5 w-3.5 flex-none" />
                              ) : (
                                <Square className="h-3.5 w-3.5 flex-none" />
                              )
                            ) : (
                              isSelected && <Check className="h-3.5 w-3.5 flex-none" />
                            )}
                            {ItemIcon && !isSelected && <ItemIcon className="h-3.5 w-3.5 flex-none text-primary_red/70" />}
                            {option.text}
                          </button>
                        )
                      })}
                    </div>
                    {attempted && !isAnswered(qIndex, question.selectionType) && (
                      <p className="mt-1.5 text-xs text-primary_red">
                        {isMulti ? 'Select at least one option.' : 'Please select an option.'}
                      </p>
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
                    Recommended Scope
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{result.tier.tierName}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{result.tier.description}</p>

                  {result.selectedItems.length > 0 && (
                    <div className="mt-4 border-t border-border/70 pt-4">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Your setup will include
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {result.selectedItems.map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border"
                          >
                            <Check className="h-3 w-3 flex-none text-primary_red" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Answer the questions and click &ldquo;{submitLabel}&rdquo; to see your recommended setup scope.
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
