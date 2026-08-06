import React from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'
import { DeviceCard } from './DeviceCard'

export function RelatedDeviceProducts({ devices, brand }: { devices: Device[]; brand: string }) {
  if (devices.length === 0) return null

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>MORE PRODUCTS</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Video Conferencing Device Products
          </h2>
          <p className="mt-3 text-gray-600">More {brand} video conferencing devices you might need.</p>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
