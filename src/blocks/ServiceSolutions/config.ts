import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const ServiceSolutions: Block = {
  slug: 'serviceSolutions',
  fields: [
    {
      name: 'blockId',
      type: 'text',
      label: 'Block ID (for scroll navigation)',
      defaultValue: 'service-section',
      admin: {
        description: 'e.g., "infrastructure-services" or "digital-services". Used for anchor navigation in footer links.',
      },
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      label: 'Service Type',
      defaultValue: 'infrastructure',
      options: [
        { label: 'Infrastructure Services', value: 'infrastructure' },
        { label: 'Digital Services', value: 'digital' },
      ],
      required: true,
      admin: {
        description: 'Select which type of services to display in this block',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'Services',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
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
    ...ctaFields('Get a Free Consultation', 'Not sure where to start? Our team can help you find the right fit.'),
  ],
  interfaceName: 'ServiceSolutionsBlock',
}
