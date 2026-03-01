import type { ReactNode } from 'react'
import './register.css'

export default function RegisterLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="register-layout">{children}</section>
}
