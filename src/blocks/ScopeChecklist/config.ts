import type { Block } from 'payload'

export const ScopeChecklist: Block = {
  slug: 'scopeChecklist',
  interfaceName: 'ScopeChecklistBlock',
  labels: {
    singular: 'Scope Checklist',
    plural: 'Scope Checklists',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: "WHAT'S COVERED",
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
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'If set, this item links to the given URL, e.g. "/service/cyber-security".' },
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fine Print',
      admin: { description: 'e.g. "Also fully customizable based on your business needs and requirements."' },
      localized: true,
    },
  ],
}
