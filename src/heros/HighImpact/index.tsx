'use client'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { cn } from '@/utilities/ui'

type CarouselImage = Page['hero']['media']

function HeroCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-full">
      {images.map((img, i) =>
        failed[i] ? null : (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <Media
              fill
              resource={img}
              imgClassName="object-cover"
              priority={i === 0}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            />
          </div>
        ),
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  carouselImages,
  HeroText,
  subText,
}) => {
  const images = [media, ...((carouselImages || []).map((c) => c.image))].filter(
    Boolean,
  ) as CarouselImage[]

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-stretch">
          <div className="flex flex-col justify-center">
            <Eyebrow>IT Infrastructure · Cybersecurity · Digital Growth</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground">
              {HeroText}
            </h1>
            {subText && (
              <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl">
                {subText}
              </p>
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-8 flex w-full flex-col sm:flex-row gap-3">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} size="default" className="w-full sm:w-auto" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {images.length > 0 && (
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden border border-border">
              <HeroCarousel images={images} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
