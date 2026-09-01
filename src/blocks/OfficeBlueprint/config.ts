import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const OfficeBlueprint: Block = {
  slug: 'officeBlueprint',
  interfaceName: 'OfficeBlueprintBlock',
  labels: {
    singular: 'Office Blueprint',
    plural: 'Office Blueprints',
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
      name: 'zones',
      type: 'array',
      label: 'Zones',
      minRows: 5,
      maxRows: 5,
      admin: {
        description:
          'Exactly 5, in this fixed order: 1) Reception, 2) Workstations, 3) Meeting Rooms, 4) Server/IT Room, 5) Security — the layout below is built around this order and treats the 5th as a site-wide perimeter rather than a room.',
      },
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
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
