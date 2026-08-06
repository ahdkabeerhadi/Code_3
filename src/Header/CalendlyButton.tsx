'use client'

import React, { useEffect, useRef } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { reportContactConversion } from '@/utilities/reportConversion'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

// CalendlyButton can render more than once at a time (desktop nav + mobile
// menu), so this listener is registered once module-wide rather than per
// instance — otherwise a single completed booking would report as multiple
// conversions.
let calendlyConversionListenerAttached = false
function ensureCalendlyConversionListener() {
  if (calendlyConversionListenerAttached) return
  calendlyConversionListenerAttached = true
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://calendly.com') return
    if (
      typeof event.data === 'object' &&
      event.data !== null &&
      (event.data as { event?: string }).event === 'calendly.event_scheduled'
    ) {
      reportContactConversion()
    }
  })
}

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Calendly) {
      resolve()
      return
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = CALENDLY_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
}

export function CalendlyButton({
  label,
  url,
  appearance,
  size,
  className,
}: {
  label: string
  url: string
  appearance?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
}) {
  const loadingRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    if (!document.getElementById('calendly-widget-css')) {
      const link = document.createElement('link')
      link.id = 'calendly-widget-css'
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }
    // Start loading the script as soon as this button mounts, so it's ready by the
    // time a real visitor clicks — don't wait for Next's lazyOnload idle window.
    loadingRef.current = loadCalendlyScript()
    ensureCalendlyConversionListener()
  }, [])

  const openPopup = async () => {
    if (!loadingRef.current) {
      loadingRef.current = loadCalendlyScript()
    }
    await loadingRef.current
    window.Calendly?.initPopupWidget({ url })
  }

  return (
    <Button variant={appearance} size={size} className={className} onClick={openPopup}>
      {label}
    </Button>
  )
}
