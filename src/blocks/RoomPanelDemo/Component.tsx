'use client'

import type { RoomPanelDemoBlock as RoomPanelDemoBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & RoomPanelDemoBlockProps

const TONE_STYLES: Record<string, { panel: string; chipActive: string; chipDot: string }> = {
  green: { panel: 'bg-emerald-600', chipActive: 'border-emerald-600 bg-emerald-600 text-white', chipDot: 'bg-emerald-600' },
  red: { panel: 'bg-primary_red', chipActive: 'border-primary_red bg-primary_red text-white', chipDot: 'bg-primary_red' },
  amber: { panel: 'bg-amber-500', chipActive: 'border-amber-500 bg-amber-500 text-white', chipDot: 'bg-amber-500' },
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 flex-none">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

export const RoomPanelDemoBlock: React.FC<Props> = ({ badge, className, title, subtitle, roomName, hint, states = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!states || states.length === 0) return null

  const active = states[Math.min(activeIndex, states.length - 1)]
  const tone = TONE_STYLES[active.tone || 'green']

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,360px)_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            <div className={cn('px-5 py-5 text-white transition-colors duration-300', tone.panel)}>
              <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{roomName}</div>
              <div className="mt-1 text-2xl font-bold">{active.label}</div>
              <div className="mt-1 text-sm opacity-90">{active.statusText}</div>
            </div>
            <div className="bg-white p-5">
              <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
                <ClockIcon />
                Live Preview
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{active.description}</p>
            </div>
          </div>

          <div>
            {hint && <p className="mb-3 text-sm text-gray-500">{hint}</p>}
            <div className="flex flex-wrap gap-2">
              {states.map((s, index) => {
                const isActive = index === activeIndex
                const stateTone = TONE_STYLES[s.tone || 'green']
                return (
                  <button
                    key={s.id || index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                      isActive ? stateTone.chipActive : 'border-border text-gray-600 hover:border-primary_red/40',
                    )}
                  >
                    {!isActive && <span className={cn('h-2 w-2 rounded-full', stateTone.chipDot)} />}
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
