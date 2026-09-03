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
    <div className="animate-result-pop rounded-2xl bg-[#FDEBEC] p-8 text-center sm:p-12">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary_red text-white">
        <Check className="h-6 w-6" strokeWidth={3} />
      </span>
      {eyebrow && <div className="text-sm font-bold uppercase tracking-wider text-primary_red">{eyebrow}</div>}
      {headline && <div className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{headline}</div>}
      {children && <div className="mt-4 text-base leading-relaxed text-gray-600">{children}</div>}
    </div>
  )
}
