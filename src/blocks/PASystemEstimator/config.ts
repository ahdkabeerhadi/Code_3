import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const PASystemEstimator: Block = {
  slug: 'paSystemEstimator',
  interfaceName: 'PASystemEstimatorBlock',
  labels: {
    singular: 'PA System Estimator',
    plural: 'PA System Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR PA SYSTEM',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Plan Your PA System',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'facilityLabel', type: 'text', label: 'Facility Type Question Label', defaultValue: 'What type of facility do you have?', localized: true },
    optionsField('facilityOptions'),
    { name: 'areaLabel', type: 'text', label: 'Approximate Area Question Label', defaultValue: 'Approximate Area', localized: true },
    optionsField('areaOptions'),
    { name: 'zonesLabel', type: 'text', label: 'Number of Zones Question Label', defaultValue: 'Number of Zones', localized: true },
    optionsField('zonesOptions'),
    { name: 'needLabel', type: 'text', label: 'Need Question Label', defaultValue: 'What do you need?', localized: true },
    optionsField('needOptions'),
    { name: 'integrationLabel', type: 'text', label: 'Integration Question Label', defaultValue: 'Do you need integration?', localized: true },
    optionsField('integrationOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My PA System Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
