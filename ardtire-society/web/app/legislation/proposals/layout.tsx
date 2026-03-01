import type { ReactNode } from 'react'
import './proposals.css'

export default function ProposalsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="proposals-layout">{children}</section>
}
