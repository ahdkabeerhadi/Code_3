'use client'

import React, { useState } from 'react'
import type { Device } from '@/payload-types'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { DeviceEnquiryForm } from './DeviceEnquiryForm'

type BrandHeroContent = {
  title?: string | null
  subtitle?: string | null
  enquiryHeading?: string | null
}

export function BrandHero({
  brand,
  hero,
}: {
  brand: Device['brand']
  hero?: BrandHeroContent | null
}) {
  const [submitted, setSubmitted] = useState(false)

  const title = hero?.title || `${brand} Video Conferencing Devices`
  const subtitle =
    hero?.subtitle ||
    `Genuine ${brand} video conferencing hardware for huddle, small/medium, and large rooms. Add devices to your quote cart or enquire directly for pricing and availability.`
  const enquiryHeading = hero?.enquiryHeading || `Enquire About ${brand} Devices`

  return (
    <section className="bg-white pt-8 pb-10 md:pt-10">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_380px]">
        <Reveal className="max-w-2xl">
          <Eyebrow>Video Conferencing Devices</Eyebrow>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{subtitle}</p>
        </Reveal>

        <Reveal delayMs={100} className="rounded-2xl border border-border bg-white p-5 shadow-sm lg:mt-0">
          {submitted ? (
            <div className="py-2">
              <p className="text-sm font-semibold text-foreground">Thanks for reaching out!</p>
              <p className="mt-1 text-sm text-gray-600">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-base font-semibold text-foreground">{enquiryHeading}</h3>
              <div className="mt-3">
                <DeviceEnquiryForm
                  deviceNames={[`${brand} Video Conferencing Devices`]}
                  onSuccess={() => setSubmitted(true)}
                />
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
