import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', type: 'string', options: { list: ['Founder','Admin','Editor','Moderator','Member','Guest'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', type: 'text' }),
  ],
})
