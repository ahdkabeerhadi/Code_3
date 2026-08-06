import type { Block } from 'payload'

export const DeviceBrandShowcase: Block = {
  slug: 'deviceBrandShowcase',
  interfaceName: 'DeviceBrandShowcaseBlock',
  labels: {
    singular: 'Device Brand Showcase',
    plural: 'Device Brand Showcases',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'SHOP BY BRAND',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Shop Video Conferencing Devices',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'Genuine hardware from Yealink, Logitech, Jabra, Cisco, and Poly. Choose a brand to browse devices by room size.',
    },
  ],
}
