import type { LucideIcon } from 'lucide-react'

export function NumberField({
  label,
  Icon,
  placeholder,
  value,
  onChange,
  error,
}: {
  label?: string | null
  Icon: LucideIcon
  placeholder: string
  value: number | ''
  onChange: (value: number | '') => void
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
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red"
      />
      {error && <p className="mt-1.5 text-xs font-medium text-primary_red">Required.</p>}
    </div>
  )
}
