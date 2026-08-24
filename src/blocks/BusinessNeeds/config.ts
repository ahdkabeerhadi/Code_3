import type { Block } from 'payload'

export const BusinessNeeds: Block = {
  slug: 'businessNeeds',
  interfaceName: 'BusinessNeedsBlock',
  labels: {
    singular: 'Business Needs Block',
    plural: 'Business Needs Blocks',
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
      name: 'items',
      type: 'array',
      label: 'Scenarios',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Scenario (e.g. "We Need Ongoing IT Support")',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
          required: true,
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'Link Label (e.g. "Explore Managed IT")',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: true,
        },
      ],
    },
  ],
}
