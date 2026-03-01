import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faq',
}

export default function FaqPage() {
  return (
    <main className="faq-page">
      <div className="faq-page__inner">
        <h1>Faq</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
