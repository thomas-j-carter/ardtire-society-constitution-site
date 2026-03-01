import type { ReactNode } from 'react'
import './governance.css'

export default function GovernanceLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="governance-layout">{children}</section>
}
