import type { ReactNode } from 'react'
import './support.css'

export default function SupportLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="support-layout">{children}</section>
}
