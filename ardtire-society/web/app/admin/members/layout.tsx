import type { ReactNode } from 'react'
import './members.css'

export default function MembersLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="members-layout">{children}</section>
}
