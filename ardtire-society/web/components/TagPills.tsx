export function TagPills({ items = [] }: { items?: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
          {t}
        </span>
      ))}
    </div>
  )
}
