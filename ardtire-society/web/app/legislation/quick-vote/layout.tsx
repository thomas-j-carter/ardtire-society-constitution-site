import type { ReactNode } from 'react'
import './quick-vote.css'

export default function QuickVoteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="quick-vote-layout">{children}</section>
}
