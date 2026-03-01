import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'downloadItem',
  title: 'Download Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', type: 'string', options: { list: ['Report','Policy','Form','Media Asset','Other'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'updatedDate', type: 'date' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'file', type: 'file' }),
    defineField({ name: 'externalUrl', type: 'url' }),
    defineField({ name: 'sectionHint', type: 'string' }),
  ],
})
