import Link from 'next/link'
import { getContentPostsByType } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { EmptyState } from '../../components/EmptyState'
import { TagPills } from '../../components/TagPills'
import { formatDateISO } from '../../lib/utils'

export const revalidate = 300

export default async function ListPage() {
  const items = await getContentPostsByType('messages', 50)
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Messages', href: '/messages' }]} />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Messages</h1>
      <div className="mt-6 grid gap-3">
        {items.length === 0 ? (
          <EmptyState title="No entries published" />
        ) : (
          items.map((p) => (
            <div key={p.slug} className="card p-4">
              <Link href={`/messages/${p.slug}`} className="text-base font-semibold text-slate-900 hover:underline">
                {p.title}
              </Link>
              <div className="mt-1 text-sm text-slate-700">{formatDateISO(p.date)}</div>
              {p.issuer ? <div className="mt-1 text-sm text-slate-600">{p.issuer}</div> : null}
              {p.excerpt ? <div className="mt-2 text-sm text-slate-700">{p.excerpt}</div> : null}
              <div className="mt-3">
                <TagPills items={p.topics ?? []} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
