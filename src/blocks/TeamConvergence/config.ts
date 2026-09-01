import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const TeamConvergence: Block = {
  slug: 'teamConvergence',
  interfaceName: 'TeamConvergenceBlock',
  labels: {
    singular: 'Team Convergence',
    plural: 'Team Convergences',
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
      name: 'items',
      type: 'array',
      label: 'Scattered Items',
      minRows: 3,
      maxRows: 12,
      admin: { description: 'The fragmented specialties/vendors shown converging into one team.' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'teamLabel',
      type: 'text',
      label: 'Destination Label',
      defaultValue: 'ONE CODE3 PROJECT TEAM',
      required: true,
      localized: true,
    },
    ...ctaFields('Talk to Our Experts'),
  ],
}
