'use client'

import React from 'react'
import { useDeviceCart } from '@/providers/DeviceCart'

export function CartFloatingButton() {
  const { items, openCart } = useDeviceCart()
  if (items.length === 0) return null

  return (
    <button
      onClick={openCart}
      aria-label="Open quote cart"
      className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-primary_red px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
    >
      Quote Cart
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary_red">
        {items.length}
      </span>
    </button>
  )
}
