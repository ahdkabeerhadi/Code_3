import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const ProcessTimeline: Block = {
  slug: 'processTimeline',
  interfaceName: 'ProcessTimelineBlock',
  labels: {
    singular: 'Process Timeline',
    plural: 'Process Timelines',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Step Description',
          required: true,
          localized: true,
        },
      ],
    },
    ...ctaFields('Talk to Our Team'),
  ],
}
