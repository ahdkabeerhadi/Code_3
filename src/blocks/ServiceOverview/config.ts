import type { Block } from 'payload'

export const ServiceOverview: Block = {
  slug: 'serviceOverview',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'SERVICES OVERVIEW',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'Optional — the overview renders full-width without one.',
      },
    },
  ],
  interfaceName: 'ServiceOverviewBlock',
}
