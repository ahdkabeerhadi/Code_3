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
        description: 'Optional — the overview renders full-width without one, unless space is reserved for a sidebar below.',
      },
    },
    {
      name: 'reserveSidebarSpace',
      type: 'checkbox',
      label: 'Reserve space for a floating sidebar form (e.g. Quick Enquiry)',
      defaultValue: true,
      admin: {
        description:
          'Keep checked on service pages that also have a Quick Enquiry block, so text doesn\'t run under it. Uncheck for standalone pages with no such sidebar, so the text uses the full width.',
      },
    },
  ],
  interfaceName: 'ServiceOverviewBlock',
}
