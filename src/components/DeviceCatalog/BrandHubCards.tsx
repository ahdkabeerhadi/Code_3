import React from 'react'
import Link from 'next/link'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

const BRANDS = [
  { key: 'yealink', name: 'Yealink', slug: 'yealink-video-conferencing-devices-dubai-uae' },
  { key: 'logitech', name: 'Logitech', slug: 'logitech-video-conferencing-devices-dubai-uae' },
  { key: 'jabra', name: 'Jabra', slug: 'jabra-video-conferencing-devices-dubai-uae' },
  { key: 'cisco', name: 'Cisco', slug: 'cisco-video-conferencing-devices-dubai-uae' },
  { key: 'poly', name: 'Poly', slug: 'poly-video-conferencing-devices-dubai-uae' },
] as const

type BrandLogos = Partial<Record<(typeof BRANDS)[number]['key'], MediaType | string | null | undefined>>

export function BrandHubCards({ logos }: { logos?: BrandLogos }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {BRANDS.map((brand) => {
        const logo = logos?.[brand.key]
        const hasLogo = logo && typeof logo === 'object'

        return (
          <Link
            key={brand.slug}
            href={`/service/${brand.slug}`}
            className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-lg"
          >
            {hasLogo ? (
              <Media
                resource={logo}
                size="140px"
                imgClassName="h-10 w-auto max-w-[140px] object-contain"
              />
            ) : (
              <span className="text-base font-semibold text-foreground group-hover:text-primary_red">
                {brand.name}
              </span>
            )}
            <span className="text-xs text-gray-500">View Devices</span>
          </Link>
        )
      })}
    </div>
  )
}
