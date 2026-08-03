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
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'FAQS',
      localized: true,
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
    ...ctaFields(
      'Still Have Questions? Contact Us',
      "Can't find the answer you're looking for?",
    ),
  ],
}
