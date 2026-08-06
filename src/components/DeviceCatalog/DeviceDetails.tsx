'use client'

import React, { useState } from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'

export function DeviceDetails({ device }: { device: Device }) {
  const hasFeatures = device.keyFeatures && device.keyFeatures.length > 0
  const hasSpecs = device.specGroups && device.specGroups.length > 0
  const [activeTab, setActiveTab] = useState<'features' | 'specs'>(hasFeatures ? 'features' : 'specs')

  if (!hasFeatures && !hasSpecs) return null

  return (
    <section className="bg-white pt-2 pb-8 md:pt-3 md:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>DETAILS</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {device.title}
          </h2>
        </Reveal>

        <div className="mt-6 flex max-w-3xl gap-6 border-b border-border">
          {hasFeatures && (
            <button
              onClick={() => setActiveTab('features')}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeTab === 'features'
                  ? 'border-primary_red text-primary_red'
                  : 'border-transparent text-gray-400 hover:text-foreground'
              }`}
            >
              Top 5 Key Features
            </button>
          )}
          {hasSpecs && (
            <button
              onClick={() => setActiveTab('specs')}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeTab === 'specs'
                  ? 'border-primary_red text-primary_red'
                  : 'border-transparent text-gray-400 hover:text-foreground'
              }`}
            >
              Technical Specifications
            </button>
          )}
        </div>

        <div className="relative mt-6 max-w-3xl overflow-hidden">
          {hasFeatures && (
            <div
              className={`transition-all duration-300 ${
                activeTab === 'features'
                  ? 'translate-x-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 -translate-x-4 opacity-0'
              }`}
            >
              <ol className="space-y-4">
                {device.keyFeatures!.map((feature, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary_red text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="text-gray-600 leading-relaxed">
                      <span className="font-semibold text-foreground">{feature.title}: </span>
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {hasSpecs && (
            <div
              className={`transition-all duration-300 ${
                activeTab === 'specs'
                  ? 'translate-x-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 translate-x-4 opacity-0'
              }`}
            >
              <dl className="space-y-4">
                {device.specGroups!.map((group, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <dt className="text-sm font-semibold text-primary_red">{group.label}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {(group.specs || []).map((s) => s.spec).join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
