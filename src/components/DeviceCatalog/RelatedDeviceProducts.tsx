import React from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'
import { DeviceCard } from './DeviceCard'

export function RelatedDeviceProducts({ devices }: { devices: Device[] }) {
  if (devices.length === 0) return null

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>MORE BRANDS</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Our More Other Brand Video Conferencing Products
          </h2>
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
