import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Block',
    plural: 'Features Blocks'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Why Businesses Trust Us'
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Choosing the right technology partner that just about products - it\'s about reliability, expertise, and support that never stops'
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Asymmetric Grid (Like Image)', value: 'asymmetric-grid' },
        { label: 'Standard Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'asymmetric-grid',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
        { label: 'Blue', value: 'blue' },
      ],
      defaultValue: 'white',
    },
    {
      name: 'accentColor',
      type: 'text',
      defaultValue: '#dc2626',
      admin: {
        description: 'Hex color for accent elements (e.g., #dc2626 for red)'
      }
    },
    {
      name: 'features',
      type: 'array',
      minRows: 4,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hasImage',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check if this feature should display a background image'
          }
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.hasImage
          }
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Emoji or icon text (e.g., 🛡️, 🚀, 📞)',
            condition: (data, siblingData) => !siblingData.hasImage
          }
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          defaultValue: 'medium',
          admin: {
            description: 'Size only applies to asymmetric grid layout'
          }
        },
        {
          name: 'backgroundColor',
          type: 'select',
          options: [
            { label: 'White/Light', value: 'white' },
            { label: 'Dark', value: 'dark' },
            { label: 'Accent Color', value: 'red' },
          ],
          defaultValue: 'white',
        },
      ],
    },
  ],
}