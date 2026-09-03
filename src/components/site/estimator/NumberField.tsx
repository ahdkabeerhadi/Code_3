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
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary_red/10 text-primary_red">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-600">{label}</label>
      </div>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red"
      />
      {error && <p className="mt-1.5 text-xs font-medium text-primary_red">Required.</p>}
    </div>
  )
}
