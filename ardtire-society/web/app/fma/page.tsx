import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fma',
}

export default function FmaPage() {
  return (
    <main className="fma-page">
      <div className="fma-page__inner">
        <h1>Fma</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
