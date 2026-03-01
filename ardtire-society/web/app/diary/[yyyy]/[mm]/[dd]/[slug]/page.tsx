import { notFound } from 'next/navigation'
import { getDiaryEntryByDateSlug } from '../../../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../../../components/Breadcrumbs'
import { PageFrame } from '../../../../../components/PageFrame'
import { formatDateISO } from '../../../../../lib/utils'
import { TagPills } from '../../../../../components/TagPills'

export const revalidate = 300

export default async function DiaryDetail({ params }: { params: { yyyy: string; mm: string; dd: string; slug: string } }) {
  const date = `${params.yyyy}-${params.mm}-${params.dd}`
  const entry = await getDiaryEntryByDateSlug(date, params.slug)
  if (!entry) return notFound()
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Diary', href: '/diary' },
          { label: entry.title, href: `/diary/${params.yyyy}/${params.mm}/${params.dd}/${entry.slug}` },
        ]}
      />
      <div className="container pt-6 text-sm text-slate-700">
        {formatDateISO(entry.date)}{entry.locationPublic ? ` • ${entry.locationPublic}` : ''}
      </div>
      <div className="container pt-3">
        <TagPills items={entry.participants ?? []} />
      </div>
      <PageFrame kicker="Diary" title={entry.title} subtitle={entry.summary} body={entry.body ?? []} />
    </div>
  )
}
