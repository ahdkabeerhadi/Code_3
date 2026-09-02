import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const IconFeatureGrid: Block = {
  slug: 'iconFeatureGrid',
  interfaceName: 'IconFeatureGridBlock',
  labels: {
    singular: 'Icon Feature Grid',
    plural: 'Icon Feature Grids',
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
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 4,
      maxRows: 12,
      admin: {
        description: 'Short label only (2–4 words). An icon is matched automatically by keyword.',
      },
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (optional)',
          localized: true,
          admin: {
            description:
              'A one-line description switches every card in this grid to a larger, left-aligned layout instead of the compact centered one.',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'If set, this card links to the given URL, e.g. "/service/cyber-security-dubai-uae".' },
        },
      ],
    },
    {
      name: 'footer',
      type: 'textarea',
      label: 'Closing Line (optional)',
      localized: true,
      admin: { description: 'Plain closing statement shown below the grid, e.g. reinforcing the pitch without a button.' },
    },
    ...ctaFields('Talk to Our Experts'),
  ],
}
