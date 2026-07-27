import type { Field } from 'payload'

export const ctaFields = (defaultLabel: string, defaultText?: string): Field[] => [
  {
    name: 'ctaText',
    type: 'text',
    label: 'CTA Banner Text',
    defaultValue: defaultText,
    admin: {
      description: 'Short line shown next to the button.',
    },
  },
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
