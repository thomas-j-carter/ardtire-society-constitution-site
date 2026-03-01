import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Constitution',
}

export default function ConstitutionPage() {
  return (
    <main className="constitution-page">
      <div className="constitution-page__inner">
        <h1>Constitution</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
