import type { ServicesBlock as ServicesBlockProps } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import { ServicesBlockClient } from './ServicesBlockClient'

const fetchServicePages = async (maxServices: number) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: maxServices * 2,
    where: {
      and: [
        {
          serviceCategory: {
            in: ['infrastructure', 'digital'],
          },
        },
        {
          or: [
            {
              parentService: {
                equals: null,
              },
            },
            {
              parentService: {
                exists: false,
              },
            },
          ],
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return result.docs
}

const getCachedServicePages = (maxServices: number) =>
  unstable_cache(() => fetchServicePages(maxServices), ['services-block', String(maxServices)], {
    tags: ['pages-sitemap'],
  })()

export const ServicesBlock: React.FC<
  ServicesBlockProps & { id?: string; maxServices?: number }
> = async (props) => {
  const { id, maxServices = 6 } = props
  const servicePages = await getCachedServicePages(maxServices)

  return (
    <div className="" id={`block-${id}`}>
      {/* Pass fetched data to the client boundary */}
      <ServicesBlockClient {...props} servicePages={servicePages} />
    </div>
  )
}
