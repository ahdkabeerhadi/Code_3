import type { Block } from 'payload'

export const PartnersDirectory: Block = {
  slug: 'partnersDirectory',
  interfaceName: 'PartnersDirectoryBlock',
  labels: {
    singular: 'Partners Directory Grid',
    plural: 'Partners Directory Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Our Technology Partners',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Partner Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo (optional)',
          admin: {
            description: 'Optional — if left blank, the partner name is shown as styled text instead.',
          },
        },
      ],
    },
  ],
}
