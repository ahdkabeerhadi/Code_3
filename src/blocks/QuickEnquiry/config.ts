import type { Block } from 'payload'

export const QuickEnquiry: Block = {
  slug: 'quickEnquiry',
  interfaceName: 'QuickEnquiryBlock',
  labels: {
    singular: 'Quick Enquiry Form',
    plural: 'Quick Enquiry Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Quick Enquiry',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      defaultValue: 'Get a callback from our team within 1 minute.',
    },
  ],
}
