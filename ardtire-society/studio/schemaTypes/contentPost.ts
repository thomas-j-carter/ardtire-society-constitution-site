import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contentPost',
  title: 'Content Post',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['news', 'statements', 'speeches', 'messages'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'issuer', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'callout' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'people', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'topics', type: 'array', of: [{ type: 'string' }] }),
  ],
})
