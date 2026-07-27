import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const DeliveryProcess: Block = {
  slug: 'deliveryProcess',
  interfaceName: 'DeliveryProcessBlock',
  labels: {
    singular: 'Delivery Process Block',
    plural: 'Delivery Process Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'OUR DELIVERY PROCESS',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'A proven approach to delivering technology excellence',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'From initial consultation to ongoing support — every solution is strategically designed, seamlessly implemented, and continuously optimized.',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'stepLabel',
          type: 'text',
          label: 'Step Label',
          admin: {
            description: 'e.g. "STEP 01" — auto-generated from position if left blank',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Assess & Consult',
          description:
            'Understanding your objectives, existing infrastructure, and technology requirements.',
        },
        {
          title: 'Design & Plan',
          description:
            'Customized solutions aligned with your goals, scalability needs, and budget.',
        },
        {
          title: 'Procure & Prepare',
          description: 'Sourcing genuine hardware and licensing from trusted global manufacturers.',
        },
        {
          title: 'Implement & Deploy',
          description:
            'Certified engineers deploy solutions while minimizing operational disruption.',
        },
        {
          title: 'Test & Validate',
          description:
            'Rigorous testing ensures reliability, security, and performance before go-live.',
        },
        {
          title: 'Support & Optimize',
          description: 'Proactive monitoring and continuous optimization to stay future-ready.',
        },
      ],
    },
    ...ctaFields('Start Your Project'),
  ],
}
