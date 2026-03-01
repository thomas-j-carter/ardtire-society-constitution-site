import Link from 'next/link'
import type { SiteSettings } from '../lib/sanity/types'

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="truncate text-base font-semibold text-slate-900">
          {settings?.siteName ?? 'Ardtire Society'}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-3 md:flex">
          {(settings?.primaryNav ?? []).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-50">
              {l.label}
            </Link>
          ))}
          <Link href="/search" className="btn btn-primary text-sm">Search</Link>
          <Link href="/app/dashboard" className="btn text-sm">Member</Link>
        </nav>
        <div className="md:hidden">
          <Link href="/search" className="btn btn-primary text-sm">Search</Link>
        </div>
      </div>
    </header>
  )
}
