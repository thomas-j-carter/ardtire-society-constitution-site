import type { ReactNode } from 'react'
import './privacy.css'

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="privacy-layout">{children}</section>
}
