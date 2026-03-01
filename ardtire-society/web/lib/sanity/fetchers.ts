import { sanityClient } from './client'
import {
  qSiteSettings,
  qSitePage,
  qPostsByType,
  qPostByTypeSlug,
  qLatestPublications,
  qInstruments,
  qInstrumentBySlug,
  qDiaryUpcoming,
  qDiaryByDateSlug,
  qRecordDays,
  qRecordDay,
  qDownloadsFor,
  qMediaAssets,
  qRoleAssignments,
  qPeople,
  qHonours,
  qSymbolMarks,
  qSearchAll,
} from './queries'
import type {
  SiteSettings,
  SitePage,
  ContentPost,
  ContentPostType,
  Instrument,
  DiaryEntry,
  RecordDay,
  DownloadItem,
  MediaAsset,
  RoleAssignmentVM,
  SearchResult,
} from './types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(qSiteSettings)
}

export async function getSitePage(section: string, key: string): Promise<SitePage | null> {
  return sanityClient.fetch(qSitePage, { section, key })
}

export async function getContentPostsByType(type: ContentPostType, limit = 50): Promise<ContentPost[]> {
  return sanityClient.fetch(qPostsByType, { type, limit })
}

export async function getContentPost(type: ContentPostType, slug: string): Promise<ContentPost | null> {
  return sanityClient.fetch(qPostByTypeSlug, { type, slug })
}

export async function getLatestPublications(limit = 3): Promise<any[]> {
  return sanityClient.fetch(qLatestPublications, { limit })
}

export async function getInstruments(limit = 100): Promise<Array<Pick<Instrument,'slug'|'cite'|'title'|'date'|'status'>>> {
  return sanityClient.fetch(qInstruments, { limit })
}

export async function getInstrument(slug: string): Promise<Instrument | null> {
  return sanityClient.fetch(qInstrumentBySlug, { slug })
}

export async function getDiaryEntriesUpcoming(days = 14, limit = 50): Promise<DiaryEntry[]> {
  const from = new Date()
  const to = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  return sanityClient.fetch(qDiaryUpcoming, {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
    limit,
  })
}

export async function getDiaryEntryByDateSlug(dateISO: string, slug: string): Promise<DiaryEntry | null> {
  return sanityClient.fetch(qDiaryByDateSlug, { date: dateISO, slug })
}

export async function getRecordDays(limit = 50): Promise<Array<Pick<RecordDay,'date'|'summaryTitle'|'summarySnippet'>>> {
  return sanityClient.fetch(qRecordDays, { limit })
}

export async function getRecordDay(dateISO: string): Promise<RecordDay | null> {
  return sanityClient.fetch(qRecordDay, { date: dateISO })
}

export async function getDownloadsFor(sectionHint: string): Promise<DownloadItem[]> {
  return sanityClient.fetch(qDownloadsFor, { sectionHint })
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  return sanityClient.fetch(qMediaAssets)
}

export async function getRoleAssignments(): Promise<RoleAssignmentVM[]> {
  return sanityClient.fetch(qRoleAssignments)
}

export async function getPeople(): Promise<any[]> {
  return sanityClient.fetch(qPeople)
}

export async function getHonours(): Promise<any[]> {
  return sanityClient.fetch(qHonours)
}

export async function getSymbolMarks(): Promise<any[]> {
  return sanityClient.fetch(qSymbolMarks)
}

export async function searchAll(q: string): Promise<SearchResult[]> {
  const res = await sanityClient.fetch(qSearchAll, { q: `${q}*` })
  const results: SearchResult[] = []
  for (const k of ['pages', 'posts', 'instruments', 'diary', 'record'] as const) {
    for (const item of (res?.[k] ?? []) as any[]) {
      results.push({ kind: item.kind, title: item.title, href: item.href, snippet: item.snippet })
    }
  }
  return results
}
