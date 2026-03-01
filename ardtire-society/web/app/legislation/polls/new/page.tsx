import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New',
}

export default function NewPage() {
  return (
    <main className="new-page">
      <div className="new-page__inner">
        <h1>New</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
