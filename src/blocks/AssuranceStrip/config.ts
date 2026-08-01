import type { Block } from 'payload'

export const AssuranceStrip: Block = {
  slug: 'assuranceStrip',
  interfaceName: 'AssuranceStripBlock',
  labels: {
    singular: 'Assurance Strip',
    plural: 'Assurance Strips',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Assurance Notes',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Shield (Insurance)', value: 'shield' },
            { label: 'Tag (Asset Tracking)', value: 'tag' },
            { label: 'Document (Signed Handover)', value: 'document' },
            { label: 'Camera (Photo Documentation)', value: 'camera' },
            { label: 'Check (General)', value: 'check' },
          ],
          defaultValue: 'shield',
          required: true,
        },
        { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Fully Insured Transport"' } },
        { name: 'text', type: 'text', required: true, admin: { description: 'Short one-line note.' } },
      ],
    },
  ],
}
