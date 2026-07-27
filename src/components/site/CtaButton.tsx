import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CtaButton({
  label,
  url,
  className,
}: {
  label?: string | null
  url?: string | null
  className?: string
}) {
  if (!label || !url) return null

  return (
    <Link href={url} className={className}>
      <Button variant="outline" size="default">
        {label}
      </Button>
    </Link>
  )
}
