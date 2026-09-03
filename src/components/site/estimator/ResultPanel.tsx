import { cn } from '@/utilities/ui'
import type { ReactNode } from 'react'

export function EstimatorResultPanel({
  hasResult,
  eyebrow,
  headline,
  children,
  emptyText,
}: {
  hasResult: boolean
  eyebrow?: ReactNode
  headline?: ReactNode
  children?: ReactNode
  emptyText: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center rounded-2xl p-6 text-center',
        hasResult ? 'bg-[#FDEBEC]' : 'bg-gray-50',
      )}
    >
      {hasResult ? (
        <>
          {eyebrow && <div className="text-xs font-bold uppercase tracking-wider text-primary_red">{eyebrow}</div>}
          {headline && <div className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{headline}</div>}
          {children && <div className="mt-3 text-sm leading-relaxed text-gray-600">{children}</div>}
        </>
      ) : (
        <p className="text-sm text-gray-500">{emptyText}</p>
      )}
    </div>
  )
}
