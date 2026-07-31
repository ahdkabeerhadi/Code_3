'use client'

import type { DowntimeEstimatorBlock as DowntimeEstimatorBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'

type Props = {
  className?: string
} & DowntimeEstimatorBlockProps

export const DowntimeEstimatorBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  subtitle,
  workstationsLabel,
  serversLabel,
  tiers = [],
  disclaimer,
  ctaLabel,
  ctaUrl,
}) => {
  const [workstations, setWorkstations] = useState<number | ''>('')
  const [servers, setServers] = useState<number | ''>('')

  const result = useMemo(() => {
    if (!tiers || tiers.length === 0) return null
    if (workstations === '' && servers === '') return null

    const ws = typeof workstations === 'number' ? workstations : 0
    const srv = typeof servers === 'number' ? servers : 0

    const match = tiers.find((tier) => ws <= (tier.maxWorkstations ?? 0) && srv <= (tier.maxServers ?? 0))
    return match || tiers[tiers.length - 1]
  }, [workstations, servers, tiers])

  if (!tiers || tiers.length === 0) return null

  const fieldClassName =
    'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red'

  return (
    <section className={cn('bg-white py-7 md:py-9', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-6">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>}
        </Reveal>

        <Reveal delayMs={100} className="overflow-hidden rounded-2xl border border-border bg-gray-50/60">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {workstationsLabel}
                </label>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder="e.g. 20"
                  value={workstations}
                  onChange={(e) => setWorkstations(e.target.value === '' ? '' : Number(e.target.value))}
                  className={fieldClassName}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {serversLabel}
                </label>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder="e.g. 2"
                  value={servers}
                  onChange={(e) => setServers(e.target.value === '' ? '' : Number(e.target.value))}
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-white p-5 shadow-sm">
              {result ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary_red">
                    {result.label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-foreground">{result.estimate}</div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Enter your workstation and server counts to see an estimated move window.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            {disclaimer && <p className="text-xs text-gray-500">{disclaimer}</p>}
            {ctaLabel && ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-flex flex-none items-center gap-2 rounded-full bg-primary_red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-secondary_red"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
