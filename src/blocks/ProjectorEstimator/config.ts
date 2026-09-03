import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const ProjectorEstimator: Block = {
  slug: 'projectorEstimator',
  interfaceName: 'ProjectorEstimatorBlock',
  labels: {
    singular: 'Projector Estimator',
    plural: 'Projector Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR PROJECTOR',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Find the Right Projector for Your Room',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'spaceLabel', type: 'text', label: 'Space Type Question Label', defaultValue: 'What type of space is it?', localized: true },
    optionsField('spaceOptions'),
    { name: 'roomSizeLabel', type: 'text', label: 'Room Size Question Label', defaultValue: 'Room Size', localized: true },
    optionsField('roomSizeOptions'),
    { name: 'peopleLabel', type: 'text', label: 'Number of People Question Label', defaultValue: 'Number of People', localized: true },
    optionsField('peopleOptions'),
    { name: 'lightLabel', type: 'text', label: 'Ambient Light Question Label', defaultValue: 'Ambient Light', localized: true },
    optionsField('lightOptions'),
    { name: 'projectionLabel', type: 'text', label: 'Preferred Projection Question Label', defaultValue: 'Preferred Projection', localized: true },
    optionsField('projectionOptions'),
    { name: 'screenLabel', type: 'text', label: 'Screen Size Question Label', defaultValue: 'Screen Size', localized: true },
    optionsField('screenOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Projector Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
