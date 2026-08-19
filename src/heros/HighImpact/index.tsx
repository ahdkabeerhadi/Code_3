'use client'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { ServiceIcon } from '@/components/site/icons'
import { cn } from '@/utilities/ui'

type CarouselImage = Page['hero']['media']

// Mirrors the homepage's "stats" layout block further down the page -
// keep these two in sync if those numbers ever change.
const HERO_STATS = [
  { icon: 'users' as const, value: '30+', label: 'Experienced Professionals' },
  { icon: 'handshake' as const, value: '50+', label: 'Technology Partners' },
  { icon: 'check' as const, value: '1500+', label: 'Projects Delivered' },
  { icon: 'smile' as const, value: '400+', label: 'Satisfied Customers' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function HeroBackground({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 6000)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <>
      {images.map((img, i) =>
        failed[i] ? null : (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-[1200ms] ease-in-out',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Media
              fill
              resource={img}
              imgClassName="object-cover"
              videoClassName="absolute inset-0 h-full w-full object-cover"
              priority={i === 0}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            />
          </div>
        ),
      )}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show background ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40',
              )}
            />
          ))}
        </div>
      )}
    </>
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
    <section className="relative w-full overflow-hidden bg-[#0b0908]">
      <div className="absolute inset-0">
        <HeroBackground images={images} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0908] via-[#0b0908]/85 to-[#0b0908]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0908] via-[#0b0908]/20 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="hero-beam text-primary_red" style={{ left: '8%', width: '3px' }} />
        <span
          className="hero-beam text-amber-400"
          style={{ left: '38%', width: '2px', animationDelay: '-5s', animationDuration: '18s' }}
        />
        <span
          className="hero-beam text-primary_red"
          style={{ left: '64%', width: '4px', animationDelay: '-10s', animationDuration: '13s' }}
        />
        <span
          className="hero-beam text-amber-400"
          style={{ left: '86%', width: '2px', animationDelay: '-3s', animationDuration: '20s' }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-44 lg:pb-20">
        <div className="max-w-2xl">
          <Eyebrow className="text-primary_red">IT Infrastructure · Cybersecurity · Digital Growth</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-white text-wrap-balance">
            {HeroText}
          </h1>
          {subText && (
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/65 max-w-xl">
              {subText}
            </p>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-8 flex w-full flex-col sm:flex-row gap-3">
              {links.map(({ link }, i) => {
                const isPrimary = link.appearance !== 'outline'
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      size="default"
                      className={cn(
                        'w-full sm:w-auto',
                        isPrimary
                          ? 'bg-white text-[#0b0908] hover:bg-white/90 pl-6 pr-1.5 py-1.5 h-auto'
                          : 'border-white/35 bg-transparent text-white hover:bg-white/10',
                      )}
                    >
                      {isPrimary && (
                        <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary_red text-white [&_svg]:h-4 [&_svg]:w-4">
                          <ArrowIcon />
                        </span>
                      )}
                    </CMSLink>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-5 flex items-center gap-3"
            >
              <ServiceIcon preset={stat.icon} className="h-6 w-6 shrink-0 text-primary_red" />
              <div>
                <div className="text-xl md:text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs text-white/55 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
