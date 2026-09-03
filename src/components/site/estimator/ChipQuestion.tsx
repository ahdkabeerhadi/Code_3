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
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red">
          <Icon className="h-6 w-6" />
        </span>
        <label className="text-xl font-semibold text-foreground">{label}</label>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((opt, i) => (
          <button
            key={opt.id || i}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-5 py-3 text-base font-medium transition-all duration-150 active:scale-95',
              value === i
                ? 'border-primary_red bg-primary_red text-white shadow-sm shadow-primary_red/20'
                : 'border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-primary_red/50 hover:bg-[#FDEBEC] hover:text-primary_red hover:shadow-sm',
            )}
          >
            {value === i && <Check className="h-4 w-4" />}
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  )
}
