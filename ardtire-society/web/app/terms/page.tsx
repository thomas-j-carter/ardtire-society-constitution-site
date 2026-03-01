import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms',
}

export default function TermsPage() {
  return (
    <main className="terms-page">
      <div className="terms-page__inner">
        <h1>Terms</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
