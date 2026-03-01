import { notFound } from 'next/navigation'
import { getRecordDay } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { EmptyState } from '../../../components/EmptyState'
import { formatDateISO } from '../../../lib/utils'

export const revalidate = 300

export default async function RecordDayPage({ params }: { params: { date: string } }) {
  const day = await getRecordDay(params.date)
  if (!day) return notFound()
  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Official Record', href: '/record' },
          { label: day.date, href: `/record/${day.date}` },
        ]}
      />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">{day.summaryTitle}</h1>
      <div className="mt-2 text-sm text-slate-700">{formatDateISO(day.date)}</div>
      {day.notice ? <div className="mt-4 card p-4 text-sm text-slate-700">{day.notice}</div> : null}
      <div className="mt-6">
        {day.entries?.length ? (
          <div className="card overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Entry</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {day.entries.map((e, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-700">{e.time ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-900">{e.text}</td>
                    <td className="px-4 py-3 text-slate-700">{e.locationPublic ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No entries published" />
        )}
      </div>
    </div>
  )
}
