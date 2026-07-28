'use client'

import React, { useState } from 'react'
import type { PartnersDirectoryBlock as PartnersDirectoryBlockProps } from 'src/payload-types'
import type { Media as MediaType } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & PartnersDirectoryBlockProps

const HOVER_COLORS: Record<string, string> = {
  acronis: '#77BC1F',
  avaya: '#CD1D45',
  barco: '#004B8D',
  biamp: '#0072CE',
  bose: '#000000',
  buffalo: '#F58220',
  cisco: '#049FD9',
  clearone: '#0072CE',
  clevertouch: '#00A99D',
  crestron: '#000000',
  fortinet: '#EE3124',
  huawei: '#FF0000',
  logitech: '#00B8FC',
  jbl: '#FF6600',
  maxhub: '#0057B8',
  microsoft: '#F25022',
  onescreen: '#0072CE',
  poly: '#EE3831',
  qnap: '#D4021D',
  qsc: '#000000',
  safetica: '#0072CE',
  sennheiser: '#000000',
  shure: '#0072CE',
  sophos: '#004B87',
  synology: '#003D79',
  ubiquiti: '#0559C9',
  yamaha: '#4B0082',
  yealink: '#00A0E9',
  yeastar: '#00A99D',
  dell: '#007DB8',
  hp: '#0096D6',
  ruijie: '#E60012',
}

function getHoverColor(name: string): string {
  const key = name.trim().toLowerCase()
  return HOVER_COLORS[key] || '#C90E1D'
}

function PartnerCell({
  name,
  logo,
}: {
  name: string
  logo?: string | MediaType | null
}) {
  const [failed, setFailed] = useState(false)
  const hoverColor = getHoverColor(name)

  return (
    <div className="group flex h-28 items-center justify-center border-b border-r border-border bg-white p-4 transition-all duration-300 hover:z-10 hover:scale-110 hover:shadow-lg md:h-32">
      {logo && !failed ? (
        <Media
          resource={logo}
          imgClassName="h-14 w-auto max-w-[140px] object-contain grayscale transition-all duration-300 group-hover:grayscale-0 md:h-16"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-center text-sm font-bold text-black md:text-base">
          <span className="group-hover:hidden">{name}</span>
          <span className="hidden group-hover:inline" style={{ color: hoverColor }}>
            {name}
          </span>
        </span>
      )}
    </div>
  )
}

export const PartnersDirectoryBlock: React.FC<Props> = ({ className, title, subtitle, partners = [] }) => {
  const safePartners = partners || []
  if (safePartners.length === 0) return null

  return (
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <Eyebrow>TECHNOLOGY PARTNERS</Eyebrow>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-500 md:text-base">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {safePartners.map((partner, i) => (
            <PartnerCell key={partner.id || i} name={partner.name} logo={partner.logo} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
