import type { Block } from 'payload'

export const RelatedServices: Block = {
  slug: 'relatedServices',
  interfaceName: 'RelatedServicesBlock',
  labels: {
    singular: 'Related Services Strip',
    plural: 'Related Services Strips',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'You Might Also Need',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Related Services',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
