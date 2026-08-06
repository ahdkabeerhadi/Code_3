import React from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'

export function BrandServiceOverview({ brand }: { brand: Device['brand'] }) {
  return (
    <section className="bg-white pt-2 pb-8 md:pt-3 md:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-block w-max rounded-full border border-secondary_red bg-primary_red px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white">
            OVERVIEW
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            About {brand} Video Conferencing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            CODE3 Technologies supplies, installs, and supports genuine {brand} video conferencing
            hardware across Dubai and the UAE - from compact huddle-room devices to enterprise-grade
            boardroom systems. Every deployment is backed by our certified AV engineers and ongoing
            maintenance and support.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
