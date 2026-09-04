import type { LucideIcon } from 'lucide-react'

export function NumberField({
  label,
  Icon,
  placeholder,
  value,
  onChange,
}: {
  label?: string | null
  Icon: LucideIcon
  placeholder: string
  value: number | ''
  onChange: (value: number | '') => void
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-[#FDEBEC] text-primary_red">
          <Icon className="h-6 w-6" />
        </span>
        <label className="text-xl font-semibold text-foreground">{label}</label>
      </div>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-lg text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary_red focus:ring-4 focus:ring-primary_red/10"
      />
    </div>
  )
}
