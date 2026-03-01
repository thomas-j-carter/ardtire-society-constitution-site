import Link from 'next/link'
import type { SiteSettings } from '../lib/sanity/types'

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{settings?.siteName ?? 'Ardtire Society'}</div>
          {settings?.tagline ? <div className="mt-1 text-sm text-slate-700">{settings.tagline}</div> : null}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Links</div>
          <ul className="mt-2 space-y-1 text-sm">
            {(settings?.footerNav ?? []).map((l) => (
              <li key={l.href}><Link href={l.href} className="text-slate-700 hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Contact</div>
          {settings?.contact?.email ? (
            <div className="mt-2 text-sm text-slate-700"><a href={`mailto:${settings.contact.email}`} className="hover:underline">{settings.contact.email}</a></div>
          ) : <div className="mt-2 text-sm text-slate-700">No contact listed.</div>}
          {settings?.contact?.note ? <div className="mt-2 text-sm text-slate-600">{settings.contact.note}</div> : null}
        </div>
      </div>
    </footer>
  )
}
