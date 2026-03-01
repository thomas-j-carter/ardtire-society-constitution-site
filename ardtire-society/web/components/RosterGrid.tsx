import type { RoleAssignmentVM } from '../lib/sanity/types'

export function RosterGrid({ items }: { items: RoleAssignmentVM[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((ra) => (
        <div key={`${ra.role.category}-${ra.person.displayName}`} className="card p-4">
          <div className="font-semibold text-slate-900">{ra.person.displayName}</div>
          <div className="text-sm text-slate-700">{ra.role.name}</div>
          {ra.publicNote ? <div className="mt-1 text-xs text-slate-600">{ra.publicNote}</div> : null}
        </div>
      ))}
    </div>
  )
}
