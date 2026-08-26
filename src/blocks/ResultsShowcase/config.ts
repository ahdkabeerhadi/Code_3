import type { Block } from 'payload'

export const ResultsShowcase: Block = {
  slug: 'resultsShowcase',
  interfaceName: 'ResultsShowcaseBlock',
  labels: {
    singular: 'Results Showcase',
    plural: 'Results Showcases',
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
      name: 'results',
      type: 'array',
      label: 'Results',
      minRows: 2,
      maxRows: 5,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
          admin: { description: 'e.g. "82%", "100+", "2-Hour"' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
