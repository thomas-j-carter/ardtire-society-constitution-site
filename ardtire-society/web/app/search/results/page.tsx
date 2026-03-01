import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Results',
}

export default function ResultsPage() {
  return (
    <main className="results-page">
      <div className="results-page__inner">
        <h1>Results</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
