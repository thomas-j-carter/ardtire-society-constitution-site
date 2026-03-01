import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      options: { list: ['notice', 'policy', 'boundary'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'text', type: 'text', validation: (Rule) => Rule.required() }),
  ],
})
