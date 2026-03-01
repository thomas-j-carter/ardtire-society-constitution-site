import type { MetadataRoute } from 'next'
import { getInstruments, getContentPostsByType } from '../lib/sanity/fetchers'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const staticPaths = [
    '', '/search',
    '/transparency', '/transparency/governance', '/transparency/finances', '/transparency/policies', '/transparency/requests',
    '/media', '/media/accreditation',
    '/news', '/statements', '/speeches', '/messages',
    '/register/instruments', '/diary', '/record',
    '/privacy', '/accessibility', '/copyright',
    '/crown', '/crown/realm', '/crown/succession', '/crown/council', '/crown/instruments', '/crown/symbols', '/crown/honours',
    '/royal-house', '/royal-house/householdOffice',
    '/directory',
  ]
  const staticRoutes = staticPaths.map((p) => ({ url: base + p, lastModified: new Date() }))

  const instruments = await getInstruments(200)
  const instrumentRoutes = instruments.map((i) => ({ url: base + `/register/instruments/${i.slug}`, lastModified: new Date(i.date) }))

  const posts = (await Promise.all(['news','statements','speeches','messages'].map((t) => getContentPostsByType(t as any, 200)))).flat()
  const postRoutes = posts.map((p) => ({ url: base + `/${p.type}/${p.slug}`, lastModified: new Date(p.date) }))

  return [...staticRoutes, ...instrumentRoutes, ...postRoutes]
}
