import Link from 'next/link'
import type { SearchResult } from '../lib/sanity/types'

export function SearchResults({ results }: { results: SearchResult[] }) {
  return (
    <div className="grid gap-3">
      {results.map((r) => (
        <div key={r.href} className="card p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{r.kind}</div>
          <div className="mt-1"><Link href={r.href} className="text-base font-semibold text-slate-900 hover:underline">{r.title}</Link></div>
          {r.snippet ? <div className="mt-2 text-sm text-slate-700">{r.snippet}</div> : null}
        </div>
      ))}
    </div>
  )
}
