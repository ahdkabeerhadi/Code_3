import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

// Service pages are served under /service/[slug] (see generatePreviewPath), so the
// revalidated path must match or the live route never picks up published changes.
const getPagePath = (doc: Pick<Page, 'slug' | 'serviceCategory'>) => {
  if (doc.slug === 'home') return '/'
  const isServicePage = !!doc.serviceCategory && doc.serviceCategory !== 'none'
  return isServicePage ? `/service/${doc.slug}` : `/${doc.slug}`
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getPagePath(doc)

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')
      revalidateTag(`page_${doc.slug}`)
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = getPagePath(previousDoc)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
      revalidateTag(`page_${previousDoc.slug}`)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap')
    if (doc?.slug) revalidateTag(`page_${doc.slug}`)
  }

  return doc
}
