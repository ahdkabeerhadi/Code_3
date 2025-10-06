import type { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'OUR SERVICES',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      defaultValue: 'Your Technology Partner in Every Step',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'Whether you need a secure IT backbone or a strong digital presence, we provide tailored solutions under one roof.',
      required: true,
    },
    {
      name: 'infraService',
      type: 'group',
      label: 'Infrastructure Service',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Service Label',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Service Image',
        },
      ],
      defaultValue: {
        label: 'IT AMC',
        title: 'Your Entire IT, Fully Managed',
        description:
          'We manage your IT infrastructure so you can focus on growth. Our certified engineers handle troubleshooting and maintenance, while our ticketing portal gives you instant support, progress tracking, and feedback tools.',
      },
    },
    {
      name: 'digitalService',
      type: 'group',
      label: 'Digital Service',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Service Label',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Service Image',
        },
      ],
      defaultValue: {
        label: 'Web Development',
        title: 'Custom Web Solutions',
        description:
          'Create powerful web applications tailored to your business. Our team delivers responsive, scalable solutions using modern technologies.',
      },
    },
  ],
  interfaceName: 'ServicesBlock',
}