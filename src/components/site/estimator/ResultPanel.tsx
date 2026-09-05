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
    <div className="animate-result-pop rounded-2xl border border-primary_red/15 bg-gradient-to-br from-[#FDEBEC] to-[#FBD9DC] p-8 text-center shadow-[0_16px_40px_-16px_rgba(214,32,54,0.35)] sm:p-12">
      <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary_red text-white shadow-lg shadow-primary_red/30 ring-8 ring-primary_red/10">
        <Check className="h-7 w-7" strokeWidth={3} />
      </span>
      {eyebrow && <div className="text-sm font-bold uppercase tracking-wider text-primary_red">{eyebrow}</div>}
      {headline && <div className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{headline}</div>}
      {children && <div className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-600">{children}</div>}
    </div>
  )
}
