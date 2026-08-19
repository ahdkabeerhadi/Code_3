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

// Renders HeroText uppercased with one key word picked out in brand red,
// matching the reference's black/red/black headline treatment. Falls back
// to a plain heading if the word isn't present, so this never breaks if
// the copy changes.
function AccentHeading({ text }: { text: string }) {
  const accentWord = 'Solution'
  const idx = text.indexOf(accentWord)
  if (idx === -1) {
    return <>{text}</>
  }
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary_red">{text.slice(idx, idx + accentWord.length)}</span>
      {text.slice(idx + accentWord.length)}
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
              imgClassName="object-cover"
              videoClassName="absolute inset-0 h-full w-full object-cover"
              priority={i === 0}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            />
          </div>
        ),
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show background ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50',
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
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-white to-[#f7ecec]">
      <div className="relative container mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-center">
          <div>
            <Eyebrow>IT Infrastructure · Cybersecurity · Digital Growth</Eyebrow>
            {HeroText && (
              <h1 className="uppercase font-black leading-[0.95] tracking-tight text-[clamp(2.5rem,6vw,4.5rem)] text-foreground text-wrap-balance">
                <AccentHeading text={HeroText} />
              </h1>
            )}
            {subText && (
              <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600 max-w-lg">
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

          <div className="relative">
            {images.length > 0 && (
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[28px] overflow-hidden">
                <HeroBackground images={images} />
                <div
                  className="pointer-events-none absolute left-[4%] bottom-0 z-10 flex items-end gap-2.5 sm:gap-3 opacity-80 mix-blend-plus-lighter"
                  aria-hidden="true"
                >
                  <span className="w-7 sm:w-9 h-[30%] rounded-t-full bg-gradient-to-t from-transparent via-primary_red to-red-400" />
                  <span className="w-7 sm:w-9 h-[52%] rounded-t-full bg-gradient-to-t from-transparent via-primary_red to-red-400" />
                  <span className="w-7 sm:w-9 h-[40%] rounded-t-full bg-gradient-to-t from-transparent via-primary_red to-red-400" />
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div className="absolute -bottom-6 inset-x-4 sm:inset-x-6 rounded-2xl bg-white/95 backdrop-blur-sm shadow-[0_18px_50px_-15px_rgba(0,0,0,0.25)] px-5 py-5 sm:px-6">
                <div className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:justify-between gap-x-4 gap-y-5">
                  {HERO_FEATURES.map((f) => (
                    <div key={f.label} className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary_red/10">
                        <ServiceIcon preset={f.icon} className="h-[18px] w-[18px] text-primary_red" />
                      </span>
                      <span className="text-xs sm:text-[13px] font-medium leading-tight text-foreground">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
