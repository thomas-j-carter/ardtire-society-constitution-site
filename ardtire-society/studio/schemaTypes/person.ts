import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'displayName', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'style', type: 'string' }),
    defineField({ name: 'shortTitle', type: 'string' }),
    defineField({ name: 'portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }, { type: 'callout' }] }),
  ],
})
