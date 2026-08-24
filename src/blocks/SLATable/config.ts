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
      name: 'rows',
      type: 'array',
      label: 'Priority Rows',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'priority',
          type: 'select',
          label: 'Priority',
          options: [
            { label: 'High', value: 'High' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Low', value: 'Low' },
          ],
          defaultValue: 'Medium',
          required: true,
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
          name: 'impact',
          type: 'text',
          label: 'Impact',
          required: true,
          localized: true,
        },
        {
          name: 'remoteSupportTime',
          type: 'text',
          label: 'Remote Support Time',
          required: true,
          localized: true,
        },
        {
          name: 'onsiteSupportTime',
          type: 'text',
          label: 'Onsite Support Time',
          required: true,
          localized: true,
        },
        {
          name: 'helpdeskAvailability',
          type: 'text',
          label: 'Helpdesk Availability',
          required: true,
          localized: true,
        },
        {
          name: 'resolutionTarget',
          type: 'text',
          label: 'Critical Issue Resolution',
          required: true,
          localized: true,
        },
      ],
    },
    ...ctaFields('Talk to Our Experts', 'Have questions about our SLA commitments?'),
  ],
}
