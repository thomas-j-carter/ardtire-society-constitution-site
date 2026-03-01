import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'href', type: 'string', validation: (Rule) => Rule.required() }),
  ],
})
