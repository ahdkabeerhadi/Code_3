import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const FAQ: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Frequently asked questions',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'FAQS',
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    ...ctaFields('Still Have Questions? Contact Us'),
  ],
}
