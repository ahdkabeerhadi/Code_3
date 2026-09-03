import { cn } from '@/utilities/ui'
import { Sparkles } from 'lucide-react'
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
        'flex flex-col justify-center rounded-2xl p-6 text-center transition-all duration-300',
        hasResult
          ? 'border-2 border-primary_red/20 bg-gradient-to-br from-[#FDEBEC] to-white shadow-md'
          : 'border-2 border-dashed border-gray-200 bg-white/60',
      )}
    >
      {hasResult ? (
        <>
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary_red text-white shadow-lg shadow-primary_red/30">
            <Sparkles className="h-6 w-6" />
          </span>
          {eyebrow && <div className="text-xs font-bold uppercase tracking-wider text-primary_red">{eyebrow}</div>}
          {headline && <div className="mt-2 text-2xl font-extrabold text-foreground md:text-3xl">{headline}</div>}
          {children && <div className="mt-3 text-sm leading-relaxed text-gray-600">{children}</div>}
        </>
      ) : (
        <>
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <Sparkles className="h-6 w-6" />
          </span>
          <p className="text-sm text-gray-500">{emptyText}</p>
        </>
      )}
    </div>
  )
}
