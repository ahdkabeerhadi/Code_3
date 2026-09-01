import type { Block } from 'payload'

const optionsField = (name: string) => ({
  name,
  type: 'array' as const,
  minRows: 2,
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
})

export const DowntimeEstimator: Block = {
  slug: 'downtimeEstimator',
  interfaceName: 'DowntimeEstimatorBlock',
  labels: {
    singular: 'Downtime Estimator',
    plural: 'Downtime Estimators',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'PLAN YOUR IT MOVE',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Estimate Your Move Complexity',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    { name: 'workstationsLabel', type: 'text', label: 'Workstations Label', defaultValue: 'Workstations', localized: true },
    { name: 'serversLabel', type: 'text', label: 'Servers Label', defaultValue: 'Servers', localized: true },
    { name: 'floorsLabel', type: 'text', label: 'Office Floors Label', defaultValue: 'Office Floors', localized: true },
    optionsField('floorsOptions'),
    { name: 'cctvLabel', type: 'text', label: 'CCTV Cameras Label', defaultValue: 'CCTV Cameras', localized: true },
    { name: 'meetingRoomsLabel', type: 'text', label: 'Meeting Rooms Label', defaultValue: 'Meeting Rooms', localized: true },
    {
      name: 'currentLocationLabel',
      type: 'text',
      label: 'Current Location Label',
      defaultValue: 'Current Location',
      localized: true,
    },
    optionsField('currentLocationOptions'),
    { name: 'newLocationLabel', type: 'text', label: 'New Location Label', defaultValue: 'New Location', localized: true },
    optionsField('newLocationOptions'),
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Estimate My Move',
      localized: true,
    },
    {
      name: 'complexityTiers',
      type: 'array',
      label: 'Complexity Tiers',
      minRows: 1,
      admin: {
        description:
          'Ordered low to high, matched against a composite score of all the fields above (size, floors, CCTV, meeting rooms, and a bump if current/new location differ).',
      },
      fields: [
        { name: 'minScore', type: 'number', required: true },
        { name: 'maxScore', type: 'number', required: true },
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Low", "Medium", "High"' } },
      ],
    },
    {
      name: 'disclaimer',
      type: 'text',
      label: 'Disclaimer',
      defaultValue: 'Final timeline confirmed after site assessment.',
      localized: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Get an Accurate Quote',
      localized: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '/contact',
    },
  ],
}
