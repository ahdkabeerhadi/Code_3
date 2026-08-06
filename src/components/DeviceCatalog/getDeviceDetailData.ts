import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { Device, Page } from '@/payload-types'

const fetchDeviceBySlug = async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] || null
}

export const getCachedDeviceBySlug = (slug: string) =>
  unstable_cache(() => fetchDeviceBySlug(slug), ['device-detail', slug], {
    tags: ['devices-catalog'],
  })()

// "Our More Other Brand Video Conferencing Products" - cross-sell devices
// from brands OTHER than the current one/brand (excludeBrand), one from
// each other brand where possible for variety.
const fetchOtherBrandDevices = async (excludeBrand: Device['brand']) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 200,
    sort: 'title',
    pagination: false,
    where: { brand: { not_equals: excludeBrand } },
  })

  const seenBrands = new Set<string>()
  const picks: Device[] = []
  for (const device of result.docs) {
    if (seenBrands.has(device.brand)) continue
    seenBrands.add(device.brand)
    picks.push(device)
    if (picks.length >= 8) break
  }
  return picks
}

export const getCachedOtherBrandDevices = (excludeBrand: Device['brand']) =>
  unstable_cache(() => fetchOtherBrandDevices(excludeBrand), ['other-brand-devices', excludeBrand], {
    tags: ['devices-catalog'],
  })()

// Expanded "More" view - every device across all 5 brands (including the
// current device's own brand), excluding just the device being viewed.
const fetchAllOtherDevices = async (excludeId: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 60,
    sort: 'brand',
    pagination: false,
    where: { id: { not_equals: excludeId } },
  })
  return result.docs
}

export const getCachedAllOtherDevices = (excludeId: string) =>
  unstable_cache(() => fetchAllOtherDevices(excludeId), ['all-other-devices', excludeId], {
    tags: ['devices-catalog'],
  })()

// Reuses the generic company-wide sections already authored on the Video
// Conferencing Solutions page (You Might Also Need, Stats, Our Clients,
// Technology Partners, Client Voices, FAQs) instead of duplicating that
// content per device - editing them once on that page updates every
// device page too.
const fetchReusedBlocks = async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'video-conferencing-solutions-dubai-uae' } },
    locale: 'en',
    depth: 1,
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) return []

  const layout = page.layout as Page['layout']
  const findBlock = (type: string) => layout.find((b) => b.blockType === type)
  const trustedBrands = layout.filter((b) => b.blockType === 'trustedBrands')

  return [
    findBlock('relatedServices'),
    findBlock('stats'),
    ...trustedBrands,
    findBlock('testimonials'),
    findBlock('faq'),
  ].filter((b): b is NonNullable<typeof b> => Boolean(b))
}

export const getCachedReusedBlocks = () =>
  unstable_cache(fetchReusedBlocks, ['device-detail-reused-blocks'], {
    tags: ['page_video-conferencing-solutions-dubai-uae'],
  })()
