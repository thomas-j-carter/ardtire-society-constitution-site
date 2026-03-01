import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gaelic',
}

export default function GaelicPage() {
  return (
    <main className="gaelic-page">
      <div className="gaelic-page__inner">
        <h1>Gaelic</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
