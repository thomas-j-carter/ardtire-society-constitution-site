import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'roleAssignment',
  title: 'Role Assignment',
  type: 'document',
  fields: [
    defineField({ name: 'role', type: 'reference', to: [{ type: 'role' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'person', type: 'reference', to: [{ type: 'person' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({ name: 'displayOrder', type: 'number' }),
    defineField({ name: 'publicNote', type: 'string' }),
  ],
})
