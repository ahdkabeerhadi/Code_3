'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * The QuickEnquiry form floats via lg:absolute, pinned to the top of the page,
 * independent of its position in the block order. Full-width content that would
 * otherwise render underneath it (e.g. a logo grid) needs to wait until the form
 * clears - but how much clearance is needed varies per page (hero text length,
 * enquiry description length), so it's measured at runtime instead of guessed.
 */
export function ClearQuickEnquiry() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      const el = ref.current
      const form = document.querySelector('[data-quick-enquiry-form]')
      if (!el || !form || window.innerWidth < 1024) {
        setHeight(0)
        return
      }
      const formBottom = form.getBoundingClientRect().bottom
      const selfTop = el.getBoundingClientRect().top
      setHeight(Math.max(0, formBottom - selfTop))
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    const form = document.querySelector('[data-quick-enquiry-form]')
    const resizeObserver = form ? new ResizeObserver(updateHeight) : null
    if (form && resizeObserver) resizeObserver.observe(form)

    return () => {
      window.removeEventListener('resize', updateHeight)
      resizeObserver?.disconnect()
    }
  }, [])

  return <div ref={ref} style={{ height }} aria-hidden="true" />
}
