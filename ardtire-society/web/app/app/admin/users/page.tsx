import { redirect } from 'next/navigation'
import { getMyProfile } from '../../../../lib/supabase/profile'
import { hasRole } from '../../../../lib/supabase/rbac'
import { AdminUsersTable } from '../../../../components/app/AdminUsersTable'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const profile = await getMyProfile()
  if (!hasRole((profile?.role ?? 'observer') as any, 'admin')) redirect('/app/dashboard')
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
      <div className="mt-6"><AdminUsersTable /></div>
    </div>
  )
}
