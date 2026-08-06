import type { Metadata } from 'next'

import React from 'react'
import { BrandHubCards } from '@/components/DeviceCatalog/BrandHubCards'
import PageClient from './page.client'

export default function VideoConferencingDevicesPage() {
  return (
    <article className="relative pt-8">
      <PageClient />
      <div className="container mx-auto px-4 py-10 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary_red">
            Video Conferencing Devices
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Shop by Brand
          </h1>
          <p className="mt-3 text-gray-600">
            Genuine video conferencing hardware from Yealink, Logitech, Jabra, Cisco, and Poly.
            Choose a brand to browse devices by room size and request a quote.
          </p>
        </div>

        <div className="mt-8">
          <BrandHubCards />
        </div>
      </div>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Video Conferencing Devices | Yealink, Logitech, Jabra, Cisco, Poly | CODE3',
    description:
      'Shop video conferencing devices from Yealink, Logitech, Jabra, Cisco, and Poly. Choose a brand to browse devices by room size and request a quote.',
  }
}
