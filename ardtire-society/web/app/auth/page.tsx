import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth',
}

export default function AuthPage() {
  return (
    <main className="auth-page">
      <div className="auth-page__inner">
        <h1>Auth</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
