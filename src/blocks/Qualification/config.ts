import type { Block } from 'payload'

export const Qualification: Block = {
  slug: 'qualification',
  interfaceName: 'QualificationBlock',
  labels: {
    singular: 'Qualification Section',
    plural: 'Qualification Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'IS THIS RIGHT FOR YOU?',
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
      name: 'leftHeading',
      type: 'text',
      label: 'Left Column Heading',
      defaultValue: 'Business Fit',
      required: true,
    },
    {
      name: 'leftItems',
      type: 'array',
      label: 'Left Column Items',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'rightHeading',
      type: 'text',
      label: 'Right Column Heading',
      defaultValue: 'Operational Challenges',
      required: true,
    },
    {
      name: 'rightItems',
      type: 'array',
      label: 'Right Column Items',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
