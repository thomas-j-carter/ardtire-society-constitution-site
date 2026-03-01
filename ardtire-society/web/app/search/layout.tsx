import type { ReactNode } from 'react'
import './search.css'

export default function SearchLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="search-layout">{children}</section>
}
