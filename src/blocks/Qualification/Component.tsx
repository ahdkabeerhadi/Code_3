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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 flex-none">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22V3" />
    </svg>
  )
}

const toneStyles = {
  positive: {
    card: 'border-green-200 bg-green-50/60',
    badge: 'bg-green-500',
    Icon: CheckIcon,
  },
  negative: {
    card: 'border-red-200 bg-[#FDEBEC]',
    badge: 'bg-primary_red',
    Icon: FlagIcon,
  },
} as const

function QualificationColumn({
  heading,
  tone,
  items,
}: {
  heading?: string | null
  tone: 'positive' | 'negative'
  items: { text: string; id?: string | null }[]
}) {
  const styles = toneStyles[tone]
  const { Icon } = styles

  return (
    <div className={cn('rounded-2xl border-2 p-6 md:p-7', styles.card)}>
      <div className="mb-5 flex items-center gap-3">
        <span className={cn('flex h-10 w-10 flex-none items-center justify-center rounded-full text-white', styles.badge)}>
          <Icon />
        </span>
        <h3 className="text-lg font-bold text-foreground">{heading}</h3>
      </div>
      <ul className="space-y-3.5">
        {items.map((item, index) => (
          <li key={item.id || index} className="flex items-start gap-3 text-sm text-gray-700">
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-white',
                styles.badge,
              )}
            >
              <Icon />
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const QualificationBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  leftHeading,
  leftTone,
  leftItems = [],
  rightHeading,
  rightTone,
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
          <QualificationColumn heading={leftHeading} tone={leftTone || 'positive'} items={leftItems || []} />
          <QualificationColumn heading={rightHeading} tone={rightTone || 'negative'} items={rightItems || []} />
        </Reveal>
      </div>
    </section>
  )
}
