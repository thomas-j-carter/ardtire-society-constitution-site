import { getInstruments } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { RegisterTable } from '../../../components/RegisterTable'
import { EmptyState } from '../../../components/EmptyState'

export const revalidate = 300

export default async function InstrumentsList() {
  const items = await getInstruments(100)
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Instrument Register', href: '/register/instruments' }]} />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Instrument Register</h1>
      <div className="mt-6">
        {items.length ? (
          <RegisterTable
            rows={items.map((i) => ({
              href: `/register/instruments/${i.slug}`,
              cite: i.cite,
              title: i.title,
              date: i.date,
              status: i.status,
            }))}
          />
        ) : (
          <EmptyState title="No entries published" />
        )}
      </div>
    </div>
  )
}
