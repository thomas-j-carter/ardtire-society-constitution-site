import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-page__inner">
        <h1>Dashboard</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
