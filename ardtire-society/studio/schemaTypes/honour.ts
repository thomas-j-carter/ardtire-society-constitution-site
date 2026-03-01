import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'honour',
  title: 'Honour',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'postnominals', type: 'string' }),
    defineField({ name: 'purpose', type: 'text' }),
    defineField({ name: 'eligibility', type: 'text' }),
    defineField({ name: 'insignia', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'displayOrder', type: 'number' }),
  ],
})
