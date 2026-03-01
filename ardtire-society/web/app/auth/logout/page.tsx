import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logout',
}

export default function LogoutPage() {
  return (
    <main className="logout-page">
      <div className="logout-page__inner">
        <h1>Logout</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
