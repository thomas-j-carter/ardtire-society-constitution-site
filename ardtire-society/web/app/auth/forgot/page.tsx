import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot',
}

export default function ForgotPage() {
  return (
    <main className="forgot-page">
      <div className="forgot-page__inner">
        <h1>Forgot</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
