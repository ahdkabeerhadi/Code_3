import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BlogScrollBlock as BlogScrollBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { PostCard } from './PostCard'

type Props = {
  className?: string
} & BlogScrollBlockProps

export const BlogScrollBlock: React.FC<Props> = async ({
  className,
  badge,
  title,
  limit,
  viewAllLabel,
  viewAllUrl,
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit || 8,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
    select: {
      title: true,
      slug: true,
      heroImage: true,
      publishedAt: true,
      meta: true,
    },
  })

  const posts = result.docs
  if (posts.length === 0) return null

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {badge && <Eyebrow>{badge}</Eyebrow>}
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          </div>
          {viewAllUrl && (
            <Link
              href={viewAllUrl}
              className="text-sm font-semibold text-primary_red hover:text-primary_red/80 transition-colors whitespace-nowrap"
            >
              {viewAllLabel || 'View All Posts'} &rarr;
            </Link>
          )}
        </Reveal>

        <Reveal
          delayMs={100}
          className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
        >
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                slug: post.slug,
                title: post.title,
                heroImage: post.heroImage,
                description: post.meta?.description,
                publishedAt: post.publishedAt,
              }}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
