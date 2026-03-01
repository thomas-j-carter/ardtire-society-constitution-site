import type { ReactNode } from 'react'
import './documents.css'

export default function DocumentsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="documents-layout">{children}</section>
}
