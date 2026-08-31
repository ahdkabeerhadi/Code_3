import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const RequirementQuiz: Block = {
  slug: 'requirementQuiz',
  interfaceName: 'RequirementQuizBlock',
  labels: {
    singular: 'Requirement Quiz',
    plural: 'Requirement Quizzes',
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
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Questions',
      minRows: 1,
      admin: {
        description:
          'Each question is a single-select row of chips. Scoring is based on option position (first option = lowest complexity/score), so keep options ordered from lowest to highest.',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Question Label', required: true, localized: true },
        {
          name: 'options',
          type: 'array',
          label: 'Options (ordered lowest to highest)',
          minRows: 2,
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Get Your Recommendation',
      required: true,
      localized: true,
    },
    {
      name: 'resultTiers',
      type: 'array',
      label: 'Result Tiers',
      minRows: 1,
      admin: {
        description:
          'Total score = sum of each answer\'s option position across all questions. Ranges should cover 0 through the maximum possible total (sum of each question\'s highest option index) with no gaps.',
      },
      fields: [
        { name: 'minScore', type: 'number', required: true },
        { name: 'maxScore', type: 'number', required: true },
        { name: 'tierName', type: 'text', label: 'Recommended Tier Name', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
          admin: { description: 'e.g. a link to the relevant plan in a pricing table below' },
        },
      ],
    },
    { name: 'disclaimer', type: 'text', localized: true },
    ...ctaFields('Talk to Our Experts'),
  ],
}
