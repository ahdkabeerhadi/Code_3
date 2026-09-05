import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function EstimatorCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-white to-[#FDF2F3] shadow-sm',
        className,
      )}
    >
      {/* Soft decorative accents so the card reads as a designed frame rather
          than empty white space around the content - purely atmospheric,
          sits behind everything and never affects layout or readability. */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary_red/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary_red/5 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  )
}

export const estimatorBodyClassName = 'mx-auto max-w-2xl px-6 py-10 md:px-12 md:py-16'

export function StartOverButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-6 block text-base font-semibold text-primary_red hover:underline"
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
