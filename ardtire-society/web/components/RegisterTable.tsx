import Link from 'next/link'
import { formatDateISO } from '../lib/utils'

export function RegisterTable({ rows }: { rows: Array<{ href: string; cite?: string; title: string; date: string; status?: string }> }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Cite</th>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.href} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-3 text-slate-700">{r.cite ?? '—'}</td>
              <td className="px-4 py-3"><Link href={r.href} className="font-semibold text-slate-900 hover:underline">{r.title}</Link></td>
              <td className="px-4 py-3 text-slate-700">{formatDateISO(r.date)}</td>
              <td className="px-4 py-3 text-slate-700">{r.status ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
