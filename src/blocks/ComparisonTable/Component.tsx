import type { ComparisonTableBlock as ComparisonTableBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & ComparisonTableBlockProps

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 flex-none">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export const ComparisonTableBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  leftLabel,
  rightLabel,
  rows = [],
}) => {
  if (!rows || rows.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-2">
            <div className="border-b border-r border-border bg-gray-50/80 px-5 py-3 text-sm font-semibold text-gray-500">
              {leftLabel}
            </div>
            <div className="border-b border-border bg-[#FDEBEC] px-5 py-3 text-sm font-semibold text-primary_red">
              {rightLabel}
            </div>
          </div>
          {rows.map((row, index) => (
            <div key={row.id || index} className={cn('grid grid-cols-2', index % 2 === 1 && 'bg-gray-50/40')}>
              <div className="flex items-start gap-2.5 border-r border-t border-border px-5 py-4 text-sm text-gray-500">
                <span className="mt-0.5 text-gray-400">
                  <XIcon />
                </span>
                {row.left}
              </div>
              <div className="flex items-start gap-2.5 border-t border-border px-5 py-4 text-sm font-medium text-foreground">
                <span className="mt-0.5 text-green-600">
                  <CheckIcon />
                </span>
                {row.right}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
