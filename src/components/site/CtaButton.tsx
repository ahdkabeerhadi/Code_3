import React from 'react'
import Link from 'next/link'

export function CtaButton({
  label,
  url,
  className,
}: {
  label?: string | null
  url?: string | null
  className?: string
}) {
  if (!label || !url) return null

  return (
    <Link
      href={url}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-primary_red px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary_red/20 transition-all duration-300 hover:scale-[1.03] hover:bg-secondary_red hover:shadow-lg hover:shadow-primary_red/30 active:scale-[0.98] ${className || ''}`}
    >
      {label}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="flex-none transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M3.333 8h9.334M8.667 3.667L13 8l-4.333 4.333"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
