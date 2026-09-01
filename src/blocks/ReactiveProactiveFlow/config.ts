import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const ReactiveProactiveFlow: Block = {
  slug: 'reactiveProactiveFlow',
  interfaceName: 'ReactiveProactiveFlowBlock',
  labels: {
    singular: 'Reactive vs Proactive Flow',
    plural: 'Reactive vs Proactive Flows',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PROACTIVE VS REACTIVE',
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
      name: 'reactiveLabel',
      type: 'text',
      label: 'Reactive Row Label',
      defaultValue: 'Without AMC',
      localized: true,
    },
    {
      name: 'reactiveSteps',
      type: 'array',
      label: 'Reactive Row Steps',
      minRows: 2,
      maxRows: 6,
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'proactiveLabel',
      type: 'text',
      label: 'Proactive Row Label',
      defaultValue: 'With CODE3 AMC',
      localized: true,
    },
    {
      name: 'proactiveSteps',
      type: 'array',
      label: 'Proactive Row Steps',
      minRows: 2,
      maxRows: 6,
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    ...ctaFields('Talk to Our Experts'),
  ],
}
