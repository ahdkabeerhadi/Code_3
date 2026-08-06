'use client'

import React, { useState } from 'react'
import type { Device } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { DeviceEnquiryForm } from './DeviceEnquiryForm'

export function DeviceHero({ device }: { device: Device }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-white pt-8 pb-10 md:pt-10">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_380px]">
        <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center">
          <div>
            <Eyebrow>
              {device.brand}
              {device.roomSize ? ` · ${device.roomSize}` : ''}
            </Eyebrow>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {device.title}
            </h1>
            {device.shortDescription && (
              <p className="mt-4 text-gray-600 leading-relaxed">{device.shortDescription}</p>
            )}
            {device.priceLabel && (
              <p className="mt-4 text-sm font-semibold text-foreground">{device.priceLabel}</p>
            )}
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-gray-50">
            {device.image && typeof device.image === 'object' ? (
              <Media
                resource={device.image}
                fill
                size="(max-width: 768px) 100vw, 400px"
                imgClassName="object-contain p-8"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold uppercase tracking-wider text-gray-400">
                {device.brand}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delayMs={100} className="rounded-2xl border border-border bg-white p-5 shadow-sm lg:mt-0">
          {submitted ? (
            <div className="py-2">
              <p className="text-sm font-semibold text-foreground">Thanks for reaching out!</p>
              <p className="mt-1 text-sm text-gray-600">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-base font-semibold text-foreground">Enquire About This Device</h3>
              <div className="mt-3">
                <DeviceEnquiryForm deviceNames={[device.title]} onSuccess={() => setSubmitted(true)} />
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
