import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'symbolMark',
  title: 'Symbol Mark',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'usageRule', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'files', type: 'array', of: [{ type: 'file' }] }),
    defineField({ name: 'displayOrder', type: 'number' }),
  ],
})
