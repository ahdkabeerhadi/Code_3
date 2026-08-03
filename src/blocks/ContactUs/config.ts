import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      defaultValue: 'CONTACT US',
      localized: true,
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      required: true,
    },
    {
      name: 'formFields',
      type: 'group',
      label: 'Form Configuration',
      fields: [
        {
          name: 'fullNameLabel',
          type: 'text',
          label: 'Full Name Label',
          localized: true,
        },
        {
          name: 'fullNamePlaceholder',
          type: 'text',
          label: 'Full Name Placeholder',
          localized: true,
        },
        {
          name: 'emailLabel',
          type: 'text',
          label: 'Email Label',
          localized: true,
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          label: 'Email Placeholder',
          localized: true,
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Phone Label',
          localized: true,
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          label: 'Phone Placeholder',
          localized: true,
        },
        {
          name: 'subjectLabel',
          type: 'text',
          label: 'Subject Label',
          localized: true,
        },
        {
          name: 'messageLabel',
          type: 'text',
          label: 'Message Label',
          localized: true,
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          label: 'Message Placeholder',
          localized: true,
        },
        {
          name: 'privacyText',
          type: 'text',
          label: 'Privacy Policy Text',
          localized: true,
        },
        {
          name: 'privacyLink',
          type: 'text',
          label: 'Privacy Policy Link',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          label: 'Submit Button Text',
          localized: true,
        },
      ],
    },
    {
      name: 'countryOptions',
      type: 'array',
      label: 'Country Options',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
        },
      ],
      defaultValue: [
        { value: '+971', label: 'UAE' },
        { value: '+91', label: 'IND' },
      ],
    },
    {
      name: 'subjectOptions',
      type: 'array',
      label: 'Subject Options',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
        },
      ],
      defaultValue: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'technical', label: 'Technical Support' },
        { value: 'sales', label: 'Sales Inquiry' },
        { value: 'partnership', label: 'Partnership' },
      ],
    },
  ],
  interfaceName: 'ContactUsBlock',
}