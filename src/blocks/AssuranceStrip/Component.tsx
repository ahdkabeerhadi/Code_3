import type { AssuranceStripBlock as AssuranceStripBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & AssuranceStripBlockProps

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 flex-none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 flex-none">
      <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24L3 3v6.59a2 2 0 00.59 1.41l9.59 9.59a2 2 0 002.82 0l4.59-4.59a2 2 0 000-2.82z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 flex-none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 flex-none">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const ICONS: Record<string, React.FC> = {
  shield: ShieldIcon,
  tag: TagIcon,
  document: DocumentIcon,
  camera: CameraIcon,
  check: CheckIcon,
}

export const AssuranceStripBlock: React.FC<Props> = ({ className, items = [] }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('bg-white py-6', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal
          className={cn(
            'grid grid-cols-1 gap-3 rounded-2xl border border-border bg-gray-50/60 p-5',
            items.length >= 2 && 'sm:grid-cols-2',
            items.length >= 3 && 'lg:grid-cols-3',
            items.length >= 4 && 'lg:grid-cols-4',
          )}
        >
          {items.map((item, index) => {
            const Icon = ICONS[item.icon || 'shield']
            return (
              <div key={item.id || index} className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FDEBEC] text-primary_red">
                  <Icon />
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-gray-600">{item.text}</div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
