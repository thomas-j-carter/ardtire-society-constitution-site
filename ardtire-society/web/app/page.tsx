import Link from 'next/link'
import { getSiteSettings, getLatestPublications, getDiaryEntriesUpcoming } from '../lib/sanity/fetchers'
import { EmptyState } from '../components/EmptyState'
import { formatDateISO } from '../lib/utils'
import { TagPills } from '../components/TagPills'

export const revalidate = 300

export default async function HomePage() {
  const settings = await getSiteSettings()
  const pubs = await getLatestPublications(3)
  const diary = await getDiaryEntriesUpcoming(14, 6)

  return (
    <div className="container py-10">
      <div className="card p-6">
        <div className="text-xs font-semibold tracking-wide text-indigo-700">Official</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{settings?.siteName ?? 'Ardtire Society'}</h1>
        {settings?.tagline ? <p className="mt-2 max-w-2xl text-slate-700">{settings.tagline}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link className="btn btn-primary" href="/transparency">Transparency</Link>
          <Link className="btn" href="/news">Publications</Link>
          <Link className="btn" href="/register/instruments">Registers</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Latest publications</h2>
          <div className="mt-3 grid gap-3">
            {pubs.length === 0 ? <EmptyState title="No entries published" /> : pubs.map((p: any) => (
              <div key={`${p.type}:${p.slug}`} className="card p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{p.type}</div>
                <Link href={`/${p.type}/${p.slug}`} className="mt-1 block text-base font-semibold text-slate-900 hover:underline">{p.title}</Link>
                <div className="mt-1 text-sm text-slate-700">{formatDateISO(p.date)}</div>
                {p.excerpt ? <div className="mt-2 text-sm text-slate-700">{p.excerpt}</div> : null}
                <div className="mt-3"><TagPills items={p.topics ?? []} /></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Diary (next 14 days)</h2>
          <div className="mt-3 grid gap-3">
            {diary.length === 0 ? <EmptyState title="No entries published" /> : diary.map((d) => {
              const [yyyy, mm, dd] = d.date.split('-')
              return (
                <div key={`${d.date}:${d.slug}`} className="card p-4">
                  <Link href={`/diary/${yyyy}/${mm}/${dd}/${d.slug}`} className="text-base font-semibold text-slate-900 hover:underline">{d.title}</Link>
                  <div className="mt-1 text-sm text-slate-700">{formatDateISO(d.date)}</div>
                  {d.locationPublic ? <div className="mt-1 text-sm text-slate-600">{d.locationPublic}</div> : null}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
