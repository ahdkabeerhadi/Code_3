import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'showInMobile',
          type: 'checkbox',
          label: 'Show in Mobile Menu',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'megaMenu',
      type: 'group',
      label: 'Mega Menu Configuration',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Mega Menu Title',
          defaultValue: 'Complete IT, Security & Digital Solutions for Businesses in UAE',
        },
        {
          name: 'brandText',
          type: 'text',
          label: 'Brand Text',
          defaultValue: 'CODE3',
        },
        {
          name: 'serviceCategories',
          type: 'array',
          label: 'Service Categories',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Category Title',
              required: true,
            },
            {
              name: 'services',
              type: 'array',
              label: 'Services',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Service Name',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Service Link',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'mobileMenu',
      type: 'group',
      label: 'Mobile Menu Configuration',
      fields: [
        {
          name: 'sections',
          type: 'array',
          label: 'Menu Sections',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
            },
            {
              name: 'items',
              type: 'array',
              label: 'Menu Items',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Item Name',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Item Link',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButtons',
      type: 'group',
      label: 'Call to Action Buttons',
      fields: [
        {
          name: 'loginText',
          type: 'text',
          label: 'Login Button Text',
          defaultValue: 'Login',
        },
        {
          name: 'contactText',
          type: 'text',
          label: 'Contact Button Text',
          defaultValue: 'Contact',
        },
        {
          name: 'contactLink',
          type: 'text',
          label: 'Contact Link',
          defaultValue: '/contact',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}