import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You',
}

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <div className="thank-you-page__inner">
        <h1>Thank You</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
