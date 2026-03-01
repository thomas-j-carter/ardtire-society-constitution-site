import type { ReactNode } from 'react'
import './fma.css'

export default function FmaLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="fma-layout">{children}</section>
}
