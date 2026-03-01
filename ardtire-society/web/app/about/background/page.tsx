import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Background',
}

export default function BackgroundPage() {
  return (
    <main className="background-page">
      <div className="background-page__inner">
        <h1>Background</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
