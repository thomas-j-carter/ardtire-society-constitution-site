import type { ReactNode } from 'react'
import './background.css'

export default function BackgroundLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="background-layout">{children}</section>
}
