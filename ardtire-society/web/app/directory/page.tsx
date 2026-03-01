import { getRoleAssignments } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { EmptyState } from '../../components/EmptyState'
import { RosterGrid } from '../../components/RosterGrid'

export const revalidate = 300

export default async function DirectoryPage() {
  const items = await getRoleAssignments()
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Directory', href: '/directory' }]} />
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Directory</h1>
      <div className="mt-6">
        {items.length ? <RosterGrid items={items as any} /> : <EmptyState title="No entries published" />}
      </div>
    </div>
  )
}
