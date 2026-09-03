import { cn } from '@/utilities/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function WizardProgress({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
        <span>
          Step {current + 1} of {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary_red transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function WizardBackLink({ show, onBack }: { show: boolean; onBack: () => void }) {
  if (!show) return null
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    </div>
  )
}

export function WizardNav({
  showBack,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  showBack: boolean
  onBack: () => void
  onNext: () => void
  nextLabel: string
  nextDisabled: boolean
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          'group inline-flex items-center gap-2 rounded-full bg-primary_red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary_red',
          nextDisabled && 'cursor-not-allowed opacity-40 hover:bg-primary_red',
        )}
      >
        {nextLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
