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
    {
      name: 'brandLogos',
      type: 'group',
      label: 'Brand Logos',
      admin: {
        description:
          'Optional logo for each brand card. Any brand left empty falls back to showing its name as text.',
      },
      fields: [
        { name: 'yealink', type: 'upload', relationTo: 'media', label: 'Yealink Logo' },
        { name: 'logitech', type: 'upload', relationTo: 'media', label: 'Logitech Logo' },
        { name: 'jabra', type: 'upload', relationTo: 'media', label: 'Jabra Logo' },
        { name: 'cisco', type: 'upload', relationTo: 'media', label: 'Cisco Logo' },
        { name: 'poly', type: 'upload', relationTo: 'media', label: 'Poly Logo' },
      ],
    },
  ],
}
