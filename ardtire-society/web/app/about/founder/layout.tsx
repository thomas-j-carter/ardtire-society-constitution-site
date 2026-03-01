import type { ReactNode } from 'react'
import './founder.css'

export default function FounderLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="founder-layout">{children}</section>
}
