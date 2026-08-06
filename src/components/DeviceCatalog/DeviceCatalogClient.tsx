'use client'

import React, { useMemo, useState } from 'react'
import type { Device } from '@/payload-types'
import { DeviceCartProvider, useDeviceCart } from '@/providers/DeviceCart'
import { DeviceCard } from './DeviceCard'
import { CartDrawer } from './CartDrawer'
import { EnquiryModal } from './EnquiryModal'

const BRAND_ORDER: Device['brand'][] = ['Yealink', 'Logitech', 'Jabra', 'Cisco', 'Poly']

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

function DeviceCatalogInner({ devices }: { devices: Device[] }) {
  const [activeBrand, setActiveBrand] = useState<string>('All')
  const [enquiringDevice, setEnquiringDevice] = useState<Device | null>(null)

  const brands = useMemo(() => {
    const present = new Set(devices.map((d) => d.brand))
    return ['All', ...BRAND_ORDER.filter((b) => present.has(b))]
  }, [devices])

  const filteredDevices = useMemo(
    () => (activeBrand === 'All' ? devices : devices.filter((d) => d.brand === activeBrand)),
    [devices, activeBrand],
  )

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary_red">
          Video Conferencing Devices
        </span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Shop Video Conferencing Devices
        </h1>
        <p className="mt-3 text-gray-600">
          Genuine hardware from Yealink, Logitech, Jabra, Cisco, and Poly. Add devices to your quote
          cart or enquire about a single device — our team will follow up with pricing and
          availability.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeBrand === brand
                ? 'border-primary_red bg-primary_red text-white'
                : 'border-border bg-white text-foreground hover:border-primary_red/40'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {filteredDevices.length === 0 ? (
        <p className="mt-10 text-sm text-gray-500">No devices available for this brand yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} onEnquireNow={setEnquiringDevice} />
          ))}
        </div>
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

export function DeviceCatalogClient({ devices }: { devices: Device[] }) {
  return (
    <DeviceCartProvider>
      <DeviceCatalogInner devices={devices} />
    </DeviceCartProvider>
  )
}
