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

const fetchRelatedDevices = async (brand: Device['brand'], excludeId: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 5,
    sort: 'title',
    where: { and: [{ brand: { equals: brand } }, { id: { not_equals: excludeId } }] },
  })
  return result.docs
}

export const getCachedRelatedDevices = (brand: Device['brand'], excludeId: string) =>
  unstable_cache(() => fetchRelatedDevices(brand, excludeId), ['related-devices', brand, excludeId], {
    tags: ['devices-catalog'],
  })()

// Reuses the generic company-wide sections already authored on the Video
// Conferencing Solutions page (You Might Also Need, Stats, What's Covered,
// Why Choose Us, Service Coverage, Implementation Process, Our Clients,
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
    findBlock('scopeChecklist'),
    findBlock('comparisonTable'),
    findBlock('serviceCoverage'),
    findBlock('deliveryProcess'),
    ...trustedBrands,
    findBlock('testimonials'),
    findBlock('faq'),
  ].filter((b): b is NonNullable<typeof b> => Boolean(b))
}

export const getCachedReusedBlocks = () =>
  unstable_cache(fetchReusedBlocks, ['device-detail-reused-blocks'], {
    tags: ['page_video-conferencing-solutions-dubai-uae'],
  })()
