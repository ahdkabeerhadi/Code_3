'use client'

import React, { useState } from 'react'
import type { AccreditationsBlock as AccreditationsBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & AccreditationsBlockProps

type AccreditationItem = NonNullable<AccreditationsBlockProps['items']>[number]

function Badge({ name, badge }: { name: string; badge: AccreditationItem['badge'] }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border p-6 text-center transition-colors duration-300 hover:border-primary_red">
      {badge && !failed ? (
        <Media
          resource={badge}
          imgClassName="h-16 w-auto max-w-[140px] object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-foreground">{name}</span>
      )}
    </div>
  )
}

export const AccreditationsBlock: React.FC<Props> = ({ className, title, items = [] }) => {
  const safeItems = items || []
  if (safeItems.length === 0) return null

  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>ACCREDITATIONS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {safeItems.map((item, i) => (
            <Badge key={item.id || i} name={item.name} badge={item.badge} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
