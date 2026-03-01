import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'assetType', type: 'string', options: { list: ['Logo','Wordmark','Portrait','Press Kit','Other'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'updatedDate', type: 'date' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'file', type: 'file' }),
    defineField({ name: 'externalUrl', type: 'url' }),
    defineField({ name: 'usageNote', type: 'text' }),
  ],
})
