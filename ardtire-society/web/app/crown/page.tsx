import Link from 'next/link'
import { getSitePage } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageFrame } from '../../components/PageFrame'
import { EmptyState } from '../../components/EmptyState'

export const revalidate = 300

const items = [
  { key: 'realm', href: '/crown/realm', label: 'Realm' },
  { key: 'succession', href: '/crown/succession', label: 'Succession' },
  { key: 'council', href: '/crown/council', label: 'Council' },
  { key: 'instruments', href: '/crown/instruments', label: 'Instruments' },
  { key: 'symbols', href: '/crown/symbols', label: 'Symbols' },
  { key: 'honours', href: '/crown/honours', label: 'Honours' },
]

export default async function CrownHub() {
  const page = await getSitePage('crown', 'crown')
  if (!page) return <div className="container py-10"><EmptyState title="No entries published" /></div>
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crown', href: '/crown' }]} />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
      <div className="container pb-10">
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {items.map((i) => (
            <Link key={i.key} href={i.href} className="card p-4 hover:bg-slate-50">
              <div className="font-semibold text-slate-900">{i.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
