import type { Block } from 'payload'

export const Accreditations: Block = {
  slug: 'accreditations',
  interfaceName: 'AccreditationsBlock',
  labels: {
    singular: 'Accreditations Block',
    plural: 'Accreditations Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'Accreditations & Certifications',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Certifications',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Certification Name',
          required: true,
          admin: {
            description: 'e.g. "Fortinet Authorized Partner", "AWS Partner – Advanced Tier Services"',
          },
        },
        {
          name: 'badge',
          type: 'upload',
          relationTo: 'media',
          label: 'Badge Image',
          admin: {
            description: 'The official certification badge/logo. Falls back to the name as text if not set.',
          },
        },
      ],
    },
  ],
}
