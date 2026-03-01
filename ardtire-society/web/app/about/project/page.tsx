import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project',
}

export default function ProjectPage() {
  return (
    <main className="project-page">
      <div className="project-page__inner">
        <h1>Project</h1>
        <p>Replace this scaffolded content with your real page content.</p>
      </div>
    </main>
  )
}
