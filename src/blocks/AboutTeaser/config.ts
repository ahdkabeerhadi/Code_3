import type { Block } from 'payload'

export const AboutTeaser: Block = {
  slug: 'aboutTeaser',
  interfaceName: 'AboutTeaserBlock',
  labels: {
    singular: 'About Teaser Block',
    plural: 'About Teaser Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'ABOUT US',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Your trusted technology partner across the UAE',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue:
        'CODE3 has spent over a decade helping businesses build, secure, and modernize their IT infrastructure — from network foundations to full digital transformation.',
      localized: true,
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link Label',
      defaultValue: 'More About Us',
      localized: true,
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link URL',
      defaultValue: '/about-us',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'Optional. When set, the section splits into text + image.',
      },
    },
  ],
}
