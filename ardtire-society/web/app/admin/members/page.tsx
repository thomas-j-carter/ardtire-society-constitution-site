import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Members',
}

export default function MembersPage() {
  return (
    <main className="members-page">
      <div className="members-page__inner">
        <h1>Members</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
