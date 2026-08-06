import type { Metadata } from 'next'
import React from 'react'
import type { Device } from '@/payload-types'
import { DeviceCartProvider } from '@/providers/DeviceCart'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getCachedBrandDevices } from './getBrandDevices'
import { getCachedReusedBlocks } from './getDeviceDetailData'
import { BrandHero } from './BrandHero'
import { BrandServiceOverview } from './BrandServiceOverview'
import { DeviceGroupedGrid } from './DeviceGroupedGrid'
import { CartDrawer } from './CartDrawer'
import { CartFloatingButton } from './CartFloatingButton'
import { SetLightHeader } from './SetLightHeader'

export async function BrandDevicesPageContent({ brand }: { brand: Device['brand'] }) {
  const [devices, reusedBlocks] = await Promise.all([
    getCachedBrandDevices(brand),
    getCachedReusedBlocks(),
  ])

  return (
    <DeviceCartProvider>
      <article className="relative">
        <SetLightHeader />
        <BrandHero brand={brand} />
        <BrandServiceOverview brand={brand} />
        <DeviceGroupedGrid devices={devices} />
        <RenderBlocks blocks={reusedBlocks} />
        <CartFloatingButton />
        <CartDrawer />
      </article>
    </DeviceCartProvider>
  )
}

export function brandPageMetadata(brand: Device['brand']): Metadata {
  return {
    title: `${brand} Video Conferencing Devices | CODE3`,
    description: `Shop ${brand} video conferencing devices for huddle rooms, small/medium rooms, and large boardrooms. Request a quote or enquire directly.`,
  }
}
