import type { Block } from 'payload'

export const BlogScroll: Block = {
  slug: 'blogScroll',
  interfaceName: 'BlogScrollBlock',
  labels: {
    singular: 'Blog Scroll Block',
    plural: 'Blog Scroll Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'FROM THE BLOG',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Latest Insights & Updates',
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 8,
      min: 3,
      max: 20,
      admin: {
        description: 'Most recent published posts are pulled in automatically.',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      label: 'View All Link Label',
      defaultValue: 'View All Posts',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'View All Link URL',
      defaultValue: '/posts',
    },
  ],
}
