import React from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'
import { DeviceCard } from './DeviceCard'

const ROOM_SIZE_ORDER = ['Huddle', 'Small/Medium', 'Large']

// Assumes it's rendered within an ambient DeviceCartProvider from a parent
// page - no provider/floating-cart-button here, so it can be reused inside
// pages that already provide their own (brand pages, device detail pages).
export function DeviceGroupedGrid({ devices }: { devices: Device[] }) {
  const groups = ROOM_SIZE_ORDER.map((size) => ({
    size,
    devices: devices.filter((d) => d.roomSize === size),
  })).filter((g) => g.devices.length > 0)

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>MORE PRODUCTS</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Video Conferencing Device Products
          </h2>
        </Reveal>

        {groups.length === 0 ? (
          <p className="text-sm text-gray-500">No devices available yet.</p>
        ) : (
          groups.map((group) => (
            <div key={group.size} className="mt-8 first:mt-0">
              <h3 className="mb-4 text-lg font-semibold text-foreground">{group.size} Rooms</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.devices.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
