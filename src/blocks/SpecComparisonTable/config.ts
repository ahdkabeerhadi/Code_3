import type { Block } from 'payload'

export const SpecComparisonTable: Block = {
  slug: 'specComparisonTable',
  interfaceName: 'SpecComparisonTableBlock',
  labels: {
    singular: 'Spec Comparison Table',
    plural: 'Spec Comparison Tables',
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
      name: 'columns',
      type: 'array',
      label: 'Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Infrared"' } },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this column',
          defaultValue: false,
          admin: { description: 'Visually emphasize this column, e.g. a "Most Popular" plan.' },
        },
        {
          name: 'highlightLabel',
          type: 'text',
          label: 'Highlight Badge Text',
          defaultValue: 'Most Popular',
          admin: { condition: (_, siblingData) => !!siblingData?.highlight },
        },
      ],
    },
    {
      name: 'footer',
      type: 'textarea',
      label: 'Closing Guidance (optional)',
      localized: true,
      admin: { description: 'Shown below the table, e.g. helping the visitor pick between two equally valid options.' },
    },
    {
      name: 'footerCtaLabel',
      type: 'text',
      label: 'Closing CTA Button Label (optional)',
      localized: true,
      admin: { description: 'Shown alongside the closing guidance, e.g. "Explore IT AMC".' },
    },
    {
      name: 'footerCtaUrl',
      type: 'text',
      label: 'Closing CTA Button URL (optional)',
      admin: { condition: (_, siblingData) => !!siblingData?.footerCtaLabel },
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      admin: {
        description: 'Each value corresponds to the column at the same position - keep the order in sync with Columns above.',
      },
      fields: [
        {
          name: 'rowLabel',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'e.g. "Best Use Case" - or use "Yes" / "No" / "Limited" as a value below for a proper icon instead of plain text.' },
        },
        {
          name: 'values',
          type: 'array',
          minRows: 2,
          maxRows: 4,
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },
  ],
}
