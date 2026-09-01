import type { IconFeatureGridBlock as IconFeatureGridBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import {
  ArrowRight,
  Cable,
  Camera,
  Laptop,
  LayoutGrid,
  Mail,
  Network,
  Phone,
  Server,
  ShieldCheck,
  Video,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

// Best-effort icon per item, matched by keyword.
function getItemIcon(text?: string | null): LucideIcon {
  const t = (text || '').toLowerCase()
  if (t.includes('workstation')) return Laptop
  if (t.includes('wi-fi') || t.includes('wifi')) return Wifi
  if (t.includes('network')) return Network
  if (t.includes('server') || t.includes('cloud')) return Server
  if (t.includes('cyber') || t.includes('security')) return ShieldCheck
  if (t.includes('cctv') || t.includes('access control') || t.includes('camera')) return Camera
  if (t.includes('meeting')) return Video
  if (t.includes('365') || t.includes('microsoft') || t.includes('email')) return Mail
  if (t.includes('communication') || t.includes('phone') || t.includes('call')) return Phone
  if (t.includes('cabling') || t.includes('cable')) return Cable
  return LayoutGrid
}

type Props = {
  className?: string
} & IconFeatureGridBlockProps

export const IconFeatureGridBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  items = [],
  ctaLabel,
  ctaUrl,
}) => {
  const safeItems = items || []
  if (safeItems.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-6 max-w-2xl text-center md:mb-7">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal
          delayMs={100}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4"
        >
          {safeItems.map((item, index) => {
            const Icon = getItemIcon(item.text)
            return (
              <div
                key={item.id || index}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary_red/30 hover:shadow-md md:p-5"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-foreground">{item.text}</span>
              </div>
            )
          })}
        </Reveal>

        {ctaLabel && ctaUrl && (
          <div className="mt-6 flex flex-col items-center gap-3 text-center md:mt-7">
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary_red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
