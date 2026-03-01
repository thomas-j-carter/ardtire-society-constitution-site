'use client'
export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="mt-2 text-slate-700">An error occurred while rendering this page.</p>
      <button className="btn btn-primary mt-4" onClick={() => reset()}>Try again</button>
    </div>
  )
}
