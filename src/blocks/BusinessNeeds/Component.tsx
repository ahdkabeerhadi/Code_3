import type { BusinessNeedsBlock as BusinessNeedsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & BusinessNeedsBlockProps

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 flex-none transition-transform duration-300 group-hover:translate-x-1">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export const BusinessNeedsBlock: React.FC<Props> = ({ badge, className, title, subtitle, items = [] }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow className="text-base md:text-lg">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Link
              key={item.id || index}
              href={item.url}
              className="group flex flex-col rounded-2xl border border-border bg-gray-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary_red/30 hover:bg-white hover:shadow-lg"
            >
              <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary_red">
                {item.linkLabel}
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
