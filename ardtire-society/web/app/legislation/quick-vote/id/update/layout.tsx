import type { ReactNode } from 'react'
import './update.css'

export default function UpdateLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="update-layout">{children}</section>
}
