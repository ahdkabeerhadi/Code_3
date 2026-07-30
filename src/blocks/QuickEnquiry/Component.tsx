import React from 'react'
import { cn } from '@/utilities/ui'
import { MiniContactForm } from '@/components/site/MiniContactForm'

interface QuickEnquiryBlockProps {
  title?: string
  description?: string | null
  className?: string
}

export const QuickEnquiryBlock: React.FC<QuickEnquiryBlockProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div
      data-quick-enquiry-form
      className={cn('bg-white py-8 lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent lg:py-0 lg:pointer-events-none', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:flex lg:justify-end">
        <MiniContactForm
          title={title}
          description={description}
          className="mx-auto max-w-md lg:pointer-events-auto lg:mx-0 lg:mt-8 lg:w-[360px]"
        />
      </div>
    </div>
  )
}
