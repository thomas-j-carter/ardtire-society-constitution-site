import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polls',
}

export default function PollsPage() {
  return (
    <main className="polls-page">
      <div className="polls-page__inner">
        <h1>Polls</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
