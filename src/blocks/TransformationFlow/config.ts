import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const TransformationFlow: Block = {
  slug: 'transformationFlow',
  interfaceName: 'TransformationFlowBlock',
  labels: {
    singular: 'Transformation Flow',
    plural: 'Transformation Flows',
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
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'beforeLabel', type: 'text', label: 'Before Row Label', defaultValue: 'BEFORE', localized: true },
    {
      name: 'beforeSteps',
      type: 'array',
      label: 'Before Steps',
      minRows: 2,
      admin: { description: 'The old, faceless way - shown as plain muted chips, deliberately without icons.' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'hubLabel',
      type: 'text',
      label: 'Hub Label',
      admin: { description: 'The branded destination, e.g. "CODE3 INTERACTIVE DISPLAY".' },
      localized: true,
    },
    {
      name: 'capabilitySteps',
      type: 'array',
      label: 'Capability Steps',
      minRows: 2,
      admin: { description: 'What the hub enables - shown as branded, icon-matched chips.' },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'outcomeLabel', type: 'text', label: 'Outcome Row Label', defaultValue: 'AFTER', localized: true },
    {
      name: 'outcomeText',
      type: 'text',
      label: 'Outcome Statement',
      required: true,
      admin: { description: 'The payoff line, e.g. "A Smarter Way to Meet, Teach & Collaborate."' },
      localized: true,
    },
    ...ctaFields('Talk to Our Experts'),
  ],
}
