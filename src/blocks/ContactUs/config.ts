import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      defaultValue: 'CONTACT US',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: "Let's Talk Solutions",
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        "We're here to help you with your IT, ICT & ELV, AV, and Solutions needs. Choose the way that works best for you.",
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
          defaultValue: 'Full name',
        },
        {
          name: 'fullNamePlaceholder',
          type: 'text',
          label: 'Full Name Placeholder',
          defaultValue: 'Enter your full name',
        },
        {
          name: 'emailLabel',
          type: 'text',
          label: 'Email Label',
          defaultValue: 'Email',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          label: 'Email Placeholder',
          defaultValue: 'you@company.com',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Phone Label',
          defaultValue: 'Phone number',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          label: 'Phone Placeholder',
          defaultValue: '+1 (555) 000-0000',
        },
        {
          name: 'subjectLabel',
          type: 'text',
          label: 'Subject Label',
          defaultValue: 'Subject',
        },
        {
          name: 'messageLabel',
          type: 'text',
          label: 'Message Label',
          defaultValue: 'Message',
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          label: 'Message Placeholder',
          defaultValue: 'Leave us a message...',
        },
        {
          name: 'privacyText',
          type: 'text',
          label: 'Privacy Policy Text',
          defaultValue: 'You agree to our friendly privacy policy.',
        },
        {
          name: 'privacyLink',
          type: 'text',
          label: 'Privacy Policy Link',
          defaultValue: '#',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          label: 'Submit Button Text',
          defaultValue: 'Send message',
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
          required: true,
        },
      ],
      defaultValue: [
        { value: 'UK', label: 'UK' },
        { value: 'US', label: 'US' },
        { value: 'CA', label: 'CA' },
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