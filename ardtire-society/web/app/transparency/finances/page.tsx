import { getSitePage, getDownloadsFor } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { PageFrame } from '../../../components/PageFrame'
import { DownloadsList } from '../../../components/DownloadsList'
import { EmptyState } from '../../../components/EmptyState'

export const revalidate = 300

export default async function Page() {
  const page = await getSitePage('transparency', 'finances')
  if (!page) return <div className="container py-10"><EmptyState title="No entries published" /></div>
  const downloads = await getDownloadsFor('transparency')
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Transparency', href: '/transparency' },
          { label: page.title, href: '/transparency/finances' },
        ]}
      />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
      <div className="container pb-10">
        <h2 className="text-lg font-semibold text-slate-900">Downloads</h2>
        <div className="mt-3">
          {downloads.length ? <DownloadsList items={downloads} /> : <EmptyState title="No entries published" />}
        </div>
      </div>
    </div>
  )
}
