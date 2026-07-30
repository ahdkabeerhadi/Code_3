import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { MiniContactForm } from '@/components/site/MiniContactForm'

interface QuickEnquiryBlockProps {
  title?: string
  description?: string | null
  className?: string
  promoEnabled?: boolean | null
  promoBadge?: string | null
  promoTitle?: string | null
  promoTagline?: string | null
  promoDescription?: string | null
  promoNote?: string | null
  promoCtaLabel?: string | null
  promoCtaUrl?: string | null
}

export const QuickEnquiryBlock: React.FC<QuickEnquiryBlockProps> = ({
  title,
  description,
  className,
  promoEnabled,
  promoBadge,
  promoTitle,
  promoTagline,
  promoDescription,
  promoNote,
  promoCtaLabel,
  promoCtaUrl,
}) => {
  return (
    <div
      data-quick-enquiry-form
      className={cn('bg-white py-8 lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent lg:py-0 lg:pointer-events-none', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:flex lg:flex-col lg:items-end">
        <MiniContactForm
          title={title}
          description={description}
          className="mx-auto max-w-md lg:pointer-events-auto lg:mx-0 lg:mt-8 lg:w-[360px]"
        />

        {promoEnabled && promoTitle && (
          <div className="mx-auto mt-4 max-w-md rounded-2xl bg-gradient-to-br from-primary_red to-[#8f0f18] p-5 shadow-lg lg:pointer-events-auto lg:mx-0 lg:w-[360px]">
            {promoBadge && (
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {promoBadge}
              </span>
            )}
            <h3 className="mt-3 text-xl font-bold leading-snug text-white">{promoTitle}</h3>
            {promoTagline && <p className="mt-1 text-sm font-semibold text-white/90">{promoTagline}</p>}
            {promoDescription && <p className="mt-2 text-sm leading-relaxed text-white/80">{promoDescription}</p>}
            {promoNote && <p className="mt-3 text-xs font-medium text-white/70">{promoNote}</p>}
            {promoCtaLabel && promoCtaUrl && (
              <Link
                href={promoCtaUrl}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary_red shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
              >
                {promoCtaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
