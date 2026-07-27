import React from 'react'
import Link from 'next/link'

export function CtaButton({
  text,
  label,
  url,
  className,
}: {
  text?: string | null
  label?: string | null
  url?: string | null
  className?: string
}) {
  if (!label || !url) return null

  return (
    <div
      className={`flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary_red/20 bg-primary_red/5 px-6 py-5 sm:flex-row ${className || ''}`}
    >
      {text && <p className="text-sm font-medium text-foreground sm:text-base">{text}</p>}
      <Link
        href={url}
        className="group inline-flex flex-none items-center gap-2.5 rounded-full bg-primary_red px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary_red/20 transition-all duration-300 hover:scale-[1.03] hover:bg-secondary_red hover:shadow-lg hover:shadow-primary_red/30 active:scale-[0.98]"
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
    </div>
  )
}
