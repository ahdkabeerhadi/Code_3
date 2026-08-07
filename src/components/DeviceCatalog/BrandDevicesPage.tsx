import type { Metadata } from 'next'
import React from 'react'
import type { BrandDevicePage, Device } from '@/payload-types'
import { DeviceCartProvider } from '@/providers/DeviceCart'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedBrandDevices } from './getBrandDevices'
import { getCachedReusedBlocks } from './getDeviceDetailData'
import { BrandHero } from './BrandHero'
import { DeviceGroupedGrid } from './DeviceGroupedGrid'
import { CartDrawer } from './CartDrawer'
import { CartFloatingButton } from './CartFloatingButton'
import { SetLightHeader } from './SetLightHeader'

const BRAND_KEYS = {
  Yealink: 'yealink',
  Logitech: 'logitech',
  Jabra: 'jabra',
  Cisco: 'cisco',
  Poly: 'poly',
} as const

export async function BrandDevicesPageContent({ brand }: { brand: Device['brand'] }) {
  const [devices, reusedBlocks, brandDevicePages] = await Promise.all([
    getCachedBrandDevices(brand),
    getCachedReusedBlocks(),
    getCachedGlobal('brandDevicePages', 0)(),
  ])

  const hero = (brandDevicePages as BrandDevicePage | null)?.[BRAND_KEYS[brand]]

  return (
    <DeviceCartProvider>
      <article className="relative">
        <SetLightHeader />
        <BrandHero brand={brand} hero={hero} />
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
