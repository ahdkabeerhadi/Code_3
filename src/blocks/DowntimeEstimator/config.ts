import type { Block } from 'payload'

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
      defaultValue: 'PLAN YOUR MOVE',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Estimate Your Move Window',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
    },
    {
      name: 'workstationsLabel',
      type: 'text',
      label: 'Workstations Input Label',
      defaultValue: 'Number of workstations',
    },
    {
      name: 'serversLabel',
      type: 'text',
      label: 'Servers Input Label',
      defaultValue: 'Number of servers',
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Estimate Tiers',
      labels: { singular: 'Tier', plural: 'Tiers' },
      minRows: 1,
      admin: {
        description:
          'Ordered smallest to largest. The first tier whose limits fit the entered counts is used; if none fit, the last tier is used as the fallback (e.g. "scoped after assessment").',
      },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Small Office"' } },
        {
          name: 'maxWorkstations',
          type: 'number',
          required: true,
          admin: { description: 'Upper limit of workstations for this tier to apply.' },
        },
        {
          name: 'maxServers',
          type: 'number',
          required: true,
          admin: { description: 'Upper limit of servers for this tier to apply.' },
        },
        { name: 'estimate', type: 'text', required: true, admin: { description: 'e.g. "Typically a single weekend"' } },
      ],
    },
    {
      name: 'disclaimer',
      type: 'text',
      label: 'Disclaimer',
      defaultValue: 'This is an estimate only. Your exact timeline is confirmed after a site assessment.',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Get an Accurate Quote',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '/contact',
    },
  ],
}
