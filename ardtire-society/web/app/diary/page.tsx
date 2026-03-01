import Link from 'next/link'
import { getDiaryEntriesUpcoming } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { EmptyState } from '../../components/EmptyState'
import { formatDateISO } from '../../lib/utils'

export const revalidate = 300

export default async function DiaryList() {
  const items = await getDiaryEntriesUpcoming(14, 50)
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Diary', href: '/diary' }]} />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Diary</h1>
      <div className="mt-6 grid gap-3">
        {items.length === 0 ? (
          <EmptyState title="No entries published" />
        ) : (
          items.map((d) => {
            const [yyyy, mm, dd] = d.date.split('-')
            return (
              <div key={`${d.date}:${d.slug}`} className="card p-4">
                <Link href={`/diary/${yyyy}/${mm}/${dd}/${d.slug}`} className="text-base font-semibold text-slate-900 hover:underline">
                  {d.title}
                </Link>
                <div className="mt-1 text-sm text-slate-700">{formatDateISO(d.date)}</div>
                {d.locationPublic ? <div className="mt-1 text-sm text-slate-600">{d.locationPublic}</div> : null}
                {d.summary ? <div className="mt-2 text-sm text-slate-700">{d.summary}</div> : null}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
