import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Show Badge',
      defaultValue: true,
    },
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (default)', value: 'dark' },
        { label: 'Red Gradient', value: 'redGradient' },
      ],
      admin: {
        description: 'Red Gradient ignores the background image and uses a red gradient with an ambient glow instead.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      required: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
