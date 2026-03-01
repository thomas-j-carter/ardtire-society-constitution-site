import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="contact-page__inner">
        <h1>Contact</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
