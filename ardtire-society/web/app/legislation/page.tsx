import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legislation',
}

export default function LegislationPage() {
  return (
    <main className="legislation-page">
      <div className="legislation-page__inner">
        <h1>Legislation</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
