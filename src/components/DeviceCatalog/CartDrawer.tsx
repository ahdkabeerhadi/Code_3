'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useDeviceCart } from '@/providers/DeviceCart'
import { DeviceEnquiryForm } from './DeviceEnquiryForm'

// The Zoho SalesIQ chat widget is injected via GTM, not this codebase, and floats
// at a very high z-index. Its JS API lets us hide/show its launcher button so it
// doesn't sit on top of the drawer while open; this is best-effort and safe if the
// widget hasn't loaded yet (the API just won't exist).
declare global {
  interface Window {
    $zoho?: { salesiq?: { floatbutton?: { visible?: (state: 'show' | 'hide') => void } } }
  }
}

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clear, isOpen, closeCart } = useDeviceCart()
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      window.$zoho?.salesiq?.floatbutton?.visible?.(isOpen ? 'hide' : 'show')
    } catch {
      // widget not loaded yet - nothing to do
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    closeCart()
    setShowForm(false)
    setSubmitted(false)
  }

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} aria-hidden="true" />

      <div className="relative z-[10000] flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Your Quote Cart</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="mt-8 text-center">
            <p className="text-base font-semibold text-foreground">Thanks for reaching out!</p>
            <p className="mt-1 text-sm text-gray-600">Our team will get back to you shortly.</p>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-8 text-sm text-gray-500">
            No devices added yet. Click &ldquo;Add to Quote Cart&rdquo; on any device to get started.
          </p>
        ) : showForm ? (
          <div className="mt-6">
            <DeviceEnquiryForm
              deviceNames={items.map((i) => `${i.title} (x${i.quantity})`)}
              onSuccess={() => {
                setSubmitted(true)
                clear()
              }}
            />
          </div>
        ) : (
          <>
            <ul className="mt-6 flex-1 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-sm text-gray-500 hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-sm text-gray-500 hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-primary_red hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="default" className="mt-4 w-full" onClick={() => setShowForm(true)}>
              Request Quote ({items.length})
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
