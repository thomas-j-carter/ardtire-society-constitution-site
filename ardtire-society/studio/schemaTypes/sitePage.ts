import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sitePage',
  title: 'Site Page',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      type: 'string',
      options: {
        list: [
          'information',
          'transparency',
          'legal',
          'media',
          'crown',
          'royalHouse',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'key', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'kicker', type: 'string' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'callout' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const d = doc as any
      if (!d?.section || !d?.key) return true
      if (typeof d._id === 'string' && d._id === `sitePage.${d.section}.${d.key}`) return true
      return 'Use deterministic singleton IDs: sitePage.{section}.{key}'
    }),
})
