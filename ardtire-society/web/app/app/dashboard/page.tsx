import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase/client'
import { getMyProfile } from '../../../lib/supabase/profile'
import { hasRole } from '../../../lib/supabase/rbac'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = supabaseBrowser()
  const profile = await getMyProfile()
  const role = (profile?.role ?? 'observer') as any

  const { data: proposals } = await supabase.from('proposals').select('id,title,status,created_at').order('created_at', { ascending: false }).limit(50)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        {hasRole(role, 'member') ? <Link className="btn btn-primary" href="/app/proposals/new">New proposal</Link> : null}
      </div>
      <div className="mt-6 grid gap-3">
        {(proposals ?? []).map((p) => (
          <Link key={p.id} href={`/app/proposals/${p.id}`} className="card p-4 hover:bg-slate-50">
            <div className="font-semibold text-slate-900">{p.title}</div>
            <div className="mt-1 text-xs text-slate-600">{p.status}</div>
          </Link>
        ))}
        {(proposals ?? []).length === 0 ? <div className="card p-4 text-sm text-slate-700">No entries published.</div> : null}
      </div>
    </div>
  )
}
