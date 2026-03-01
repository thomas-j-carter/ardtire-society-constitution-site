import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philosophy',
}

export default function PhilosophyPage() {
  return (
    <main className="philosophy-page">
      <div className="philosophy-page__inner">
        <h1>Philosophy</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
