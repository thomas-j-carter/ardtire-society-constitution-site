import { notFound } from 'next/navigation'
import { getSitePage } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { PageFrame } from '../../../components/PageFrame'

export const revalidate = 300

export default async function CrownSubpage({ params }: { params: { key: string } }) {
  const page = await getSitePage('crown', params.key)
  if (!page) return notFound()
  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Crown', href: '/crown' },
        { label: page.title, href: `/crown/${params.key}` },
      ]} />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
    </div>
  )
}
