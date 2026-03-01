import type { ReactNode } from 'react'
import './help.css'

export default function HelpLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="help-layout">{children}</section>
}
