'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getClientSideURL } from '@/utilities/getURL'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type FormValues = {
  fullname: string
  email: string
  message: string
}

export function MiniContactForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { fullname: '', email: '', message: '' } })

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
            { field: 'full-name', value: data.fullname },
            { field: 'email', value: data.email },
            { field: 'message', value: data.message },
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
    <div className={cn('rounded-2xl border border-border bg-white p-6 shadow-sm', className)}>
      <h3 className="text-base font-semibold text-foreground">Quick Enquiry</h3>
      <p className="mt-1 text-sm text-gray-500">Get a callback from our team within one business day.</p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
          <textarea
            placeholder="How can we help?"
            rows={3}
            {...register('message', { required: true })}
            className={cn(fieldClassName, 'resize-none')}
          />
          {errors.message && <p className="mt-1 text-xs text-primary_red">Please add a short message.</p>}
        </div>

        {error && <p className="text-xs text-primary_red">{error}</p>}

        <Button type="submit" variant="default" disabled={isLoading} className="w-full disabled:opacity-50">
          {isLoading ? 'Sending...' : 'Send Enquiry'}
        </Button>
      </form>
    </div>
  )
}
