import type { ReactNode } from 'react'
import './how-to-use.css'

export default function HowToUseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="how-to-use-layout">{children}</section>
}
