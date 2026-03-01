import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getMyProfile } from '../../../lib/supabase/profile'
import { hasRole } from '../../../lib/supabase/rbac'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const profile = await getMyProfile()
  if (!hasRole((profile?.role ?? 'observer') as any, 'admin')) redirect('/app/dashboard')
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Admin</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Link href="/app/admin/users" className="card p-4 hover:bg-slate-50"><div className="font-semibold text-slate-900">Users</div></Link>
      </div>
    </div>
  )
}
