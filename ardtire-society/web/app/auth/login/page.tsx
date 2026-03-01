import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-page__inner">
        <h1>Login</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
