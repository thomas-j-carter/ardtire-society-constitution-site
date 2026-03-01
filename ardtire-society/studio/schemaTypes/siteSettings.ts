import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'primaryNav', type: 'array', of: [{ type: 'navLink' }] }),
    defineField({ name: 'footerNav', type: 'array', of: [{ type: 'navLink' }] }),
    defineField({
      name: 'contact',
      type: 'object',
      fields: [
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'note', type: 'string' }),
      ],
    }),
    defineField({ name: 'defaultOgImage', type: 'image', options: { hotspot: true } }),
  ],
})
