'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

export interface ServicePageData {
  id: string
  slug: string
  title: string
}

export function FooterServicesGrid({
  parents,
  subsByParent,
}: {
  parents: ServicePageData[]
  subsByParent: Record<string, ServicePageData[]>
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-6">
      {parents.map((parent) => {
        const subs = subsByParent[parent.id] || []
        const isOpen = openId === parent.id

        return (
          <div
            key={parent.id}
            className="relative"
            onMouseEnter={() => subs.length > 0 && setOpenId(parent.id)}
            onMouseLeave={() => setOpenId((cur) => (cur === parent.id ? null : cur))}
          >
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/service/${parent.slug}`}
                className="text-sm font-semibold text-white hover:underline"
              >
                {parent.title}
              </Link>
              {subs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOpenId((cur) => (cur === parent.id ? null : parent.id))}
                  aria-label={`Show ${parent.title} sub-services`}
                  aria-expanded={isOpen}
                  className="flex-none text-white/70 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>

            {subs.length > 0 && isOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-64 max-w-[80vw] rounded-lg border border-white/20 bg-primary_red p-3 shadow-lg">
                <ul className="max-h-72 space-y-2 overflow-y-auto">
                  {subs.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/service/${sub.slug}`}
                        className="block text-xs text-white/80 hover:text-white hover:underline transition-colors"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
