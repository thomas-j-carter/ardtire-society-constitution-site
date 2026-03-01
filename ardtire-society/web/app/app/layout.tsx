import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireUser } from '../../lib/supabase/auth'
import { getMyProfile } from '../../lib/supabase/profile'
import { hasRole } from '../../lib/supabase/rbac'

export const dynamic = 'force-dynamic'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  if (!user) redirect('/auth/sign-in')

  const profile = await getMyProfile()
  const role = (profile?.role ?? 'observer') as any

  return (
    <div className="container py-8">
      <div className="card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Member area</div>
            <div className="text-xs text-slate-600">Role: {role}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="btn" href="/app/dashboard">Dashboard</Link>
            <Link className="btn" href="/app/documents">Documents</Link>
            {hasRole(role, 'admin') ? <Link className="btn" href="/app/admin">Admin</Link> : null}
            <Link className="btn btn-primary" href="/auth/sign-out">Sign out</Link>
          </div>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}
