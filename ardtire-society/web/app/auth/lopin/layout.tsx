import type { ReactNode } from 'react'
import './lopin.css'

export default function LopinLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="lopin-layout">{children}</section>
}
