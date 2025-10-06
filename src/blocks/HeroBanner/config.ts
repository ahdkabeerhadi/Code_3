import type { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'heroBanner',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Show Logo',
      defaultValue: true,
    },
  ],
  interfaceName: 'HeroBannerBlock',
}
