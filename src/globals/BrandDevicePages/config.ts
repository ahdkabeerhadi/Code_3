import type { GlobalConfig } from 'payload'

import { revalidateBrandDevicePages } from './hooks/revalidateBrandDevicePages'

const brandHeroFields = (brand: string) => [
  {
    name: 'title',
    type: 'text' as const,
    label: 'Hero Title',
    defaultValue: `${brand} Video Conferencing Devices`,
  },
  {
    name: 'subtitle',
    type: 'textarea' as const,
    label: 'Hero Subtitle',
    defaultValue: `Genuine ${brand} video conferencing hardware for huddle, small/medium, and large rooms. Add devices to your quote cart or enquire directly for pricing and availability.`,
  },
  {
    name: 'enquiryHeading',
    type: 'text' as const,
    label: 'Enquiry Form Heading',
    defaultValue: `Enquire About ${brand} Devices`,
  },
]

export const BrandDevicePages: GlobalConfig = {
  slug: 'brandDevicePages',
  label: 'Brand Device Pages',
  access: {
    read: () => true,
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
    description:
      'Hero content for each of the 5 brand device pages (Yealink, Logitech, Jabra, Cisco, Poly). Product listings themselves are managed in the Devices collection.',
  },
  hooks: {
    afterChange: [revalidateBrandDevicePages],
  },
  fields: [
    { name: 'yealink', type: 'group', label: 'Yealink', fields: brandHeroFields('Yealink') },
    { name: 'logitech', type: 'group', label: 'Logitech', fields: brandHeroFields('Logitech') },
    { name: 'jabra', type: 'group', label: 'Jabra', fields: brandHeroFields('Jabra') },
    { name: 'cisco', type: 'group', label: 'Cisco', fields: brandHeroFields('Cisco') },
    { name: 'poly', type: 'group', label: 'Poly', fields: brandHeroFields('Poly') },
  ],
}
