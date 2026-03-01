import type { ReactNode } from 'react'
import './philosophy.css'

export default function PhilosophyLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="philosophy-layout">{children}</section>
}
