import type { TeamConvergenceBlock as TeamConvergenceBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import {
  ArrowRight,
  Camera,
  ChevronsDown,
  KeyRound,
  Mail,
  Network,
  Presentation,
  Server,
  ShieldCheck,
  UsersRound,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

// Best-effort icon per scattered item, matched by keyword.
function getItemIcon(text?: string | null): LucideIcon {
  const t = (text || '').toLowerCase()
  if (t.includes('wi-fi') || t.includes('wifi')) return Wifi
  if (t.includes('network')) return Network
  if (t.includes('server')) return Server
  if (t.includes('cyber') || t.includes('security')) return ShieldCheck
  if (t.includes('cctv') || t.includes('camera')) return Camera
  if (t.includes('access control')) return KeyRound
  if (t.includes('av') || t.includes('audio') || t.includes('video')) return Presentation
  if (t.includes('365') || t.includes('microsoft') || t.includes('email')) return Mail
  return Network
}

// Small alternating tilt per chip so the "before" state reads as scattered
// rather than another tidy grid — kept subtle (max 3deg) so text stays crisp.
const TILTS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5, -1, 2]

type Props = {
  className?: string
} & TeamConvergenceBlockProps

export const TeamConvergenceBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  items = [],
  teamLabel,
  ctaLabel,
  ctaUrl,
}) => {
  const safeItems = items || []
  if (safeItems.length === 0) return null

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-7 max-w-2xl text-center md:mb-8">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          {/* Scattered — fragmented vendors/specialties, muted and loosely tilted */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {safeItems.map((item, index) => {
              const Icon = getItemIcon(item.text)
              return (
                <span
                  key={item.id || index}
                  style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-600"
                >
                  <Icon className="h-3.5 w-3.5 flex-none text-gray-400" />
                  {item.text}
                </span>
              )
            })}
          </div>

          <ChevronsDown className="h-7 w-7 flex-none text-gray-300" strokeWidth={2.5} />

          {/* Destination — one unified, branded team */}
          <div className="inline-flex items-center gap-3 rounded-2xl bg-primary_red px-7 py-4 shadow-[0_16px_36px_-16px_rgba(201,14,29,0.55)] md:px-9 md:py-5">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/15 text-white">
              <UsersRound className="h-5 w-5" />
            </span>
            <span className="text-base font-bold uppercase tracking-wide text-white md:text-lg">{teamLabel}</span>
          </div>
        </Reveal>

        {ctaLabel && ctaUrl && (
          <div className="mt-6 flex justify-center md:mt-7">
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 rounded-full border border-primary_red px-6 py-3 text-sm font-semibold text-primary_red transition-colors hover:bg-[#FDEBEC]"
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
