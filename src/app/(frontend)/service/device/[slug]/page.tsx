import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import { DeviceCartProvider } from '@/providers/DeviceCart'
import { DeviceHero } from '@/components/DeviceCatalog/DeviceHero'
import { DeviceServiceOverview } from '@/components/DeviceCatalog/DeviceServiceOverview'
import { RelatedDeviceProducts } from '@/components/DeviceCatalog/RelatedDeviceProducts'
import { CartDrawer } from '@/components/DeviceCatalog/CartDrawer'
import { CartFloatingButton } from '@/components/DeviceCatalog/CartFloatingButton'
import { SetLightHeader } from '@/components/DeviceCatalog/SetLightHeader'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import {
  getCachedDeviceBySlug,
  getCachedRelatedDevices,
  getCachedReusedBlocks,
} from '@/components/DeviceCatalog/getDeviceDetailData'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    limit: 200,
    pagination: false,
    select: { slug: true },
  })
  return result.docs.map(({ slug }) => ({ slug: slug as string }))
}

type Args = {
  params: Promise<{ slug: string }>
}

export default async function DeviceDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const device = await getCachedDeviceBySlug(slug)
  if (!device) notFound()

  const [relatedDevices, reusedBlocks] = await Promise.all([
    getCachedRelatedDevices(device.brand, device.id),
    getCachedReusedBlocks(),
  ])

  return (
    <DeviceCartProvider>
      <article className="relative">
        <SetLightHeader />
        <DeviceHero device={device} />
        <DeviceServiceOverview device={device} />
        <RelatedDeviceProducts devices={relatedDevices} brand={device.brand} />
        <RenderBlocks blocks={reusedBlocks} />
        <CartFloatingButton />
        <CartDrawer />
      </article>
    </DeviceCartProvider>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const device = await getCachedDeviceBySlug(slug)

  if (!device) {
    return { title: 'Device Not Found | CODE3' }
  }

  return {
    title: `${device.title} | ${device.brand} Video Conferencing | CODE3`,
    description: `${device.title} - genuine ${device.brand} video conferencing hardware for ${device.roomSize?.toLowerCase()} rooms. Request a quote from CODE3 Technologies.`,
  }
}
