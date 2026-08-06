import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import { DeviceCatalogClient } from '@/components/DeviceCatalog/DeviceCatalogClient'
import PageClient from './page.client'

const fetchDevices = async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 200,
    sort: 'title',
    pagination: false,
  })
  return result.docs
}

const getCachedDevices = () =>
  unstable_cache(fetchDevices, ['devices-catalog'], { tags: ['devices-catalog'] })()

export default async function VideoConferencingDevicesPage() {
  const devices = await getCachedDevices()

  return (
    <article className="relative pt-8">
      <PageClient />
      <DeviceCatalogClient devices={devices} />
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Video Conferencing Devices | Yealink, Logitech, Jabra, Cisco, Poly | CODE3',
    description:
      'Shop video conferencing devices from Yealink, Logitech, Jabra, Cisco, and Poly. Add devices to your quote cart or enquire directly for pricing and availability.',
  }
}
