'use client'

import React from 'react'
import Link from 'next/link'
import type { Device } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { useDeviceCart } from '@/providers/DeviceCart'

export function DeviceCard({ device }: { device: Device }) {
  const { addItem, removeItem, isInCart } = useDeviceCart()
  const inCart = isInCart(device.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-lg">
      <div className="relative aspect-[1/1] w-full bg-gray-50">
        {device.image && typeof device.image === 'object' ? (
          <Media resource={device.image} fill size="(max-width: 640px) 50vw, 260px" imgClassName="object-contain p-4" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {device.brand}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary_red">
          {device.brand}
          {device.roomSize ? ` · ${device.roomSize}` : ''}
        </span>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground">{device.title}</h3>

        <div className="mt-3 flex gap-1.5">
          <Button
            variant={inCart ? 'outline' : 'default'}
            size="sm"
            className="flex-1 rounded-full px-2 text-xs"
            onClick={() => (inCart ? removeItem(device.id) : addItem({ id: device.id, title: device.title, brand: device.brand }))}
          >
            {inCart ? 'Added' : 'Add to Cart'}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 rounded-full px-2 text-xs" asChild>
            <Link href={`/service/device/${device.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
