import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help',
}

export default function HelpPage() {
  return (
    <main className="help-page">
      <div className="help-page__inner">
        <h1>Help</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
