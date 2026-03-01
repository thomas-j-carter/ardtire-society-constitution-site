import type { ReactNode } from 'react'
import './article.css'

export default function ArticleLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="article-layout">{children}</section>
}
