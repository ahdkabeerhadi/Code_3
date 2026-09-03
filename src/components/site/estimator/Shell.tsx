import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function EstimatorCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm', className)}>
      {children}
    </div>
  )
}

export const estimatorBodyClassName = 'mx-auto max-w-xl p-6 md:p-10'

export function StartOverButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-5 block text-sm font-semibold text-primary_red hover:underline"
    >
      Start Over
    </button>
  )
}

export function EstimatorFooter({
  disclaimer,
  ctaText,
  ctaLabel,
  ctaUrl,
}: {
  disclaimer?: string | null
  ctaText?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}) {
  if (!disclaimer && !ctaText && !(ctaLabel && ctaUrl)) return null
  return (
    <div className="flex flex-col gap-4 bg-[#FDEBEC] px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
      {disclaimer || ctaText ? (
        <div>
          {ctaText && <p className="font-semibold text-foreground">{ctaText}</p>}
          {disclaimer && <p className="mt-0.5 text-xs text-gray-500">{disclaimer}</p>}
        </div>
      ) : (
        <span />
      )}
      {ctaLabel && ctaUrl && (
        <Link
          href={ctaUrl}
          className="inline-flex flex-none items-center gap-2 rounded-full bg-primary_red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary_red"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
