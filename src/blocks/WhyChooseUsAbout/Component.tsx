import type { WhyChooseUsAboutBlock as WhyChooseUsAboutBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { IconMedia } from '@/components/site/IconMedia'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { CtaButton } from '@/components/site/CtaButton'
import { ClearQuickEnquiry } from '@/components/site/ClearQuickEnquiry'

type Props = {
  className?: string
} & WhyChooseUsAboutBlockProps

export const WhyChooseUsAboutBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  features = [],
  ctaText,
  ctaLabel,
  ctaUrl,
}) => {
  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        {features && features.length > 0 && (
          <>
            <ClearQuickEnquiry />
            <Reveal
              delayMs={100}
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border',
                features.length === 1 && 'lg:grid-cols-1',
                features.length === 2 && 'lg:grid-cols-2',
                features.length === 3 && 'lg:grid-cols-3',
                features.length >= 4 && 'lg:grid-cols-4',
              )}
            >
              {features.map((feature, index) => (
                <div key={feature.id || index} className="border-r border-b border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {feature.icon && typeof feature.icon === 'object' && (
                      <span className="h-11 w-11 flex-none rounded-full bg-[#FDEBEC] flex items-center justify-center overflow-hidden">
                        <IconMedia resource={feature.icon} className="w-6 h-6 object-contain" />
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </Reveal>
          </>
        )}

        <CtaButton text={ctaText} label={ctaLabel} url={ctaUrl} className="mt-6" />
      </div>
    </section>
  )
}
