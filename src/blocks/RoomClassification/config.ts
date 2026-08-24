import type { Block } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const RoomClassification: Block = {
  slug: 'roomClassification',
  interfaceName: 'RoomClassificationBlock',
  labels: {
    singular: 'Room Classification Showcase',
    plural: 'Room Classification Showcases',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'ROOM CLASSIFICATION',
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
      name: 'description',
      type: 'richText',
      label: 'Intro Description',
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
      }),
      admin: {
        description: 'e.g. "Experience the seamless integration of Yealink devices with Microsoft Teams Rooms..." — bold key phrases inline.',
      },
    },
    {
      name: 'rooms',
      type: 'array',
      label: 'Room Types',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', label: 'Tab Label', localized: true, required: true, admin: { description: 'e.g. "Standard Meeting Room"' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Room Photo', required: true },
      ],
    },
  ],
}
