import type { ReactNode } from 'react'
import './contact.css'

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="contact-layout">{children}</section>
}
