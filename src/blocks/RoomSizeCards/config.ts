import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const RoomSizeCards: Block = {
  slug: 'roomSizeCards',
  interfaceName: 'RoomSizeCardsBlock',
  labels: {
    singular: 'Room Size Cards',
    plural: 'Room Size Cards Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'ROOM SIZES',
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
      name: 'tiers',
      type: 'array',
      label: 'Room Tiers',
      admin: {
        description: 'List from smallest to largest — the size bar on each card fills more as you go down the list.',
      },
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Huddle Rooms"' } },
        { name: 'minCapacity', type: 'number', required: true },
        {
          name: 'maxCapacity',
          type: 'number',
          admin: { description: 'Leave blank for the top tier to show "X+"' },
        },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'If set, the whole card links here, e.g. "/service/meeting-room-solutions"' },
        },
      ],
    },
    ...ctaFields('Talk to Our Experts', 'Want to see how we can support your business?'),
  ],
}
