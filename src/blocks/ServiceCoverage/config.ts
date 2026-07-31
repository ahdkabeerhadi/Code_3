import type { Block } from 'payload'

export const ServiceCoverage: Block = {
  slug: 'serviceCoverage',
  interfaceName: 'ServiceCoverageBlock',
  labels: {
    singular: 'Service Coverage Area',
    plural: 'Service Coverage Areas',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'SERVICE COVERAGE',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Areas We Cover',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
    },
    {
      name: 'areas',
      type: 'array',
      label: 'Covered Areas',
      minRows: 1,
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fine Print',
      admin: { description: 'e.g. "Onsite visits scheduled within 24-48 hours of confirmation."' },
    },
  ],
}
