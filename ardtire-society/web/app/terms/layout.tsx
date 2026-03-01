import type { ReactNode } from 'react'
import './terms.css'

export default function TermsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="terms-layout">{children}</section>
}
