import type { ReactNode } from 'react'
import './dashboard.css'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <section className="dashboard-layout">{children}</section>
}
