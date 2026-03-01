import { notFound } from 'next/navigation'
import { getContentPost } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { PageFrame } from '../../../components/PageFrame'
import { TagPills } from '../../../components/TagPills'
import { formatDateISO } from '../../../lib/utils'

export const revalidate = 300

export default async function DetailPage({ params }: { params: { slug: string } }) {
  const post = await getContentPost('news', params.slug)
  if (!post) return notFound()
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: post.title, href: `/news/${post.slug}` },
        ]}
      />
      <div className="container pt-6">
        <div className="text-sm text-slate-700">
          {formatDateISO(post.date)}{post.issuer ? ` • ${post.issuer}` : ''}
        </div>
        <div className="mt-3">
          <TagPills items={post.topics ?? []} />
        </div>
      </div>
      <PageFrame kicker={post.type} title={post.title} subtitle={post.excerpt} body={post.body} />
    </div>
  )
}
