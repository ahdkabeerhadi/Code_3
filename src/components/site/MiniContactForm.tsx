'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getClientSideURL } from '@/utilities/getURL'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const COMPANY_SIZE_OPTIONS = ['0-9', '10-24', '25-49', '50-100', '100+'] as const

type FormValues = {
  fullname: string
  email: string
  phone: string
  message: string
  companySize: string
}

export function MiniContactForm({
  className,
  title = 'Quick Enquiry',
  description,
  showCompanySize = false,
  submitLabel = 'Send Enquiry',
  messagePlaceholder = 'How can we help?',
}: {
  className?: string
  title?: string
  description?: string | null
  /** Adds a required "Company Size" dropdown, used to qualify leads. */
  showCompanySize?: boolean
  submitLabel?: string
  messagePlaceholder?: string
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { fullname: '', email: '', phone: '', message: '', companySize: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = useCallback(async (data: FormValues) => {
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
            { field: 'subject', value: title || 'Website Enquiry' },
            { field: 'message', value: data.message },
            ...(showCompanySize ? [{ field: 'companySize', value: data.companySize }] : []),
          ],
        }),
      })

      if (!req.ok) {
        const res = await req.json().catch(() => null)
        setError(res?.errors?.[0]?.message || 'Something went wrong. Please try again.')
        setIsLoading(false)
        return
      }

      setHasSubmitted(true)
      setIsLoading(false)
    } catch {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }, [])

  const fieldClassName =
    'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary_red'

  if (hasSubmitted) {
    return (
      <div className={cn('rounded-2xl border border-border bg-white p-6 shadow-sm', className)}>
        <p className="text-sm font-medium text-foreground">Thanks for reaching out!</p>
        <p className="mt-1 text-sm text-gray-600">Our team will get back to you shortly.</p>
        <button
          type="button"
          onClick={() => {
            setHasSubmitted(false)
            reset()
          }}
          className="mt-3 text-sm font-semibold text-primary_red hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl border border-border bg-white p-5 shadow-sm', className)}>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}

      <form className="mt-3 space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
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
            {...register('phone', {
              required: true,
              pattern: /^[0-9+\s]+$/,
              minLength: 8,
            })}
            className={fieldClassName}
          />
          {errors.phone && <p className="mt-1 text-xs text-primary_red">A valid phone number is required.</p>}
        </div>

        {showCompanySize && (
          <div>
            <select
              defaultValue=""
              {...register('companySize', { required: true })}
              className={cn(fieldClassName, 'text-gray-900')}
            >
              <option value="" disabled>
                Company size
              </option>
              {COMPANY_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size} employees
                </option>
              ))}
            </select>
            {errors.companySize && <p className="mt-1 text-xs text-primary_red">Please select your company size.</p>}
          </div>
        )}

        <div>
          <textarea
            placeholder={messagePlaceholder}
            rows={2}
            {...register('message', { required: true })}
            className={cn(fieldClassName, 'resize-none')}
          />
          {errors.message && <p className="mt-1 text-xs text-primary_red">Please add a short message.</p>}
        </div>

        {error && <p className="text-xs text-primary_red">{error}</p>}

        <Button type="submit" variant="default" disabled={isLoading} className="w-full disabled:opacity-50">
          {isLoading ? 'Sending...' : submitLabel}
        </Button>
      </form>
    </div>
  )
}
