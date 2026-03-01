import type { ReactNode } from 'react'
import './users.css'

export default function UsersLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="users-layout">{children}</section>
}
