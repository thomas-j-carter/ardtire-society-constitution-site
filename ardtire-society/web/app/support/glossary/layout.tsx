import type { ReactNode } from 'react'
import './glossary.css'

export default function GlossaryLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="glossary-layout">{children}</section>
}
