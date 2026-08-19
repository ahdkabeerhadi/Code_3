'use client'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { ServiceIcon } from '@/components/site/icons'
import { cn } from '@/utilities/ui'

type CarouselImage = Page['hero']['media']

const HERO_FEATURES = [
  { icon: 'shield' as const, label: 'Enterprise-Grade Cybersecurity' },
  { icon: 'cloud' as const, label: 'Scalable Cloud Solutions' },
  { icon: 'network' as const, label: 'Reliable Network Infrastructure' },
  { icon: 'headset' as const, label: '24/7 Managed IT Support' },
]

// Renders HeroText uppercased with the second word picked out in brand
// red, matching the reference's TECHNOLOGY / SOLUTIONS (red) / THAT DRIVE
// TOMORROW treatment. Falls back to a plain heading for short strings.
function AccentHeading({ text }: { text: string }) {
  const words = text.split(' ')
  if (words.length < 2) {
    return <>{text}</>
  }
  return (
    <>
      {words[0]} <span className="text-primary_red">{words[1]}</span>{' '}
      {words.slice(2).join(' ')}
    </>
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
              imgClassName="hero-image-drift object-cover"
              videoClassName="absolute inset-0 h-full w-full object-cover"
              priority={i === 0}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            />
          </div>
        ),
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
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-white to-[#f7ecec] min-h-[520px]">
      {images.length > 0 && (
        <div className="absolute inset-0">
          <HeroBackground images={images} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,white_0%,white_58%,rgba(255,255,255,0.8)_70%,transparent_88%)] sm:bg-[linear-gradient(90deg,white_0%,white_32%,rgba(255,255,255,0.75)_45%,transparent_62%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary_red/25 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-primary_red/8 via-transparent to-transparent" />
        </div>
      )}

      {images.length > 0 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="hero-beam text-primary_red" style={{ left: '46%', width: '3px' }} />
          <span
            className="hero-beam text-amber-400"
            style={{ left: '62%', width: '2px', animationDelay: '-3s', animationDuration: '11s' }}
          />
          <span
            className="hero-beam text-primary_red"
            style={{ left: '78%', width: '4px', animationDelay: '-6s', animationDuration: '8s' }}
          />
          <span
            className="hero-beam text-amber-400"
            style={{ left: '92%', width: '2px', animationDelay: '-2s', animationDuration: '12s' }}
          />
        </div>
      )}

      {images.length > 0 && (
        <div
          className="pointer-events-none absolute left-[35%] top-0 bottom-0 z-10 hidden sm:flex items-end gap-4"
          aria-hidden="true"
        >
          <span className="w-9 sm:w-12 h-[58%] rounded-t-full bg-gradient-to-t from-red-600/10 via-red-500/70 to-red-400/95" />
          <span className="w-9 sm:w-12 h-[89%] rounded-t-full bg-gradient-to-t from-red-600/10 via-red-500/80 to-red-400" />
          <span className="w-9 sm:w-12 h-[70%] rounded-t-full bg-gradient-to-t from-red-600/10 via-red-500/75 to-red-400/95" />
        </div>
      )}

      <div className="relative z-30 container mx-auto px-4 sm:px-6 pt-8 pb-32 sm:pb-24 md:pt-10 md:pb-14">
        <div className="max-w-xl">
          <Eyebrow className="mb-2">IT Infrastructure · Cybersecurity · Digital Growth</Eyebrow>
          {HeroText && (
            <h1 className="uppercase font-black leading-[0.97] tracking-tight text-[clamp(1.75rem,4.2vw,3rem)] text-foreground text-wrap-balance">
              <AccentHeading text={HeroText} />
            </h1>
          )}
          {subText && (
            <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600 max-w-lg">
              {subText}
            </p>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-5 flex w-full flex-col sm:flex-row gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} size="default" className="w-full sm:w-auto" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="absolute z-20 left-4 right-4 bottom-10 sm:left-6 sm:right-auto sm:bottom-12 max-w-2xl rounded-2xl bg-white/95 backdrop-blur-sm shadow-[0_18px_50px_-15px_rgba(0,0,0,0.25)] px-4 py-3 sm:px-5 sm:py-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:justify-between gap-x-4 gap-y-3">
            {HERO_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary_red/10">
                  <ServiceIcon preset={f.icon} className="h-[15px] w-[15px] text-primary_red" />
                </span>
                <span className="text-[11px] sm:text-xs font-medium leading-tight text-foreground">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
