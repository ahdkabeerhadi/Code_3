import React from 'react'
import type { IndustriesBlock as IndustriesBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { ServiceIcon } from '@/components/site/icons'

type Props = {
  className?: string
} & IndustriesBlockProps

export const IndustriesBlock: React.FC<Props> = ({ className, badge, title, items = [] }) => {
  const safeItems = items || []
  if (safeItems.length === 0) return null

  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        </Reveal>

        <Reveal
          delayMs={100}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {safeItems.map((item, i) => (
            <div
              key={item.id || i}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border p-6 text-center transition-colors duration-300 hover:border-primary_red"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-primary_red/40 transition-colors duration-300 group-hover:border-primary_red">
                <ServiceIcon preset={item.icon} className="h-5 w-5 text-primary_red" />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.name}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
