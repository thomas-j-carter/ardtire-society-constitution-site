import type { ReactNode } from 'react'
import './apply.css'

export default function ApplyLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="apply-layout">{children}</section>
}
