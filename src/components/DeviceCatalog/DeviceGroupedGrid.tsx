'use client'

import React, { useMemo, useState } from 'react'
import type { Device } from '@/payload-types'
import { Reveal } from '@/components/site/Reveal'
import { Eyebrow } from '@/components/site/Eyebrow'
import { DeviceCard } from './DeviceCard'

const ROOM_SIZE_ORDER = ['Huddle', 'Small/Medium', 'Large']

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  if (options.length === 0) return null

  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">{label}</h4>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 rounded border-border text-primary_red focus:ring-primary_red focus:ring-offset-0"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

// Assumes it's rendered within an ambient DeviceCartProvider from a parent
// page - no provider/floating-cart-button here, so it can be reused inside
// pages that already provide their own (brand pages, device detail pages).
export function DeviceGroupedGrid({ devices }: { devices: Device[] }) {
  const brands = useMemo(() => Array.from(new Set(devices.map((d) => d.brand))).sort(), [devices])
  const roomSizeOptions = useMemo(
    () => ROOM_SIZE_ORDER.filter((size) => devices.some((d) => d.roomSize === size)),
    [devices],
  )

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRoomSizes, setSelectedRoomSizes] = useState<string[]>([])

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filteredDevices = devices.filter((d) => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(d.brand)
    const sizeMatch =
      selectedRoomSizes.length === 0 || (!!d.roomSize && selectedRoomSizes.includes(d.roomSize))
    return brandMatch && sizeMatch
  })

  const groups = ROOM_SIZE_ORDER.map((size) => ({
    size,
    devices: filteredDevices.filter((d) => d.roomSize === size),
  })).filter((g) => g.devices.length > 0)

  const hasFilters = brands.length > 1 || roomSizeOptions.length > 0

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>MORE PRODUCTS</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Video Conferencing Device Products
          </h2>
        </Reveal>

        <div className={hasFilters ? 'grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]' : ''}>
          {hasFilters && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6 rounded-xl border border-border p-5">
                <FilterGroup
                  label="Brands"
                  options={brands}
                  selected={selectedBrands}
                  onToggle={(v) => toggle(selectedBrands, setSelectedBrands, v)}
                />
                <FilterGroup
                  label="Meeting Room Size"
                  options={roomSizeOptions}
                  selected={selectedRoomSizes}
                  onToggle={(v) => toggle(selectedRoomSizes, setSelectedRoomSizes, v)}
                />
              </div>
            </aside>
          )}

          <div>
            {groups.length === 0 ? (
              <p className="text-sm text-gray-500">No devices match the selected filters.</p>
            ) : (
              groups.map((group) => (
                <div key={group.size} className="mt-8 first:mt-0">
                  <h3 className="mb-4 text-center text-2xl font-semibold text-foreground">
                    {group.size} Rooms
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {group.devices.map((device) => (
                      <DeviceCard key={device.id} device={device} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
