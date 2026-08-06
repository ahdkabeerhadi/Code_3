import React from 'react'
import Link from 'next/link'

const BRANDS = [
  { name: 'Yealink', slug: 'yealink-video-conferencing-devices-dubai-uae' },
  { name: 'Logitech', slug: 'logitech-video-conferencing-devices-dubai-uae' },
  { name: 'Jabra', slug: 'jabra-video-conferencing-devices-dubai-uae' },
  { name: 'Cisco', slug: 'cisco-video-conferencing-devices-dubai-uae' },
  { name: 'Poly', slug: 'poly-video-conferencing-devices-dubai-uae' },
]

export function BrandHubCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {BRANDS.map((brand) => (
        <Link
          key={brand.slug}
          href={`/service/${brand.slug}`}
          className="group flex flex-col items-center justify-center rounded-xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-lg"
        >
          <span className="text-base font-semibold text-foreground group-hover:text-primary_red">
            {brand.name}
          </span>
          <span className="mt-1 text-xs text-gray-500">View Devices</span>
        </Link>
      ))}
    </div>
  )
}
