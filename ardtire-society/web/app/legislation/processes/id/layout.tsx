import type { ReactNode } from 'react'
import './id.css'

export default function IdLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="id-layout">{children}</section>
}
