// Component.tsx (Server Component)
import type { ServiceSolutionsBlock as ServiceSolutionsBlockProps, Page } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import { ServiceSolutionsBlock as ServiceSolutionsClient } from './Client'
import { getIconForServiceTitle } from '@/components/site/serviceIconMap'

interface ServiceCard {
  title: string
  description: string
  icon: string
  buttonLink: string
  category: 'infrastructure' | 'digital'
}

interface ServiceSolutionsBlockExtendedProps
  extends Omit<ServiceSolutionsBlockProps, 'serviceType'> {
  id?: string
  currentPage?: Page | null
  disableInnerContainer?: boolean
  serviceType?: 'infrastructure' | 'digital'
}

function mapPageToServiceCard(page: Page): ServiceCard {
  let slug = '#'
  if (page.slug) {
    if (page.serviceCategory && page.serviceCategory !== 'none') {
      slug = `/service/${page.slug}`
    } else {
      slug = `/${page.slug}`
    }
  }

  const pageWithIcon = page as Page & { icon?: string | null }

  return {
    title: page.title || 'Service',
    description:
      page.hero?.subText || page.meta?.description || 'Professional service tailored to your business needs.',
    icon: pageWithIcon.icon || getIconForServiceTitle(page.title),
    buttonLink: slug,
    category: page.serviceCategory === 'infrastructure' ? 'infrastructure' : 'digital',
  }
}

const fetchChildServicePages = async (parentId: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 50,
    where: {
      and: [
        {
          parentService: {
            equals: parentId,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })
  return result.docs || []
}

const fetchTopLevelServicePages = async (serviceType: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 50,
    where: {
      and: [
        {
          serviceCategory: {
            equals: serviceType,
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
  return result.docs || []
}

const getCachedChildServicePages = (parentId: string) =>
  unstable_cache(() => fetchChildServicePages(parentId), ['service-solutions-children', parentId], {
    tags: ['pages-sitemap'],
  })()

const getCachedTopLevelServicePages = (serviceType: string) =>
  unstable_cache(
    () => fetchTopLevelServicePages(serviceType),
    ['service-solutions-top-level', serviceType],
    { tags: ['pages-sitemap'] },
  )()

export const ServiceSolutionsBlock: React.FC<ServiceSolutionsBlockExtendedProps> = async (
  props,
) => {
  const { id, serviceType = 'infrastructure', currentPage, ...rest } = props

  const currentPageWithParent = currentPage as Page & {
    parentService?: string | { id: string } | null
  }

  let currentPageParentServiceId: string | null = null
  if (currentPageWithParent?.parentService) {
    if (
      typeof currentPageWithParent.parentService === 'object' &&
      currentPageWithParent.parentService.id
    ) {
      currentPageParentServiceId = currentPageWithParent.parentService.id
    } else if (typeof currentPageWithParent.parentService === 'string') {
      currentPageParentServiceId = currentPageWithParent.parentService
    }
  }

  const isServiceDetailPage =
    (currentPage?.serviceCategory === 'infrastructure' ||
      currentPage?.serviceCategory === 'digital') &&
    !currentPageParentServiceId

  const pages: Page[] =
    isServiceDetailPage && currentPage?.id
      ? await getCachedChildServicePages(currentPage.id)
      : await getCachedTopLevelServicePages(serviceType)

  const filteredPages = pages.filter((p) => p.id !== currentPage?.id)
  const services = filteredPages.map(mapPageToServiceCard)

  return (
    <div className="" id={`block-${id}`}>
      <ServiceSolutionsClient
        {...rest}
        services={services}
        serviceType={serviceType as 'infrastructure' | 'digital'}
      />
    </div>
  )
}
