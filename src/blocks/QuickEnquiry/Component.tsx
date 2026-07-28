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
    <section className={cn('-mt-7 bg-white pb-8 md:-mt-9 md:pb-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <MiniContactForm title={title} description={description} className="mx-auto max-w-md" />
      </div>
    </section>
  )
}
