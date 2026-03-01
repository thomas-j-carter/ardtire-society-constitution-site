import type { ReactNode } from 'react'
import './new.css'

export default function NewLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="new-layout">{children}</section>
}
