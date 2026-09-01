'use client'

import type { OfficeBlueprintBlock as OfficeBlueprintBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  Camera,
  CheckSquare2,
  Globe,
  HardDrive,
  KeyRound,
  Laptop,
  Monitor,
  Network,
  Server,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Video,
  Volume2,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

// Best-effort icon per item, matched by keyword. Ordered so multi-word
// phrases are checked before the generic word they contain.
function getItemIcon(text?: string | null): LucideIcon {
  const t = (text || '').toLowerCase()
  if (t.includes('network security')) return ShieldCheck
  if (t.includes('access control')) return KeyRound
  if (t.includes('visitor')) return UserCheck
  if (t.includes('wi-fi') || t.includes('wifi')) return Wifi
  if (t.includes('cctv')) return Camera
  if (t.includes('pc') || t.includes('laptop') || t.includes('computer')) return Laptop
  if (t.includes('power') || t.includes('ups')) return BatteryCharging
  if (t.includes('internet')) return Globe
  if (t.includes('video')) return Video
  if (t.includes('display')) return Monitor
  if (t.includes('audio')) return Volume2
  if (t.includes('rack')) return Server
  if (t.includes('firewall')) return ShieldAlert
  if (t.includes('switch')) return Cable
  if (t.includes('storage')) return HardDrive
  if (t.includes('network')) return Network
  return CheckSquare2
}

type Props = {
  className?: string
} & OfficeBlueprintBlockProps

// Fixed floor-plan slots, matched to the CMS zone order (see config admin
// description). Reception/Meeting Rooms sit up front, Server Room/Workstations
// behind them; Security (index 4) is drawn as a site-wide perimeter, not a room.
const ROOM_SLOTS = [
  { zoneIndex: 0, area: 'reception', minHeight: 'min-h-[110px]' },
  { zoneIndex: 2, area: 'meeting', minHeight: 'min-h-[110px]' },
  { zoneIndex: 3, area: 'server', minHeight: 'min-h-[150px]' },
  { zoneIndex: 1, area: 'workstations', minHeight: 'min-h-[150px]' },
] as const

export const OfficeBlueprintBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  subtitle,
  zones = [],
  ctaLabel,
  ctaUrl,
}) => {
  const safeZones = zones || []
  const [active, setActive] = useState(0)
  if (safeZones.length < 5) return null

  const activeZone = safeZones[active]
  const isPerimeter = active === 4

  return (
    <section className={cn('bg-white py-10 md:py-14', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          {badge && <Eyebrow className="justify-center">{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
          {/* Blueprint */}
          <div
            className="relative rounded-2xl border-2 border-dashed border-primary_red/35 p-5 pt-8 md:p-7 md:pt-9"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              backgroundColor: '#fbfbfb',
            }}
          >
            <button
              type="button"
              onClick={() => setActive(4)}
              className={cn(
                'absolute -top-4 left-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition-colors',
                isPerimeter
                  ? 'border-primary_red bg-primary_red text-white'
                  : 'border-primary_red/40 bg-white text-primary_red hover:bg-[#FDEBEC]',
              )}
            >
              <span className="font-mono">05</span> {safeZones[4]?.name}
            </button>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {ROOM_SLOTS.map(({ zoneIndex, minHeight }) => {
                const zone = safeZones[zoneIndex]
                if (!zone) return null
                const isActive = active === zoneIndex && !isPerimeter
                return (
                  <button
                    key={zoneIndex}
                    type="button"
                    onClick={() => setActive(zoneIndex)}
                    className={cn(
                      'flex flex-col items-start justify-start gap-2 rounded-xl border-2 border-dashed p-3.5 text-left transition-colors md:p-4',
                      minHeight,
                      isActive
                        ? 'border-primary_red bg-[#FDEBEC]/70'
                        : 'border-gray-300 bg-white/70 hover:border-primary_red/40 hover:bg-[#FDEBEC]/30',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 flex-none items-center justify-center rounded-full font-mono text-xs font-semibold',
                        isActive ? 'bg-primary_red text-white' : 'bg-gray-900/5 text-gray-500',
                      )}
                    >
                      {String(zoneIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{zone.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex flex-col rounded-2xl border border-border bg-gray-50/60 p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="font-mono text-primary_red">{String(active + 1).padStart(2, '0')}</span>
              <span>—</span>
              <span>{activeZone?.name}</span>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              {(activeZone?.items || []).map((item, i) => {
                const Icon = getItemIcon(item.text)
                return (
                  <div
                    key={item.id || i}
                    className={cn(
                      'flex items-center gap-2.5 py-2 text-sm font-medium text-foreground',
                      i > 0 && 'border-t border-border/70',
                    )}
                  >
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-primary_red/10 text-primary_red">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {item.text}
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {ctaLabel && ctaUrl && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center md:mt-12">
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
