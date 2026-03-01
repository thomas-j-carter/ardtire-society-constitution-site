import type { ReactNode } from 'react'
import './forgot.css'

export default function ForgotLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="forgot-layout">{children}</section>
}
