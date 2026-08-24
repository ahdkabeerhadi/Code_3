import type { SubServicesNavBlock as SubServicesNavBlockProps, Page } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type NavLink = { label: string; href: string }

const ArrowIcon = ({ flipped = false }: { flipped?: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    className={cn('flex-none transition-transform duration-200', flipped ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')}
  >
    <path d="M3.333 8h9.334M8.667 3.667L13 8l-4.333 4.333" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const fetchSiblingNav = async (parentId: string, currentId: string) => {
  const payload = await getPayload({ config: configPromise })

  const [parent, siblingsResult] = await Promise.all([
    payload.findByID({ collection: 'pages', id: parentId, depth: 0 }).catch(() => null),
    payload.find({
      collection: 'pages',
      depth: 0,
      limit: 100,
      sort: 'title',
      where: {
        and: [
          { parentService: { equals: parentId } },
          { serviceCategory: { not_equals: 'none' } },
          { _status: { equals: 'published' } },
        ],
      },
    }),
  ])

  const siblings: NavLink[] = (siblingsResult.docs as Page[])
    .filter((p) => p.id !== currentId)
    .map((p) => ({ label: p.title, href: `/service/${p.slug}` }))

  const parentLink: NavLink | null =
    parent && typeof parent === 'object' && 'slug' in parent && (parent as Page).slug
      ? { label: (parent as Page).title, href: `/service/${(parent as Page).slug}` }
      : null

  return { parentLink, siblings }
}

const getCachedSiblingNav = (parentId: string, currentId: string) =>
  unstable_cache(() => fetchSiblingNav(parentId, currentId), ['sub-services-nav', parentId, currentId], {
    tags: ['pages-sitemap'],
  })()

type Props = {
  className?: string
  currentPage?: Page | null
} & SubServicesNavBlockProps

export const SubServicesNavBlock: React.FC<Props> = async ({ className, title, currentPage }) => {
  if (!currentPage) return null

  const parentRaw = (currentPage as unknown as { parentService?: string | Page | null }).parentService
  const parentId = typeof parentRaw === 'object' && parentRaw ? parentRaw.id : parentRaw
  if (!parentId) return null

  const { parentLink, siblings } = await getCachedSiblingNav(parentId, currentPage.id)

  if (!parentLink && siblings.length === 0) return null

  const heading = title || (parentLink ? `Explore More in ${parentLink.label}` : 'Explore More Services')

  return (
    <section className={cn('bg-gray-50/80 py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{heading}</h2>
        <div className="flex flex-wrap gap-3">
          {parentLink && (
            <Link
              href={parentLink.href}
              className="group inline-flex items-center gap-2 rounded-full border border-primary_red/40 bg-white px-5 py-3 text-base font-medium text-primary_red shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <ArrowIcon flipped />
              {parentLink.label}
            </Link>
          )}
          {siblings.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-base font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary_red/40 hover:text-primary_red hover:shadow-md"
            >
              {s.label}
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
