import type { ReactNode } from 'react'
import './sections.css'

export default function SectionsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="sections-layout">{children}</section>
}
