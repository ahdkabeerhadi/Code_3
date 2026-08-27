import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const RoomSizeEstimator: Block = {
  slug: 'roomSizeEstimator',
  interfaceName: 'RoomSizeEstimatorBlock',
  labels: {
    singular: 'Room Size Estimator',
    plural: 'Room Size Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR SETUP',
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
      name: 'participantsLabel',
      type: 'text',
      label: 'Input Label',
      defaultValue: 'Number of Participants',
      localized: true,
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Room Tiers',
      admin: {
        description: 'Ordered smallest to largest - the tool matches participant count to the first tier whose max isn\'t exceeded.',
      },
      minRows: 1,
      fields: [
        { name: 'maxParticipants', type: 'number', admin: { description: 'Leave blank on the last tier for "no limit".' } },
        { name: 'roomLabel', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Huddle Room"' } },
        { name: 'recommendation', type: 'textarea', required: true, localized: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'e.g. a brand catalog filtered to this room size' },
        },
      ],
    },
    { name: 'disclaimer', type: 'text', localized: true },
    ...ctaFields('Talk to Our Experts', 'Want expert help choosing the right setup?'),
  ],
}
