import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Article',
}

export default function ArticlePage() {
  return (
    <main className="article-page">
      <div className="article-page__inner">
        <h1>Article</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
