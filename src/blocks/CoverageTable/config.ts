import type { Block } from 'payload'

export const CoverageTable: Block = {
  slug: 'coverageTable',
  interfaceName: 'CoverageTableBlock',
  labels: {
    singular: 'Coverage Table',
    plural: 'Coverage Tables',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
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
      name: 'areaHeaderLabel',
      type: 'text',
      label: 'Left Column Header',
      defaultValue: 'IT Area',
      localized: true,
    },
    {
      name: 'managedHeaderLabel',
      type: 'text',
      label: 'Right Column Header',
      defaultValue: 'What We Manage',
      localized: true,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Coverage Rows',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (emoji)',
          admin: { description: 'e.g. "🖥" — pasted directly, no icon library needed.' },
        },
        {
          name: 'area',
          type: 'text',
          label: 'IT Area',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'What We Manage',
          required: true,
          localized: true,
          admin: { description: 'e.g. "Desktops • Laptops • Printers • Software • User Support"' },
        },
      ],
    },
    {
      name: 'closingStatement',
      type: 'text',
      label: 'Closing Statement',
      localized: true,
      admin: { description: 'e.g. "One contract. One support team. One point of accountability."' },
    },
    {
      name: 'pills',
      type: 'array',
      label: 'Highlight Pills',
      maxRows: 8,
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      localized: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '/contact',
    },
  ],
}
