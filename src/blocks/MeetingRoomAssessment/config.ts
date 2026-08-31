import type { Block } from 'payload'

export const MeetingRoomAssessment: Block = {
  slug: 'meetingRoomAssessment',
  interfaceName: 'MeetingRoomAssessmentBlock',
  labels: {
    singular: 'Meeting Room Assessment Form',
    plural: 'Meeting Room Assessment Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Get Your Free Meeting Room Assessment',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Tell us about your meeting room and requirements. Our AV team will recommend the right video conferencing solution for your space.',
      localized: true,
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Free Room Assessment',
      required: true,
      localized: true,
    },
  ],
}
