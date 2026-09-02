import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

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
      name: 'leftLabel',
      type: 'text',
      label: 'Left Column Label',
      defaultValue: 'Typical Provider',
      required: true,
      localized: true,
    },
    {
      name: 'middleEnabled',
      type: 'checkbox',
      label: 'Add a Third (Middle) Column',
      defaultValue: false,
    },
    {
      name: 'middleLabel',
      type: 'text',
      label: 'Middle Column Label',
      admin: { condition: (_, siblingData) => Boolean(siblingData?.middleEnabled) },
      localized: true,
    },
    {
      name: 'rightLabel',
      type: 'text',
      label: 'Right Column Label',
      defaultValue: 'CODE3 360° AMC',
      required: true,
      localized: true,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Comparison Rows',
      minRows: 1,
      fields: [
        { name: 'left', type: 'text', label: 'Left Column', required: true, localized: true },
        { name: 'middle', type: 'text', label: 'Middle Column', localized: true },
        { name: 'right', type: 'text', label: 'Right Column (CODE3)', required: true, localized: true },
      ],
    },
    ...ctaFields(''),
  ],
}
