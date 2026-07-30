import type { QualificationBlock as QualificationBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & QualificationBlockProps

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-none">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22V3" />
    </svg>
  )
}

export const QualificationBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  leftHeading,
  leftItems = [],
  rightHeading,
  rightItems = [],
}) => {
  if ((!leftItems || leftItems.length === 0) && (!rightItems || rightItems.length === 0)) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{leftHeading}</h3>
            <ul className="space-y-3">
              {(leftItems || []).map((item, index) => (
                <li key={item.id || index} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-green-600">
                    <CheckIcon />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{rightHeading}</h3>
            <ul className="space-y-3">
              {(rightItems || []).map((item, index) => (
                <li key={item.id || index} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-primary_red">
                    <FlagIcon />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
