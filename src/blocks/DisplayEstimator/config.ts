import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const DisplayEstimator: Block = {
  slug: 'displayEstimator',
  interfaceName: 'DisplayEstimatorBlock',
  labels: {
    singular: 'Display Estimator',
    plural: 'Display Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR INTERACTIVE DISPLAY',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Find Your Ideal Interactive Display',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'locationLabel', type: 'text', label: 'Location Question Label', defaultValue: 'Where will it be used?', localized: true },
    optionsField('locationOptions'),
    { name: 'usersLabel', type: 'text', label: 'Users Question Label', defaultValue: 'Number of Users', localized: true },
    optionsField('usersOptions'),
    {
      name: 'sizeTiers',
      type: 'array',
      label: 'Recommended Screen-Size Tiers',
      minRows: 2,
      admin: {
        description:
          'Not a question - the possible recommended sizes, ordered smallest to largest. Matched automatically from Number of Users.',
      },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'vcLabel', type: 'text', label: 'Video Conferencing Question Label', defaultValue: 'Need Video Conferencing?', localized: true },
    optionsField('vcOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Display Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
