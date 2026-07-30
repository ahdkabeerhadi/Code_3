import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const SLATable: Block = {
  slug: 'slaTable',
  interfaceName: 'SLATableBlock',
  labels: {
    singular: 'SLA / Response Time Table',
    plural: 'SLA / Response Time Tables',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'SERVICE LEVEL AGREEMENT',
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
      name: 'rows',
      type: 'array',
      label: 'Priority Rows',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'priority',
          type: 'text',
          label: 'Priority Label',
          required: true,
          admin: {
            description: 'e.g. "Critical (P1)"',
          },
        },
        {
          name: 'severity',
          type: 'select',
          label: 'Severity Color',
          options: [
            { label: 'Red', value: 'red' },
            { label: 'Amber', value: 'amber' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ],
          defaultValue: 'blue',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Impact / Description',
          required: true,
        },
        {
          name: 'responseTime',
          type: 'text',
          label: 'Response Time',
          required: true,
        },
        {
          name: 'resolutionTarget',
          type: 'text',
          label: 'Resolution Target',
          required: true,
        },
      ],
    },
    ...ctaFields('Talk to Our Experts', 'Have questions about our SLA commitments?'),
  ],
}
