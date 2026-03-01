import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Vote',
}

export default function QuickVotePage() {
  return (
    <main className="quick-vote-page">
      <div className="quick-vote-page__inner">
        <h1>Quick Vote</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
