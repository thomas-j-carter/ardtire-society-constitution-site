import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { deskStructure } from './deskStructure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? '2024-01-01'

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID')
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET')

export default defineConfig({
  name: 'default',
  title: 'Ardtire Society Studio',
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: { types: schemaTypes },
})
