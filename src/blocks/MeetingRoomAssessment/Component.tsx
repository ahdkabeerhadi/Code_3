import React from 'react'
import type { MeetingRoomAssessmentBlock as MeetingRoomAssessmentBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { MeetingRoomAssessmentForm } from './MeetingRoomAssessmentForm.client'

type Props = {
  className?: string
} & MeetingRoomAssessmentBlockProps

export const MeetingRoomAssessmentBlock: React.FC<Props> = ({
  className,
  title,
  description,
  submitLabel,
}) => {
  return (
    // Floats next to the top banner on desktop, same as the Quick Enquiry
    // block it replaced - `data-quick-enquiry-form` is the exact attribute
    // the page's existing <ClearQuickEnquiry /> spacers already look for, so
    // reusing it means those spacers automatically account for this form's
    // real (taller) height without any extra wiring.
    <div
      data-quick-enquiry-form
      className={cn(
        'bg-white py-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent lg:py-0',
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:flex lg:flex-col lg:items-end">
        <MeetingRoomAssessmentForm
          title={title}
          description={description}
          submitLabel={submitLabel}
          className="mx-auto max-w-md lg:pointer-events-auto lg:mx-0 lg:mt-8 lg:w-[360px]"
        />
      </div>
    </div>
  )
}
