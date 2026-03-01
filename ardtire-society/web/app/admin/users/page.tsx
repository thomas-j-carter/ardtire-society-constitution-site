import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

export default function UsersPage() {
  return (
    <main className="users-page">
      <div className="users-page__inner">
        <h1>Users</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
