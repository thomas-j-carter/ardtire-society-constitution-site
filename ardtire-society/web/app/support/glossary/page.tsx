import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Glossary',
}

export default function GlossaryPage() {
  return (
    <main className="glossary-page">
      <div className="glossary-page__inner">
        <h1>Glossary</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
