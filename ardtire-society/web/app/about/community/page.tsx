import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
}

export default function CommunityPage() {
  return (
    <main className="community-page">
      <div className="community-page__inner">
        <h1>Community</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
