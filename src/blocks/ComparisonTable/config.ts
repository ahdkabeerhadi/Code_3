import type { Block } from 'payload'

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  interfaceName: 'ComparisonTableBlock',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'WHY IT MATTERS',
    },
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
    },
    {
      name: 'leftLabel',
      type: 'text',
      label: 'Left Column Label',
      defaultValue: 'Typical Provider',
      required: true,
    },
    {
      name: 'rightLabel',
      type: 'text',
      label: 'Right Column Label',
      defaultValue: 'CODE3 360° AMC',
      required: true,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Comparison Rows',
      minRows: 1,
      fields: [
        { name: 'left', type: 'text', label: 'Typical Provider', required: true },
        { name: 'right', type: 'text', label: 'CODE3', required: true },
      ],
    },
  ],
}
