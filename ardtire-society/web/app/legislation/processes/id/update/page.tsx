import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Update',
}

export default function UpdatePage() {
  return (
    <main className="update-page">
      <div className="update-page__inner">
        <h1>Update</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
