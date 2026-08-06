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
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-gray-50">
        {device.image && typeof device.image === 'object' ? (
          <Media resource={device.image} fill size="(max-width: 640px) 50vw, 220px" imgClassName="object-contain p-3" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {device.brand}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-primary_red">
          {device.brand}
          {device.roomSize ? ` · ${device.roomSize}` : ''}
        </span>
        <h3 className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{device.title}</h3>

        <div className="mt-2.5 flex gap-1.5">
          <Button
            variant={inCart ? 'outline' : 'default'}
            size="sm"
            className="flex-1 px-2 text-xs"
            onClick={() => (inCart ? removeItem(device.id) : addItem({ id: device.id, title: device.title, brand: device.brand }))}
          >
            {inCart ? 'Added' : 'Add to Cart'}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 px-2 text-xs" asChild>
            <Link href={`/service/device/${device.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
