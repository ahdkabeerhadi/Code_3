import { cn } from '@/utilities/ui'
import { Check, type LucideIcon } from 'lucide-react'

export function ChipQuestion({
  label,
  Icon,
  options,
  value,
  onChange,
  error,
}: {
  label?: string | null
  Icon: LucideIcon
  options: { text: string; id?: string | null }[]
  value: number | null
  onChange: (index: number) => void
  error?: boolean
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red">
          <Icon className="h-5 w-5" />
        </span>
        <label className="text-sm font-semibold text-foreground">{label}</label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt.id || i}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              value === i
                ? 'border-primary_red bg-primary_red text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary_red/50 hover:bg-[#FDEBEC] hover:text-primary_red',
            )}
          >
            {value === i && <Check className="h-3.5 w-3.5" />}
            {opt.text}
          </button>
        ))}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-primary_red">Please select an option.</p>}
    </div>
  )
}
