import { createClient } from '@sanity/client'
import { env } from '../env'

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: env.SANITY_READ_TOKEN ? false : true,
  token: env.SANITY_READ_TOKEN || undefined,
})
