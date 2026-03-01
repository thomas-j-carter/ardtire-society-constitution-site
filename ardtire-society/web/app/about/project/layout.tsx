import type { ReactNode } from 'react'
import './project.css'

export default function ProjectLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="project-layout">{children}</section>
}
