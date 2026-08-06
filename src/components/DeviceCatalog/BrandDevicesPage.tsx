import type { Metadata } from 'next'
import React from 'react'
import type { Device } from '@/payload-types'
import { getCachedBrandDevices } from './getBrandDevices'
import { DeviceCatalogClient } from './DeviceCatalogClient'
import { SetLightHeader } from './SetLightHeader'

export async function BrandDevicesPageContent({ brand }: { brand: Device['brand'] }) {
  const devices = await getCachedBrandDevices(brand)

  return (
    <article className="relative pt-8">
      <SetLightHeader />
      <DeviceCatalogClient
        devices={devices}
        title={`${brand} Video Conferencing Devices`}
        subtitle={`Genuine ${brand} video conferencing hardware for huddle, small/medium, and large rooms. Add devices to your quote cart or enquire directly for pricing and availability.`}
      />
    </article>
  )
}

export function brandPageMetadata(brand: Device['brand']): Metadata {
  return {
    title: `${brand} Video Conferencing Devices | CODE3`,
    description: `Shop ${brand} video conferencing devices for huddle rooms, small/medium rooms, and large boardrooms. Request a quote or enquire directly.`,
  }
}
