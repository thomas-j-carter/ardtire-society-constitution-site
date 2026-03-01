import type { ReactNode } from 'react'
import './delete.css'

export default function DeleteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="delete-layout">{children}</section>
}
