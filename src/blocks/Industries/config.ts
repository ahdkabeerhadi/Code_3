import type { Block } from 'payload'
import { ICON_PRESET_OPTIONS } from '@/components/site/icons'
import { ctaFields } from '@/fields/ctaFields'

export const Industries: Block = {
  slug: 'industries',
  interfaceName: 'IndustriesBlock',
  labels: {
    singular: 'Industries Block',
    plural: 'Industries Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'INDUSTRIES WE SERVE',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Industries We Serve',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Industries',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Industry Name',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [...ICON_PRESET_OPTIONS],
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Shown on the back of the card when flipped/hovered.',
          },
        },
      ],
    },
    ...ctaFields(
      'Find Your Industry Solution',
      "Don't see your industry listed? We can still help.",
    ),
  ],
}
