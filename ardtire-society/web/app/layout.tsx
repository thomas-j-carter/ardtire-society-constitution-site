import type { Metadata } from 'next'
import '../styles/globals.css'
import { getSiteSettings } from '../lib/sanity/fetchers'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export const metadata: Metadata = {
  title: { default: 'Ardtire Society', template: '%s — Ardtire Society' },
  description: 'Official public information and records for the Ardtire Society.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <html lang="en">
      <body>
        <SiteHeader settings={settings} />
        <main id="content">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  )
}
