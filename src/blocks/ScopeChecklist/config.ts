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
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Fine Print',
      admin: { description: 'e.g. "Also fully customizable based on your business needs and requirements."' },
    },
  ],
}
