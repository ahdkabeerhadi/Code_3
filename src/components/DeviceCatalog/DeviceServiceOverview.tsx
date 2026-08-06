import React from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'

export function DeviceServiceOverview({ device }: { device: Device }) {
  return (
    <section className="bg-white pt-2 pb-8 md:pt-3 md:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <span className="inline-block w-max rounded-full border border-secondary_red bg-primary_red px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white">
            OVERVIEW
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            About the {device.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            The {device.title} is a {device.brand} video conferencing device built for{' '}
            {device.roomSize?.toLowerCase()} rooms. CODE3 Technologies supplies, installs, and supports
            genuine {device.brand} hardware across Dubai and the UAE, backed by our certified AV
            engineers and ongoing maintenance and support.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
