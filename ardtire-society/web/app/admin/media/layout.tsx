import type { ReactNode } from 'react'
import './media.css'

export default function MediaLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="media-layout">{children}</section>
}
