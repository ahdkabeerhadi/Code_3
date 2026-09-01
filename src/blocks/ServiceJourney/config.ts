import type { Block } from 'payload'

export const ServiceJourney: Block = {
  slug: 'serviceJourney',
  interfaceName: 'ServiceJourneyBlock',
  labels: {
    singular: 'Service Journey',
    plural: 'Service Journeys',
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
      label: 'Journey Steps',
      minRows: 2,
      maxRows: 4,
      admin: { description: 'Shown left to right, connected by arrows, in this order.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'Leave blank for a non-clickable step, e.g. the current page.' },
        },
        {
          name: 'emphasis',
          type: 'select',
          defaultValue: 'secondary',
          options: [
            { label: 'Muted (e.g. "you are here")', value: 'muted' },
            { label: 'Primary (the main cross-sell)', value: 'primary' },
            { label: 'Secondary (the step after that)', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
