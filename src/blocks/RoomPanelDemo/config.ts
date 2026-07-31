import type { Block } from 'payload'

export const RoomPanelDemo: Block = {
  slug: 'roomPanelDemo',
  interfaceName: 'RoomPanelDemoBlock',
  labels: {
    singular: 'Room Panel Demo',
    plural: 'Room Panel Demos',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'LIVE DEMO',
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
      name: 'roomName',
      type: 'text',
      label: 'Demo Room Name',
      defaultValue: 'Boardroom A',
      required: true,
    },
    {
      name: 'hint',
      type: 'text',
      label: 'Interaction Hint',
      admin: { description: 'e.g. "Tap a status to preview the panel"' },
    },
    {
      name: 'states',
      type: 'array',
      label: 'Panel States',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Available"' } },
        {
          name: 'tone',
          type: 'select',
          required: true,
          defaultValue: 'green',
          options: [
            { label: 'Green (Available)', value: 'green' },
            { label: 'Red (In Use)', value: 'red' },
            { label: 'Amber (Booked)', value: 'amber' },
          ],
        },
        { name: 'statusText', type: 'text', required: true, admin: { description: 'e.g. "Free until 2:00 PM"' } },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
