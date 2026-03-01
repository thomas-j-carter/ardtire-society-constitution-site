import Link from 'next/link'
export type Crumb = { label: string; href: string }
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null
  return (
    <nav aria-label="Breadcrumb" className="container pt-4 text-sm text-slate-700">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i ? <span aria-hidden="true" className="text-slate-400">/</span> : null}
            <Link href={c.href} className="hover:underline">{c.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
