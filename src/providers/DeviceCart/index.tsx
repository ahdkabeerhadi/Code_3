'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type CartDevice = {
  id: string
  title: string
  brand: string
}

type DeviceCartContextValue = {
  items: CartDevice[]
  addItem: (device: CartDevice) => void
  removeItem: (id: string) => void
  clear: () => void
  isInCart: (id: string) => boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const DeviceCartContext = createContext<DeviceCartContextValue | null>(null)

const STORAGE_KEY = 'code3-device-cart'

export function DeviceCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartDevice[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((device: CartDevice) => {
    setItems((prev) => (prev.some((i) => i.id === device.id) ? prev : [...prev, device]))
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const isInCart = useCallback((id: string) => items.some((i) => i.id === id), [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      isInCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, addItem, removeItem, clear, isInCart, isOpen],
  )

  return <DeviceCartContext.Provider value={value}>{children}</DeviceCartContext.Provider>
}

export function useDeviceCart() {
  const ctx = useContext(DeviceCartContext)
  if (!ctx) throw new Error('useDeviceCart must be used within DeviceCartProvider')
  return ctx
}
