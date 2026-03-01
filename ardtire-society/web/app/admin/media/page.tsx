import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media',
}

export default function MediaPage() {
  return (
    <main className="media-page">
      <div className="media-page__inner">
        <h1>Media</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
