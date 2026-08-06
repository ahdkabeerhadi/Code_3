import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { Device } from '@/payload-types'

const fetchBrandDevices = async (brand: Device['brand']) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'devices',
    depth: 1,
    limit: 200,
    sort: 'title',
    pagination: false,
    where: { brand: { equals: brand } },
  })
  return result.docs
}

export const getCachedBrandDevices = (brand: Device['brand']) =>
  unstable_cache(() => fetchBrandDevices(brand), ['devices-catalog', brand], {
    tags: ['devices-catalog'],
  })()
