import type { RelatedServicesBlock as RelatedServicesBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

type Props = {
  className?: string
} & RelatedServicesBlockProps

export const RelatedServicesBlock: React.FC<Props> = ({ className, title, items = [] }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('bg-gray-50/80 py-8 md:py-10', className)}>
      <div className="container mx-auto flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:gap-8">
        {title && (
          <span className="flex-none text-base font-semibold uppercase tracking-wide text-gray-500 md:text-lg">
            {title}
          </span>
        )}
        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <Link
              key={item.id || index}
              href={item.url}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-base font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary_red/40 hover:text-primary_red hover:shadow-md"
            >
              {item.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="flex-none transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3.333 8h9.334M8.667 3.667L13 8l-4.333 4.333"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
