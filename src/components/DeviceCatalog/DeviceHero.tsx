'use client'

import React, { useMemo, useState } from 'react'
import type { Device, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { useDeviceCart } from '@/providers/DeviceCart'
import { DeviceEnquiryForm } from './DeviceEnquiryForm'

function ImageGallery({ device }: { device: Device }) {
  const images = useMemo(() => {
    const galleryImages = (device.gallery || [])
      .map((g) => g.image)
      .filter((img): img is MediaType => typeof img === 'object' && img !== null)
    if (galleryImages.length > 0) return galleryImages
    if (device.image && typeof device.image === 'object') return [device.image]
    return []
  }, [device])

  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-gray-50">
        {activeImage ? (
          <Media
            resource={activeImage}
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

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id || i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square w-16 flex-none overflow-hidden rounded-lg border bg-gray-50 transition-colors ${
                i === activeIndex ? 'border-primary_red' : 'border-border hover:border-primary_red/40'
              }`}
            >
              <Media resource={img} fill size="64px" imgClassName="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function DeviceHero({ device }: { device: Device }) {
  const [submitted, setSubmitted] = useState(false)
  const { addItem, removeItem, isInCart } = useDeviceCart()
  const inCart = isInCart(device.id)

  return (
    <section className="bg-white pt-8 pb-10 md:pt-10">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_380px]">
        <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
          <ImageGallery device={device} />

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

            <Button
              variant={inCart ? 'outline' : 'default'}
              className="mt-6 w-full"
              onClick={() =>
                inCart
                  ? removeItem(device.id)
                  : addItem({ id: device.id, title: device.title, brand: device.brand })
              }
            >
              {inCart ? 'Added to Quote Cart' : 'Add to Cart'}
            </Button>
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
