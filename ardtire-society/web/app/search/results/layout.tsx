import type { ReactNode } from 'react'
import './results.css'

export default function ResultsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="results-layout">{children}</section>
}
