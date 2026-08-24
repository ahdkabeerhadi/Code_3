import type { Block } from 'payload'

export const SpecComparisonTable: Block = {
  slug: 'specComparisonTable',
  interfaceName: 'SpecComparisonTableBlock',
  labels: {
    singular: 'Spec Comparison Table',
    plural: 'Spec Comparison Tables',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      minRows: 2,
      maxRows: 4,
      fields: [{ name: 'label', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Infrared"' } }],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      admin: {
        description: 'Each value corresponds to the column at the same position - keep the order in sync with Columns above.',
      },
      fields: [
        { name: 'rowLabel', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Best Use Case"' } },
        {
          name: 'values',
          type: 'array',
          minRows: 2,
          maxRows: 4,
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },
  ],
}
