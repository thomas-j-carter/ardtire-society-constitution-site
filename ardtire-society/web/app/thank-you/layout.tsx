import type { ReactNode } from 'react'
import './thank-you.css'

export default function ThankYouLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="thank-you-layout">{children}</section>
}
