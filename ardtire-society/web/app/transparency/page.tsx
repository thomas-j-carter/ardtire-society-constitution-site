import { getSitePage } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageFrame } from '../../components/PageFrame'
import { EmptyState } from '../../components/EmptyState'

export const revalidate = 300

export default async function Page() {
  const page = await getSitePage('transparency', 'hub')
  if (!page) return <div className="container py-10"><EmptyState title="No entries published" /></div>
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Transparency', href: '/transparency' }]} />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
    </div>
  )
}
