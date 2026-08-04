import type { Block } from 'payload'

export const ServiceDetailBanner: Block = {
  slug: 'serviceDetailBanner',
  fields: [
    {
      name: 'serviceBadge',
      type: 'text',
      label: 'Service Badge Text For Sub-Services',
      localized: true,
    },
    {
      name: 'serviceName',
      type: 'text',
      label: 'Service Name',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title for Services  ',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      required: true,
    },
    {
      name: 'showGradientLine',
      type: 'checkbox',
      label: 'Show Gradient Line',
      defaultValue: true,
    },
    {
      name: 'backLinkLabel',
      type: 'text',
      label: 'Back Link Label',
      localized: true,
      admin: {
        description: 'e.g. "Cyber Security" — shown as a small link back to the parent service category.',
      },
    },
    {
      name: 'backLinkUrl',
      type: 'text',
      label: 'Back Link URL',
    },
  ],
  interfaceName: 'ServiceDetailBannerBlock',
}
