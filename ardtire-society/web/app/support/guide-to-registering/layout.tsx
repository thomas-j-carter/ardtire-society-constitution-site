import type { ReactNode } from 'react'
import './guide-to-registering.css'

export default function GuideToRegisteringLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="guide-to-registering-layout">{children}</section>
}
