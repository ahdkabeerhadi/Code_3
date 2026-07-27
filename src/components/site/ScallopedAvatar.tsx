import React from 'react'
import { cn } from '@/utilities/ui'

const BUMPS = 12
const BUMP_RADIUS = 9
const CENTER_RADIUS = 34

const bumpPoints = Array.from({ length: BUMPS }, (_, i) => {
  const angle = (i / BUMPS) * Math.PI * 2
  return {
    cx: 50 + CENTER_RADIUS * Math.cos(angle),
    cy: 50 + CENTER_RADIUS * Math.sin(angle),
  }
})

export function ScallopedAvatar({
  initials,
  className,
}: {
  initials: string
  className?: string
}) {
  return (
    <div className={cn('relative flex-none text-foreground', className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="32" fill="currentColor" />
        {bumpPoints.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={BUMP_RADIUS} fill="currentColor" />
        ))}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
        {initials}
      </span>
    </div>
  )
}
