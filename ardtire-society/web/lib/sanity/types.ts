export type NavLink = { label: string; href: string }
export type SiteSettings = {
  siteName: string
  tagline?: string
  description?: string
  primaryNav?: NavLink[]
  footerNav?: NavLink[]
  contact?: { email?: string; note?: string }
  defaultOgImage?: any
}

export type SitePage = {
  section: string
  key: string
  title: string
  subtitle?: string
  kicker?: string
  body: any[]
}

export type ContentPostType = 'news' | 'statements' | 'speeches' | 'messages'
export type ContentPost = {
  type: ContentPostType
  slug: string
  title: string
  date: string
  issuer?: string
  location?: string
  excerpt?: string
  body: any[]
  people?: string[]
  topics?: string[]
}

export type Instrument = {
  slug: string
  cite: string
  title: string
  date: string
  series?: string
  number?: string
  status?: string
  summary?: string
  body: any[]
}

export type DiaryEntry = {
  date: string
  title: string
  slug: string
  locationPublic?: string
  participants?: string[]
  summary?: string
  publicationNotice?: string
  body?: any[]
}

export type RecordDay = {
  date: string
  summaryTitle: string
  summarySnippet?: string
  notice?: string
  entries: { time?: string; text: string; locationPublic?: string }[]
}

export type DownloadItem = {
  title: string
  category: string
  updatedDate?: string
  summary?: string
  externalUrl?: string
  sectionHint?: string
}

export type MediaAsset = {
  title: string
  assetType: string
  updatedDate?: string
  externalUrl?: string
  usageNote?: string
}

export type RoleAssignmentVM = {
  displayOrder?: number
  publicNote?: string
  role: { name: string; category: string }
  person: { displayName: string; shortTitle?: string; excerpt?: string; portrait?: any }
}

export type SearchResult = { kind: string; title: string; href: string; snippet?: string }
