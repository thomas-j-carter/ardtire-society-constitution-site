import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'recordEntry',
  title: 'Record Entry',
  type: 'object',
  fields: [
    defineField({ name: 'time', type: 'string' }),
    defineField({ name: 'text', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'locationPublic', type: 'string' }),
  ],
})
