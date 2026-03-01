import { notFound } from 'next/navigation'
import { getSitePage } from '../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { PageFrame } from '../../../components/PageFrame'

export const revalidate = 300

export default async function RoyalHouseSubpage({ params }: { params: { key: string } }) {
  const page = await getSitePage('royalHouse', params.key)
  if (!page) return notFound()
  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Royal House', href: '/royal-house' },
        { label: page.title, href: `/royal-house/${params.key}` },
      ]} />
      <PageFrame kicker={page.kicker} title={page.title} subtitle={page.subtitle} body={page.body} />
    </div>
  )
}
