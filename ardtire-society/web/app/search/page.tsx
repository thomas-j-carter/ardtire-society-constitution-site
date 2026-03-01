import { searchAll } from '../../lib/sanity/fetchers'
import { SearchResults } from '../../components/SearchResults'
import { EmptyState } from '../../components/EmptyState'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim()
  const results = q ? await searchAll(q) : []
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Search</h1>
      <form className="mt-4" action="/search">
        <label className="sr-only" htmlFor="q">Search</label>
        <input id="q" name="q" defaultValue={q} className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm" placeholder="Search" />
      </form>
      <div className="mt-6">
        {q && results.length === 0 ? <EmptyState title="No results" /> : null}
        {results.length ? <SearchResults results={results} /> : null}
      </div>
    </div>
  )
}
