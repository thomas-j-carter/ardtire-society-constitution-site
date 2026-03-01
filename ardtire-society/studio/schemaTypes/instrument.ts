import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'instrument',
  title: 'Instrument',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'cite', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'series', type: 'string' }),
    defineField({ name: 'number', type: 'string' }),
    defineField({ name: 'status', type: 'string' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'callout' }], validation: (Rule) => Rule.required() }),
  ],
})
