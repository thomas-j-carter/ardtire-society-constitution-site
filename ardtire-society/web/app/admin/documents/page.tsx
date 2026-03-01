import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents',
}

export default function DocumentsPage() {
  return (
    <main className="documents-page">
      <div className="documents-page__inner">
        <h1>Documents</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
