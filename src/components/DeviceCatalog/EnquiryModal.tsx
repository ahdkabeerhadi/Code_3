'use client'

import React, { useState } from 'react'
import { DeviceEnquiryForm } from './DeviceEnquiryForm'

export function EnquiryModal({
  deviceNames,
  onClose,
}: {
  deviceNames: string[]
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <p className="text-base font-semibold text-foreground">Thanks for reaching out!</p>
            <p className="mt-1 text-sm text-gray-600">Our team will get back to you shortly.</p>
          </div>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Request a Quote</h3>
            <DeviceEnquiryForm deviceNames={deviceNames} onSuccess={() => setSubmitted(true)} />
          </>
        )}
      </div>
    </div>
  )
}
