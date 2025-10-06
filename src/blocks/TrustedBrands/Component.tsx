'use client'

import type { TrustedBrandsBlock as TrustedBrandsBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
} & TrustedBrandsBlockProps

export const TrustedBrandsBlock: React.FC<Props> = ({
  className,
  title = 'Trusted by Leading Brands & Certified for Excellence',
  brands = [],
}) => {
  return (
    <section className={cn('py-16 px-4 bg-white', className)}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-md md:text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        </div>

        {/* Brands Grid */}
        <div className="flex items-center gap-12 lg:gap-20 overflow-x-auto scrollbar-hide">
          {brands &&
            brands.length > 0 &&
            brands.map((brand, index) => (
              <div key={index} className="flex-shrink-0">
                {brand.logo ? (
                  <img
                    src={typeof brand.logo === 'string' ? brand.logo : brand.logo?.url || ''}
                    alt={brand.name || 'Brand logo'}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="h-10 w-32 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{brand.name}</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}