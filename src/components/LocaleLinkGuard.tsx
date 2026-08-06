'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Internal links across the site (CMSLink, ServiceCatalog, PostCard, Header
 * nav, etc.) are built as plain unprefixed paths (e.g. "/service/x") with no
 * locale awareness — there are ~20+ places that construct these hrefs, so
 * fixing each one individually is a large, scattered change. Instead, this
 * intercepts clicks on internal links site-wide: while browsing under /ar,
 * a click on a same-origin, non-/ar-prefixed link is redirected to its /ar
 * equivalent, keeping the user in the Arabic experience they're already in.
 */
export function LocaleLinkGuard() {
  const router = useRouter()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!window.location.pathname.startsWith('/ar')) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement)?.closest?.('a')
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      // The EN/AR locale toggle deliberately links to the unprefixed path to
      // switch back to English — must not be redirected back into /ar.
      if (anchor.hasAttribute('data-locale-link')) return

      const href = anchor.getAttribute('href')
      if (!href) return
      if (!href.startsWith('/')) return
      if (href.startsWith('/ar') || href.startsWith('//')) return
      if (href.startsWith('/admin') || href.startsWith('/api') || href.startsWith('/_next')) return

      // Capture phase, ahead of next/link's own bubble-phase click handler,
      // so we redirect before it has a chance to navigate to the unprefixed path.
      event.preventDefault()
      event.stopPropagation()
      router.push(`/ar${href}`)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [router])

  return null
}
