import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete',
}

export default function DeletePage() {
  return (
    <main className="delete-page">
      <div className="delete-page__inner">
        <h1>Delete</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
