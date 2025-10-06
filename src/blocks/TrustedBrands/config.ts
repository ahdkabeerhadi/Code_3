import type { Block } from 'payload'

export const TrustedBrands: Block = {
  slug: 'trustedBrands',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Trusted by Leading Brands & Certified for Excellence',
      required: true,
    },
    {
      name: 'brands',
      type: 'array',
      label: 'Brand Logos',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Brand Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Brand Logo',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Brand Website URL (optional)',
        },
      ],
      defaultValue: [
        {
          name: 'Microsoft',
        },
        {
          name: 'Google',
        },
      ],
    },
  ],
  interfaceName: 'TrustedBrandsBlock',
}