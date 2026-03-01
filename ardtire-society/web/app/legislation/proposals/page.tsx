import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proposals',
}

export default function ProposalsPage() {
  return (
    <main className="proposals-page">
      <div className="proposals-page__inner">
        <h1>Proposals</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
