import type { ReactNode } from 'react'
import './articles.css'

export default function ArticlesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="articles-layout">{children}</section>
}
