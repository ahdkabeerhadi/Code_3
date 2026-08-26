import { HeaderClient } from './Component.client'
import { TopBar } from './TopBar'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getLocale, type Locale } from '@/utilities/getLocale'
import { getIconForServiceTitle } from '@/components/site/serviceIconMap'
import { getCachedBrandDevices } from '@/components/DeviceCatalog/getBrandDevices'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'

import type { Header, Media, Page, Device } from '@/payload-types'

interface TechPartnerData {
  name: string
  logoUrl?: string | null
}

// Only these 5 brands have a real product catalog behind them (the Devices
// collection is video-conferencing hardware only) - everything else under
// "technology partners" is a logo with no product data.
const DEVICE_BRANDS = ['Yealink', 'Logitech', 'Jabra', 'Cisco', 'Poly'] as const

export interface DeviceCardData {
  id: string
  slug: string | null | undefined
  title: string
  brand: Device['brand']
  roomSize: Device['roomSize']
  category: Device['category']
  imageUrl: string | null
}

// Define the simplified data structure for navigation pages
interface NavigationPageData {
  id: string
  slug: string | null | undefined
  title: string
  serviceCategory: 'none' | 'infrastructure' | 'digital' | null | undefined
  parentService: string | null
  isSubService: boolean
  icon: string
  description: string | null
}

// Both queries only need to refetch when a page's slug/category/parentService/status
// changes - piggyback on the 'pages-sitemap' tag the pages collection already
// revalidates on every publish/unpublish, instead of refetching on every request.
// Locale is part of the cache key so English and Arabic requests don't collide.
const getNavData = (locale: Locale) =>
  unstable_cache(
    async () => {
    const payload = await getPayload({ config: configPromise })

    const pagesRes = await payload.find({
      collection: 'pages',
      depth: 2,
      limit: 200,
      locale,
      sort: ['navOrder', 'title'],
      where: {
        serviceCategory: {
          in: ['infrastructure', 'digital'],
        },
      },
    })

    const allPages = pagesRes.docs || []
    const navigationPages: NavigationPageData[] = allPages
      .filter((p) => p && p.id && p.slug) // Filter out any undefined/null pages or pages without slug
      .map((p) => {
        const pageWithParent = p as Page & {
          parentService?: string | { id: string } | null
        }
        let parentServiceId: string | null = null
        if (pageWithParent.parentService) {
          if (typeof pageWithParent.parentService === 'object' && pageWithParent.parentService.id) {
            parentServiceId = pageWithParent.parentService.id
          } else if (typeof pageWithParent.parentService === 'string') {
            parentServiceId = pageWithParent.parentService
          }
        }

        return {
          id: p.id,
          slug: p.slug || null,
          title: p.title || '',
          serviceCategory: p.serviceCategory,
          parentService: parentServiceId,
          isSubService: !!parentServiceId,
          icon: p.icon || getIconForServiceTitle(p.title || ''),
          description: p.meta?.description || null,
        }
      })

    // Fetch technology partners for the Company dropdown mega-menu
    let techPartners: TechPartnerData[] = []
    const techPartnersPageRes = await payload.find({
      collection: 'pages',
      depth: 1,
      limit: 1,
      where: { slug: { equals: 'technology-partners' } },
    })
    const techPartnersPage = techPartnersPageRes.docs?.[0] as Page | undefined
    const partnersBlock = (techPartnersPage?.layout || []).find(
      (block) => block.blockType === 'partnersDirectory',
    ) as { partners?: { name: string; logo?: string | Media | null }[] } | undefined
    if (partnersBlock?.partners) {
      techPartners = partnersBlock.partners.map((p) => ({
        name: p.name,
        logoUrl:
          p.logo && typeof p.logo === 'object' && p.logo.url ? getMediaUrl(p.logo.url, p.logo.updatedAt) : null,
      }))
    }

    return { navigationPages, techPartners }
    },
    ['header-nav-data', locale],
    { tags: ['pages-sitemap'] },
  )

export async function Header() {
  const locale = await getLocale()
  const headerData = await getCachedGlobal('header', 1, locale)()
  const { navigationPages, techPartners } = await getNavData(locale)()

  const devicesByBrand: Record<string, DeviceCardData[]> = {}
  const brandDevices = await Promise.all(DEVICE_BRANDS.map((brand) => getCachedBrandDevices(brand)))
  DEVICE_BRANDS.forEach((brand, i) => {
    devicesByBrand[brand] = (brandDevices[i] || []).map((d) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      brand: d.brand,
      roomSize: d.roomSize,
      category: d.category,
      imageUrl:
        d.image && typeof d.image === 'object'
          ? d.image.externalUrl || (d.image.url ? getMediaUrl(d.image.url, d.image.updatedAt) : null)
          : null,
    }))
  })

  return (
    <>
      <TopBar />
      <HeaderClient
        data={(headerData as Header) || null}
        navigationPages={navigationPages}
        techPartners={techPartners}
        devicesByBrand={devicesByBrand}
      />
    </>
  )
}
