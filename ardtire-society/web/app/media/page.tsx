import { getSitePage, getMediaAssets, getDownloadsFor } from '../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageFrame } from '../../components/PageFrame'
import { DownloadsList } from '../../components/DownloadsList'
import { EmptyState } from '../../components/EmptyState'

export const revalidate = 300

export default async function MediaHub() {
  const page = await getSitePage('media', 'hub')
  if (!page) return <div className="container py-10"><EmptyState title="No entries published" /></div>

  const assets = await getMediaAssets()
  const downloads = await getDownloadsFor('media')

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Media', href: '/media' }]} />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
      <div className="container pb-10">
        <h2 className="text-lg font-semibold text-slate-900">Media assets</h2>
        <div className="mt-3 grid gap-3">
          {assets.length === 0 ? (
            <EmptyState title="No entries published" />
          ) : (
            assets.map((a) => (
              <div key={a.title} className="card p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{a.assetType}</div>
                <div className="mt-1 font-semibold text-slate-900">{a.title}</div>
                {a.usageNote ? <div className="mt-2 text-sm text-slate-700">{a.usageNote}</div> : null}
                {a.externalUrl ? (
                  <a className="btn btn-primary mt-3 inline-block" href={a.externalUrl}>
                    Download
                  </a>
                ) : null}
              </div>
            ))
          )}
        </div>

        <h2 className="mt-10 text-lg font-semibold text-slate-900">Downloads</h2>
        <div className="mt-3">
          {downloads.length ? <DownloadsList items={downloads} /> : <EmptyState title="No entries published" />}
        </div>
      </div>
    </div>
  )
}
