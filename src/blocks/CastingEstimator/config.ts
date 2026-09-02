import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const CastingEstimator: Block = {
  slug: 'castingEstimator',
  interfaceName: 'CastingEstimatorBlock',
  labels: {
    singular: 'Casting Estimator',
    plural: 'Casting Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR WIRELESS CASTING',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Find Your Wireless Casting Solution',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'locationLabel', type: 'text', label: 'Location Question Label', defaultValue: 'Where will you use it?', localized: true },
    optionsField('locationOptions'),
    { name: 'participantsLabel', type: 'text', label: 'Participants Question Label', defaultValue: 'Number of Participants', localized: true },
    optionsField('participantsOptions'),
    { name: 'currentDisplayLabel', type: 'text', label: 'Current Display Question Label', defaultValue: 'Current Display', localized: true },
    optionsField('currentDisplayOptions'),
    { name: 'devicesLabel', type: 'text', label: 'Devices Question Label', defaultValue: 'Devices', localized: true },
    optionsField('devicesOptions'),
    { name: 'vcLabel', type: 'text', label: 'Video Conferencing Question Label', defaultValue: 'Need Video Conferencing?', localized: true },
    optionsField('vcOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Casting Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
