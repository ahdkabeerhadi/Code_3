import type { Field } from 'payload'

export const ctaFields = (defaultLabel: string): Field[] => [
  {
    name: 'ctaLabel',
    type: 'text',
    label: 'CTA Button Label',
    defaultValue: defaultLabel,
  },
  {
    name: 'ctaUrl',
    type: 'text',
    label: 'CTA Button URL',
    defaultValue: '/contact',
    admin: {
      description: 'Leave the label blank to hide the button entirely.',
    },
  },
]
