import groq from 'groq'

export const qSiteSettings = groq`*[_type=="siteSettings" && _id=="siteSettings"][0]{
  siteName, tagline, description,
  primaryNav[]{label, href},
  footerNav[]{label, href},
  contact{email, note},
  defaultOgImage
}`

export const qSitePage = groq`*[_type=="sitePage" && section==$section && key==$key][0]{ section, key, title, subtitle, kicker, body }`

export const qPostsByType = groq`*[_type=="contentPost" && type==$type] | order(date desc)[0...$limit]{
  type, "slug": slug.current, title, date, issuer, location, excerpt, body, people, topics
}`

export const qPostByTypeSlug = groq`*[_type=="contentPost" && type==$type && slug.current==$slug][0]{
  type, "slug": slug.current, title, date, issuer, location, excerpt, body, people, topics
}`

export const qLatestPublications = groq`*[_type=="contentPost"] | order(date desc)[0...$limit]{ type, "slug": slug.current, title, date, issuer, excerpt, people, topics }`

export const qInstruments = groq`*[_type=="instrument"] | order(date desc)[0...$limit]{ "slug": slug.current, cite, title, date, status }`

export const qInstrumentBySlug = groq`*[_type=="instrument" && slug.current==$slug][0]{
  "slug": slug.current, cite, title, date, series, number, status, summary, body
}`

export const qDiaryUpcoming = groq`*[_type=="diaryEntry" && date >= $from && date <= $to] | order(date asc)[0...$limit]{
  date, title, "slug": slug.current, locationPublic, participants, summary, publicationNotice, body
}`

export const qDiaryByDateSlug = groq`*[_type=="diaryEntry" && date==$date && slug.current==$slug][0]{
  date, title, "slug": slug.current, locationPublic, participants, summary, publicationNotice, body
}`

export const qRecordDays = groq`*[_type=="recordDay"] | order(date desc)[0...$limit]{ date, summaryTitle, summarySnippet }`

export const qRecordDay = groq`*[_type=="recordDay" && date==$date][0]{ date, summaryTitle, summarySnippet, notice, entries[]{time, text, locationPublic} }`

export const qDownloadsFor = groq`*[_type=="downloadItem" && sectionHint==$sectionHint] | order(updatedDate desc){ title, category, updatedDate, summary, externalUrl, sectionHint }`

export const qMediaAssets = groq`*[_type=="mediaAsset"] | order(updatedDate desc){ title, assetType, updatedDate, externalUrl, usageNote }`

export const qRoleAssignments = groq`*[_type=="roleAssignment"] | order(displayOrder asc){
  displayOrder, publicNote,
  role-> { name, category },
  person-> { displayName, shortTitle, excerpt, portrait }
}`

export const qPeople = groq`*[_type=="person"] | order(displayName asc){ displayName, shortTitle, excerpt, portrait, bio }`
export const qHonours = groq`*[_type=="honour"] | order(displayOrder asc){ name, postnominals, purpose, eligibility, insignia, displayOrder }`
export const qSymbolMarks = groq`*[_type=="symbolMark"] | order(displayOrder asc){ name, usageRule, image, files, displayOrder }`

export const qSearchAll = groq`{
  "pages": *[_type=="sitePage" && (title match $q || subtitle match $q || pt::text(body) match $q)]{
    "kind":"page",
    "title": title,
    "href": select(
      section == "transparency" => "/transparency/" + select(key=="hub"=>"", key),
      section == "media" => "/media/" + select(key=="hub"=>"", key),
      section == "legal" => "/" + key,
      section == "crown" => "/crown/" + select(key=="crown"=>"", key),
      section == "royalHouse" => "/royal-house/" + select(key=="sovereign"=>"", key),
      section == "information" => "/"
    ),
    "snippet": subtitle
  },
  "posts": *[_type=="contentPost" && (title match $q || excerpt match $q || pt::text(body) match $q || $q in people || $q in topics)]{
    "kind":"post","title":title,"href":"/"+type+"/"+slug.current,"snippet":excerpt
  },
  "instruments": *[_type=="instrument" && (title match $q || cite match $q || summary match $q || pt::text(body) match $q)]{
    "kind":"instrument","title":title,"href":"/register/instruments/"+slug.current,"snippet":summary
  },
  "diary": *[_type=="diaryEntry" && (title match $q || locationPublic match $q || summary match $q || pt::text(body) match $q || $q in participants)]{
    "kind":"diary","title":title,
    "href":"/diary/"+string::split(date,"-")[0]+"/"+string::split(date,"-")[1]+"/"+string::split(date,"-")[2]+"/"+slug.current,
    "snippet":summary
  },
  "record": *[_type=="recordDay" && (summaryTitle match $q || summarySnippet match $q || notice match $q || entries[].text match $q)]{
    "kind":"record","title":summaryTitle,"href":"/record/"+date,"snippet":summarySnippet
  }
}
`
