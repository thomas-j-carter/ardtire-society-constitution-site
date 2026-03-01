import type { ReactNode } from 'react'
import './faq.css'

export default function FaqLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="faq-layout">{children}</section>
}
