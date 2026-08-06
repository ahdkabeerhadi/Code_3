import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateDevice, revalidateDeviceDelete } from './hooks/revalidateDevices'

export const Devices: CollectionConfig = {
  slug: 'devices',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'brand', 'roomSize', 'category'],
    hidden: ({ user }) => user?.role !== 'admin',
  },
  hooks: {
    afterChange: [revalidateDevice],
    afterDelete: [revalidateDeviceDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'brand',
      type: 'select',
      required: true,
      options: ['Yealink', 'Logitech', 'Jabra', 'Cisco', 'Poly'],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Video Bar',
        'Camera',
        'Speakerphone',
        'Headset',
        'Conference Phone',
        'Collaboration Display',
      ],
    },
    {
      name: 'roomSize',
      type: 'select',
      required: true,
      options: ['Huddle', 'Small/Medium', 'Large'],
      admin: {
        description: 'Which room size this device is designed for.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'specs',
      type: 'array',
      fields: [
        {
          name: 'spec',
          type: 'text',
        },
      ],
    },
    {
      name: 'priceLabel',
      type: 'text',
      admin: {
        description: 'e.g. "Starting from AED 1,499" or "Contact for pricing"',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
