import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

export function EstimatorResultPanel({
  eyebrow,
  headline,
  children,
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="animate-result-pop rounded-2xl bg-[#FDEBEC] p-6 text-center sm:p-8">
      <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary_red text-white">
        <Check className="h-5 w-5" strokeWidth={3} />
      </span>
      {eyebrow && <div className="text-xs font-bold uppercase tracking-wider text-primary_red">{eyebrow}</div>}
      {headline && <div className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{headline}</div>}
      {children && <div className="mt-3 text-sm leading-relaxed text-gray-600">{children}</div>}
    </div>
  )
}
