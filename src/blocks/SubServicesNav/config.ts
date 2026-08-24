import type { Block } from 'payload'

export const SubServicesNav: Block = {
  slug: 'subServicesNav',
  interfaceName: 'SubServicesNavBlock',
  labels: {
    singular: 'Sub-Services Navigation (auto)',
    plural: 'Sub-Services Navigation (auto)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (optional override)',
      localized: true,
      admin: {
        description: 'Leave blank to auto-generate "Explore More in [Parent Category]". Links (parent page + sibling sub-services) are pulled automatically from the Parent Service field — no manual list to maintain.',
      },
    },
  ],
}
