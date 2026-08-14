'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getClientSideURL } from '@/utilities/getURL'
import { reportContactConversion } from '@/utilities/reportConversion'
import { Button } from '@/components/ui/button'

type FormValues = {
  fullname: string
  email: string
  phone: string
}

export function DeviceEnquiryForm({
  deviceNames,
  onSuccess,
}: {
  deviceNames: string[]
  onSuccess?: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { fullname: '', email: '', phone: '' } })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = useCallback(
    async (data: FormValues) => {
      setIsLoading(true)
      setError(null)

      try {
        const formReq = await fetch(
          `${getClientSideURL()}/api/forms?where[title][equals]=Contact Form`,
          { headers: { 'Content-Type': 'application/json' } },
        )
        const formData = await formReq.json()
        const formId = formData?.docs?.[0]?.id

        if (!formId) {
          setError('Something went wrong. Please try again.')
          setIsLoading(false)
          return
        }

        const req = await fetch(`${getClientSideURL()}/api/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formId,
            submissionData: [
              { field: 'fullname', value: data.fullname },
              { field: 'email', value: data.email },
              { field: 'phone', value: data.phone },
              { field: 'subject', value: 'Video Conferencing Device Enquiry' },
              { field: 'message', value: `Enquiry for: ${deviceNames.join(', ')}` },
            ],
          }),
        })

        if (!req.ok) {
          const res = await req.json().catch(() => null)
          setError(res?.errors?.[0]?.message || 'Something went wrong. Please try again.')
          setIsLoading(false)
          return
        }

        setIsLoading(false)
        reportContactConversion('device_enquiry')
        onSuccess?.()
      } catch {
        setError('Something went wrong. Please try again.')
        setIsLoading(false)
      }
    },
    [deviceNames, onSuccess],
  )

  const fieldClassName =
    'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red'

  return (
    <div>
      <p className="mb-3 text-sm text-gray-600">
        {deviceNames.length === 1
          ? `Requesting a quote for ${deviceNames[0]}`
          : `Requesting a quote for ${deviceNames.length} devices: ${deviceNames.join(', ')}`}
      </p>
      <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Full name"
            {...register('fullname', { required: true })}
            className={fieldClassName}
          />
          {errors.fullname && <p className="mt-1 text-xs text-primary_red">Full name is required.</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className={fieldClassName}
          />
          {errors.email && <p className="mt-1 text-xs text-primary_red">A valid email is required.</p>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone number"
            {...register('phone', { required: true, pattern: /^[0-9+\s]+$/, minLength: 8 })}
            className={fieldClassName}
          />
          {errors.phone && <p className="mt-1 text-xs text-primary_red">A valid phone number is required.</p>}
        </div>
        {error && <p className="text-xs text-primary_red">{error}</p>}
        <Button type="submit" variant="default" disabled={isLoading} className="w-full disabled:opacity-50">
          {isLoading ? 'Sending...' : 'Request Quote'}
        </Button>
      </form>
    </div>
  )
}
