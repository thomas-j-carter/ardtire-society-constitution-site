import type { ReactNode } from 'react'
import './login.css'

export default function LoginLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="login-layout">{children}</section>
}
