import type { ScopeChecklistBlock as ScopeChecklistBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & ScopeChecklistBlockProps

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export const ScopeChecklistBlock: React.FC<Props> = ({ badge, className, title, subtitle, items = [], note }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-gray-50/60 px-4 py-3"
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#FDEBEC] text-primary_red">
                <CheckIcon />
              </span>
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </div>
          ))}
        </Reveal>

        {note && <p className="mt-5 text-sm text-gray-500">{note}</p>}
      </div>
    </section>
  )
}
