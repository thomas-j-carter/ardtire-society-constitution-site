import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'recordDay',
  title: 'Record Day',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'summaryTitle', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'summarySnippet', type: 'string' }),
    defineField({ name: 'notice', type: 'string' }),
    defineField({ name: 'entries', type: 'array', of: [{ type: 'recordEntry' }], validation: (Rule) => Rule.required().min(1) }),
  ],
})
