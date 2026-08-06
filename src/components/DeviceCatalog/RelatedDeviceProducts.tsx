'use client'

import React, { useState } from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'
import { DeviceCard } from './DeviceCard'

export function RelatedDeviceProducts({
  devices,
  moreDevices,
}: {
  devices: Device[]
  moreDevices: Device[]
}) {
  const [showMore, setShowMore] = useState(false)

  if (devices.length === 0) return null

  const canShowMore = moreDevices.length > devices.length
  const visibleDevices = showMore ? moreDevices : devices

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>MORE BRANDS</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Our More Other Brand Video Conferencing Products
          </h2>
        </Reveal>

        <Reveal
          delayMs={100}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {visibleDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </Reveal>

        {canShowMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowMore((v) => !v)}
              className="flex items-center gap-2 rounded bg-primary_red px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary_red/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {showMore ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
