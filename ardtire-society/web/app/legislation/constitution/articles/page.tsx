import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
}

export default function ArticlesPage() {
  return (
    <main className="articles-page">
      <div className="articles-page__inner">
        <h1>Articles</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
