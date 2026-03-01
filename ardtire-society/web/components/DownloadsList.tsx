import Link from 'next/link'
import { formatDateISO } from '../lib/utils'

export function DownloadsList({ items }: { items: Array<{ title: string; category: string; updatedDate?: string; summary?: string; externalUrl?: string }> }) {
  return (
    <div className="grid gap-3">
      {items.map((d) => (
        <div key={d.title} className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-semibold text-slate-900">{d.title}</div>
            <div className="text-xs text-slate-600">{d.updatedDate ? formatDateISO(d.updatedDate) : ''}</div>
          </div>
          <div className="mt-1 text-xs text-slate-600">{d.category}</div>
          {d.summary ? <div className="mt-2 text-sm text-slate-700">{d.summary}</div> : null}
          {d.externalUrl ? <div className="mt-3"><Link href={d.externalUrl} className="btn btn-primary text-sm">Download</Link></div> : null}
        </div>
      ))}
    </div>
  )
}
