import { notFound } from 'next/navigation'
import { getInstrument } from '../../../../lib/sanity/fetchers'
import { Breadcrumbs } from '../../../../components/Breadcrumbs'
import { PageFrame } from '../../../../components/PageFrame'
import { formatDateISO } from '../../../../lib/utils'

export const revalidate = 300

export default async function InstrumentDetail({ params }: { params: { slug: string } }) {
  const inst = await getInstrument(params.slug)
  if (!inst) return notFound()
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Instrument Register', href: '/register/instruments' },
          { label: inst.title, href: `/register/instruments/${inst.slug}` },
        ]}
      />
      <div className="container pt-6 text-sm text-slate-700">
        {inst.cite} • {formatDateISO(inst.date)}{inst.status ? ` • ${inst.status}` : ''}
      </div>
      <PageFrame kicker="Instrument" title={inst.title} subtitle={inst.summary} body={inst.body} />
    </div>
  )
}
