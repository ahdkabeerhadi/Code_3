import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const SignageEstimator: Block = {
  slug: 'signageEstimator',
  interfaceName: 'SignageEstimatorBlock',
  labels: {
    singular: 'Signage Estimator',
    plural: 'Signage Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR DIGITAL SIGNAGE',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Find the Right Digital Signage Solution',
      localized: true,
    },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle', localized: true },
    { name: 'locationLabel', type: 'text', label: 'Location Question Label', defaultValue: 'Where will it be used?', localized: true },
    optionsField('locationOptions'),
    { name: 'screensLabel', type: 'text', label: 'Number of Screens Question Label', defaultValue: 'Number of Screens', localized: true },
    optionsField('screensOptions'),
    { name: 'environmentLabel', type: 'text', label: 'Indoor / Outdoor Question Label', defaultValue: 'Indoor / Outdoor', localized: true },
    optionsField('environmentOptions'),
    {
      name: 'sizeTiers',
      type: 'array',
      label: 'Recommended Screen-Size Tiers',
      minRows: 2,
      admin: {
        description:
          'Not a question - the possible recommended sizes, ordered smallest to largest. Matched automatically from Location and Indoor/Outdoor.',
      },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'contentTypeLabel', type: 'text', label: 'Content Type Question Label', defaultValue: 'Content Type', localized: true },
    optionsField('contentTypeOptions'),
    { name: 'cmsLabel', type: 'text', label: 'CMS Question Label', defaultValue: 'Need Content Management System?', localized: true },
    optionsField('cmsOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get My Digital Signage Recommendation',
      localized: true,
    },
    { name: 'disclaimer', type: 'text', label: 'Disclaimer', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
