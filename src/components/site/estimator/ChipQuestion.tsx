import { cn } from '@/utilities/ui'
import { Check, type LucideIcon } from 'lucide-react'

export function ChipQuestion({
  label,
  Icon,
  options,
  value,
  onChange,
}: {
  label?: string | null
  Icon: LucideIcon
  options: { text: string; id?: string | null }[]
  value: number | null
  onChange: (index: number) => void
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red">
          <Icon className="h-5 w-5" />
        </span>
        <label className="text-base font-semibold text-foreground">{label}</label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt.id || i}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
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
    </div>
  )
}
