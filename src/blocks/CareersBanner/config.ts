import type { Block } from 'payload'

export const Careers: Block = {
  slug: 'careers',
  labels: {
    singular: 'Careers Block',
    plural: 'Careers Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'CAREERS',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
    },
    {
      name: 'teamImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'hasTopMargin',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isVisibleOnMobile',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'isVisibleOnTablet',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'isVisibleOnDesktop',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
  interfaceName: 'CareersBlock',
}