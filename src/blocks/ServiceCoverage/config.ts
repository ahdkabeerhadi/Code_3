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
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Areas We Cover',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'areas',
      type: 'array',
      label: 'Covered Areas',
      minRows: 1,
      fields: [{ name: 'name', type: 'text', required: true, localized: true }],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fine Print',
      admin: { description: 'e.g. "Onsite visits scheduled within 24-48 hours of confirmation."' },
      localized: true,
    },
  ],
}
