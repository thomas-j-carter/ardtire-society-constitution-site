import type { ReactNode } from 'react'
import './processes.css'

export default function ProcessesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="processes-layout">{children}</section>
}
