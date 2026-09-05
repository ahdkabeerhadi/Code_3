import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/site/Reveal'

interface ServiceOverviewProps {
  badge?: string
  title?: string
  description?: string
  image?: string | MediaType | null
  className?: string
}

const ServiceOverviewComponent: React.FC<ServiceOverviewProps> = ({
  className,
  badge,
  title,
  description,
  image,
}) => {
  const hasImage = !!image && typeof image === 'object'

  return (
    <section className={cn('bg-white pt-2 pb-8 md:pt-3 md:pb-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={cn('flex flex-col items-start gap-6', hasImage && 'md:flex-row md:gap-8')}>
          <Reveal className={cn('flex flex-1 flex-col items-start gap-4 text-left', !hasImage && 'lg:max-w-[calc(100%-420px)]')}>
            {badge && (
              <span className="inline-block w-max rounded-full border border-secondary_red bg-primary_red px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                {badge}
              </span>
            )}
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{title}</h2>
            {description && (
              <div className={cn('max-w-3xl space-y-4 text-base text-gray-600 md:text-lg', hasImage && 'max-w-lg', !hasImage && 'max-w-none')}>
                {/* Blank-line-separated paragraphs render as distinct <p> tags
                    instead of one run-on block - a single-paragraph
                    description (the common case) still renders exactly as
                    before, just wrapped in one extra div. */}
                {description.split(/\n\s*\n/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </Reveal>

          {hasImage && (
            <Reveal delayMs={100} className="flex-1">
              <Media resource={image!} imgClassName="w-full h-full rounded-[2rem] object-cover" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

const ServiceOverviewBlock: React.FC<ServiceOverviewProps> = (props) => {
  return <ServiceOverviewComponent {...props} />
}

export { ServiceOverviewBlock }
