import type { ReactNode } from 'react'
import './gaelic.css'

export default function GaelicLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="gaelic-layout">{children}</section>
}
