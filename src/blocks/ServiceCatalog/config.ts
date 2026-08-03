import type { Block } from 'payload'
import { ctaFields } from '@/fields/ctaFields'

export const ServiceCatalog: Block = {
  slug: 'serviceCatalog',
  interfaceName: 'ServiceCatalogBlock',
  labels: {
    singular: 'Service Catalog (tabs + cards)',
    plural: 'Service Catalogs (tabs + cards)',
  },
  fields: [
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Title (highlighted part)',
      defaultValue: 'Our Services',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (plain part)',
      defaultValue: '& Solutions',
      localized: true,
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      label: 'Service Type',
      defaultValue: 'infrastructure',
      options: [
        { label: 'Infrastructure Services', value: 'infrastructure' },
        { label: 'Digital Services', value: 'digital' },
      ],
      required: true,
      admin: {
        description:
          "Tabs are built from your published top-level pages of this category; cards under each tab come from that page's sub-services (Parent Service field).",
      },
    },
    ...ctaFields(
      'Get a Free Consultation',
      'Not sure where to start? Our team can help you find the right fit.',
    ),
  ],
}
