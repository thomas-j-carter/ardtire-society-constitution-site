import type { ReactNode } from 'react'
import './polls.css'

export default function PollsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="polls-layout">{children}</section>
}
