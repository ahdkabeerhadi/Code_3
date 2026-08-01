import type { Block } from 'payload'

export const LeadCaptureForm: Block = {
  slug: 'leadCaptureForm',
  interfaceName: 'LeadCaptureFormBlock',
  labels: {
    singular: 'Lead Capture Form',
    plural: 'Lead Capture Forms',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'GET A CALL BACK',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Get a Call Back',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Share a few details and our team will call you back within one business day.',
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Form Card Title',
      defaultValue: 'Request a Call Back',
      required: true,
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Request a Call Back',
      required: true,
    },
  ],
}
