import type { LeadCaptureFormBlock as LeadCaptureFormBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { MiniContactForm } from '@/components/site/MiniContactForm'

type Props = {
  className?: string
} & LeadCaptureFormBlockProps

export const LeadCaptureFormBlock: React.FC<Props> = ({
  badge,
  className,
  title,
  description,
  formTitle,
  submitLabel,
}) => {
  return (
    <section className={cn('bg-[#FDEBEC] py-10 md:py-14', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            {badge && <Eyebrow>{badge}</Eyebrow>}
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
            {description && <p className="mt-3 max-w-md text-gray-600 leading-relaxed">{description}</p>}
          </div>

          <MiniContactForm
            title={formTitle}
            showCompanySize
            submitLabel={submitLabel}
            messagePlaceholder="What can we help with?"
            className="mx-auto w-full max-w-md shadow-lg"
          />
        </Reveal>
      </div>
    </section>
  )
}
