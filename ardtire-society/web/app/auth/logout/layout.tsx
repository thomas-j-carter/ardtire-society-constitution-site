import type { ReactNode } from 'react'
import './logout.css'

export default function LogoutLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="logout-layout">{children}</section>
}
