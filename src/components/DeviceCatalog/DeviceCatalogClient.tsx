'use client'

import React, { useMemo, useState } from 'react'
import type { Device } from '@/payload-types'
import { DeviceCartProvider, useDeviceCart } from '@/providers/DeviceCart'
import { DeviceCard } from './DeviceCard'
import { CartDrawer } from './CartDrawer'
import { EnquiryModal } from './EnquiryModal'

const ROOM_SIZE_ORDER = ['Huddle', 'Small/Medium', 'Large']

function CartFloatingButton() {
  const { items, openCart } = useDeviceCart()
  if (items.length === 0) return null

  return (
    <button
      onClick={openCart}
      aria-label="Open quote cart"
      className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-primary_red px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
    >
      Quote Cart
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary_red">
        {items.length}
      </span>
    </button>
  )
}

function DeviceCatalogInner({
  devices,
  title,
  subtitle,
}: {
  devices: Device[]
  title: string
  subtitle: string
}) {
  const [enquiringDevice, setEnquiringDevice] = useState<Device | null>(null)

  const groups = useMemo(() => {
    return ROOM_SIZE_ORDER.map((size) => ({
      size,
      devices: devices.filter((d) => d.roomSize === size),
    })).filter((g) => g.devices.length > 0)
  }, [devices])

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary_red">
          Video Conferencing Devices
        </span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-gray-600">{subtitle}</p>
      </div>

      {groups.length === 0 ? (
        <p className="mt-10 text-sm text-gray-500">No devices available yet.</p>
      ) : (
        groups.map((group) => (
          <div key={group.size} className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-foreground">{group.size} Rooms</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.devices.map((device) => (
                <DeviceCard key={device.id} device={device} onEnquireNow={setEnquiringDevice} />
              ))}
            </div>
          </div>
        ))
      )}

      <CartFloatingButton />
      <CartDrawer />
      {enquiringDevice && (
        <EnquiryModal
          deviceNames={[enquiringDevice.title]}
          onClose={() => setEnquiringDevice(null)}
        />
      )}
    </div>
  )
}

export function DeviceCatalogClient({
  devices,
  title,
  subtitle,
}: {
  devices: Device[]
  title: string
  subtitle: string
}) {
  return (
    <DeviceCartProvider>
      <DeviceCatalogInner devices={devices} title={title} subtitle={subtitle} />
    </DeviceCartProvider>
  )
}
