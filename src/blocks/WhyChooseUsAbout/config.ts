import type { Block } from 'payload'

export const WhyChooseUsAbout: Block = {
  slug: 'whyChooseUsAbout',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'WHY CHOOSE US',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      defaultValue: 'why businesses like yours switch to us and stay.',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'From managing your IT to securing your data, from connecting your spaces to equipping your meeting rooms',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'textarea',
          label: 'SVG Icon Code',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Feature Description',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'WhyChooseUsAboutBlock',
}