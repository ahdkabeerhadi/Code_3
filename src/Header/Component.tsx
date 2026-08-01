import { HeaderClient } from './Component.client'
import { TopBar } from './TopBar'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'

import type { Header, Media, Page } from '@/payload-types'

interface TechPartnerData {
  name: string
  logoUrl?: string | null
}

// Define the simplified data structure for navigation pages
interface NavigationPageData {
  id: string
  slug: string | null | undefined
  title: string
  serviceCategory: 'none' | 'infrastructure' | 'digital' | null | undefined
  parentService: string | null
  isSubService: boolean
}

// Both queries only need to refetch when a page's slug/category/parentService/status
// changes - piggyback on the 'pages-sitemap' tag the pages collection already
// revalidates on every publish/unpublish, instead of refetching on every request.
const getNavData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const pagesRes = await payload.find({
      collection: 'pages',
      depth: 2,
      limit: 200,
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
  ['header-nav-data'],
  { tags: ['pages-sitemap'] },
)

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  const { navigationPages, techPartners } = await getNavData()

  return (
    <>
      <TopBar />
      <HeaderClient
        data={(headerData as Header) || null}
        navigationPages={navigationPages}
        techPartners={techPartners}
      />
    </>
  )
}
