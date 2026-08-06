'use client'

import React from 'react'
import type { Device } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { useDeviceCart } from '@/providers/DeviceCart'

export function DeviceCard({
  device,
  onEnquireNow,
}: {
  device: Device
  onEnquireNow: (device: Device) => void
}) {
  const { addItem, removeItem, isInCart } = useDeviceCart()
  const inCart = isInCart(device.id)

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full bg-gray-50">
        {device.image && typeof device.image === 'object' ? (
          <Media resource={device.image} fill size="(max-width: 640px) 100vw, 320px" imgClassName="object-contain p-6" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wider text-gray-400">
            {device.brand}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary_red">
          {device.brand}
          {device.category ? ` · ${device.category}` : ''}
        </span>
        <h3 className="mt-1 text-base font-semibold text-foreground">{device.title}</h3>
        {device.shortDescription && (
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{device.shortDescription}</p>
        )}

        {device.specs && device.specs.length > 0 && (
          <ul className="mt-3 space-y-1">
            {device.specs.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500">
                <span className="mt-1 h-1 w-1 flex-none rounded-full bg-gray-400" />
                {s.spec}
              </li>
            ))}
          </ul>
        )}

        {device.priceLabel && (
          <p className="mt-3 text-sm font-semibold text-foreground">{device.priceLabel}</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Button
            variant={inCart ? 'outline' : 'default'}
            size="sm"
            onClick={() => (inCart ? removeItem(device.id) : addItem({ id: device.id, title: device.title, brand: device.brand }))}
          >
            {inCart ? 'Added to Quote' : 'Add to Quote Cart'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEnquireNow(device)}>
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  )
}
