import type { ReactNode } from 'react'
import './legislation.css'

export default function LegislationLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="legislation-layout">{children}</section>
}
