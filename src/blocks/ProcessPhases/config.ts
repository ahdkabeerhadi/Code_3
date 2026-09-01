import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const ProcessPhases: Block = {
  slug: 'processPhases',
  interfaceName: 'ProcessPhasesBlock',
  labels: {
    singular: 'Process Phases',
    plural: 'Process Phases',
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
      name: 'phases',
      type: 'array',
      label: 'Phases',
      minRows: 2,
      maxRows: 4,
      admin: {
        description:
          'Equally-weighted, sequential phases (e.g. Before / During / After) — not a comparison of alternatives. All items render the same way.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },
    ...ctaFields('Talk to Our Experts'),
  ],
}
