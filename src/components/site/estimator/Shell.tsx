import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function EstimatorCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.18)]',
        className,
      )}
    >
      <div className="h-2 w-full bg-gradient-to-r from-primary_red via-red-400 to-primary_red" />
      {children}
    </div>
  )
}

export const estimatorFormClassName = 'grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8'
export const estimatorQuestionsClassName = 'space-y-5'

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
    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
      {disclaimer || ctaText ? (
        <div>
          {ctaText && <p className="text-sm font-medium text-foreground">{ctaText}</p>}
          {disclaimer && <p className="text-xs text-gray-500">{disclaimer}</p>}
        </div>
      ) : (
        <span />
      )}
      {ctaLabel && ctaUrl && (
        <Link
          href={ctaUrl}
          className="inline-flex flex-none items-center gap-2 rounded-full bg-primary_red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-secondary_red"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
