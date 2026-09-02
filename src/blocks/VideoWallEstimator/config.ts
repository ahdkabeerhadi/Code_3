import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const VideoWallEstimator: Block = {
  slug: 'videoWallEstimator',
  interfaceName: 'VideoWallEstimatorBlock',
  labels: {
    singular: 'Video Wall Estimator',
    plural: 'Video Wall Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR VIDEO WALL',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Find the Right Video Wall Solution',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'locationLabel', type: 'text', label: 'Location Question Label', defaultValue: 'Where will it be installed?', localized: true },
    optionsField('locationOptions'),
    { name: 'displaysLabel', type: 'text', label: 'Displays Question Label', defaultValue: 'How many displays?', localized: true },
    optionsField('displaysOptions'),
    { name: 'contentTypeLabel', type: 'text', label: 'Content Type Question Label', defaultValue: 'Content Type', localized: true },
    optionsField('contentTypeOptions'),
    { name: 'distanceLabel', type: 'text', label: 'Viewing Distance Question Label', defaultValue: 'Viewing Distance', localized: true },
    optionsField('distanceOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Video Wall Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
