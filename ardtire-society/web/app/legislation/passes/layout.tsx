import type { ReactNode } from 'react'
import './passes.css'

export default function PassesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="passes-layout">{children}</section>
}
