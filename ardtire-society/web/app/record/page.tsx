import Link from 'next/link'
import { getRecordDays } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { EmptyState } from '../../components/EmptyState'
import { formatDateISO } from '../../lib/utils'

export const revalidate = 300

export default async function RecordList() {
  const days = await getRecordDays(50)
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Official Record', href: '/record' }]} />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Official Record</h1>
      <div className="mt-6 grid gap-3">
        {days.length === 0 ? (
          <EmptyState title="No entries published" />
        ) : (
          days.map((d) => (
            <div key={d.date} className="card p-4">
              <Link href={`/record/${d.date}`} className="text-base font-semibold text-slate-900 hover:underline">
                {d.summaryTitle}
              </Link>
              <div className="mt-1 text-sm text-slate-700">{formatDateISO(d.date)}</div>
              {d.summarySnippet ? <div className="mt-2 text-sm text-slate-700">{d.summarySnippet}</div> : null}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
