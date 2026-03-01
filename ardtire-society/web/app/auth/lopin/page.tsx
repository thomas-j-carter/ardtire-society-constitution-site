import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lopin',
}

export default function LopinPage() {
  return (
    <main className="lopin-page">
      <div className="lopin-page__inner">
        <h1>Lopin</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
