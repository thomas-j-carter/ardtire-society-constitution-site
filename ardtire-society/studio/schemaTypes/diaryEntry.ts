import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'diaryEntry',
  title: 'Diary Entry',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'locationPublic', type: 'string' }),
    defineField({ name: 'participants', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'publicationNotice', type: 'string' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'callout' }] }),
  ],
})
