'use client'

import type { TrustedBrandsBlock as TrustedBrandsBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import type { Media as MediaType, Page } from 'src/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { CtaButton } from '@/components/site/CtaButton'

type Props = {
  className?: string
} & TrustedBrandsBlockProps

export const TrustedBrandsBlock: React.FC<Props> = ({
  className,
  title,
  brands = [],
  displayStyle = 'scroll',
  animationSpeed = 'normal',
  pauseOnHover = true,
  ctaLabel,
  ctaUrl,
}) => {
  const safeBrands = brands || []
  const isGrid = displayStyle === 'grid'
  const isHorizontalScroll = displayStyle === 'horizontalScroll'
  const isMarquee = !isGrid && !isHorizontalScroll
  const duplicatedBrands = isMarquee && safeBrands.length > 0 ? [...safeBrands, ...safeBrands, ...safeBrands] : safeBrands
  const safeAnimationSpeed = animationSpeed || 'normal'
  const speedClasses = {
    slow: 'animate-scroll-slow',
    normal: 'animate-scroll',
    fast: 'animate-scroll-fast'
  } as const

  interface Brand {
    name: string
    logo: string | MediaType
    linkType?: 'none' | 'external' | 'service' | null
    url?: string | null
    servicePage?: string | Page | null
    id?: string | null
  }

  const getBrandLink = (brand: Brand): string | null => {
    if (!brand.linkType || brand.linkType === 'none') {
      return null
    }

    if (brand.linkType === 'external' && brand.url && brand.url.trim() !== '') {
      return brand.url
    }

    if (brand.linkType === 'service' && brand.servicePage) {
      if (typeof brand.servicePage === 'string') {
        return null
      }
      
      const page = brand.servicePage
      
      if (!page.slug) {
        return null
      }
      
      return `/service/${page.slug}`
    }

    return null
  }

  const BrandLogo = ({ brand }: { brand: Brand; index: number }) => {
    const [logoFailed, setLogoFailed] = useState(false)
    const logoContent = brand.logo && !logoFailed ? (
      <Media
        resource={brand.logo}
        imgClassName="h-12 md:h-16 w-auto max-w-[140px] object-contain transition-all duration-300"
        onError={() => setLogoFailed(true)}
      />
    ) : (
      <div className="h-8 md:h-10 px-2 flex items-center justify-center">
        <span className="whitespace-nowrap text-sm md:text-base font-semibold text-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary_red">
          {brand.name}
        </span>
      </div>
    )

    const brandLink = getBrandLink(brand)

    if (brandLink) {
      const isExternal = brand.linkType === 'external'
      
      if (isExternal) {
        return (
          <a
            href={brandLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            {logoContent}
          </a>
        )
      }

      return (
        <Link
          href={brandLink}
          className="block transition-transform duration-300 hover:scale-110 cursor-pointer"
        >
          {logoContent}
        </Link>
      )
    }

    return <div className="opacity-90">{logoContent}</div>
  }

  if (duplicatedBrands.length === 0) {
    return (
      <section className={cn('py-8 md:py-10 px-4 bg-white', className)}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-xs md:text-sm font-semibold text-gray-800 mb-2">
              {title}
            </h2>
            <p className="text-gray-500">No brands to display</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-8 md:py-10 px-4 bg-white overflow-hidden', className)}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xs md:text-[20px] font-semibold text-gray-800 mb-4">
            {title}
          </h2>
        </div>

        {isGrid ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {safeBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="group flex items-center justify-center rounded-xl border border-border p-5 h-20 transition-colors duration-300 hover:border-primary_red"
              >
                <span className="font-semibold text-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary_red">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        ) : isHorizontalScroll ? (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
            {safeBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="group flex flex-none snap-start items-center justify-center rounded-xl border border-border px-6 py-5 h-20 min-w-[140px] transition-colors duration-300 hover:border-primary_red"
              >
                <span className="whitespace-nowrap font-semibold text-foreground transition-all duration-300 group-hover:text-primary_red">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Infinite Scrolling Brands Container */
          <div className="relative w-full">
            {/* Gradient fade masks */}
            <div className="absolute -left-1 top-0 w-16 md:w-24 h-full bg-gradient-to-r from-white via-white/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute -right-1 top-0 w-16 md:w-24 h-full bg-gradient-to-l from-white via-white/30 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <div className="flex overflow-hidden">
              <div
                className={cn(
                  'flex items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 whitespace-nowrap',
                  speedClasses[safeAnimationSpeed],
                  pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
                style={{
                  width: 'max-content',
                }}
              >
                {duplicatedBrands.map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className="group flex-shrink-0 flex items-center justify-center"
                  >
                    <BrandLogo brand={brand} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 md:mt-10">
          <CtaButton label={ctaLabel} url={ctaUrl} className="inline-block" />
        </div>
      </div>
    </section>
  )
}
