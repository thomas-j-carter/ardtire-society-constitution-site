import type { ReactNode } from 'react'
import './community.css'

export default function CommunityLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="community-layout">{children}</section>
}
