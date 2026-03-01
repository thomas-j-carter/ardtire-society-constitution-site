'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

type MemberRole = 'founder'|'admin'|'member'|'observer'
type Row = { user_id: string; display_name: string | null; role: MemberRole; created_at: string }

export function AdminUsersTable() {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [rows, setRows] = useState<Row[]>([])
  const [status, setStatus] = useState<string>('')

  async function refresh() {
    const { data } = await supabase.from('profiles').select('user_id, display_name, role, created_at').order('created_at', { ascending: false })
    setRows((data as any) ?? [])
  }

  useEffect(() => { refresh() }, [])

  async function setRole(userId: string, role: MemberRole) {
    setStatus('Saving…')
    const { error } = await supabase.rpc('admin_set_user_role', { target_user_id: userId, new_role: role })
    if (error) setStatus('Error')
    else {
      setStatus('Saved')
      await refresh()
      setTimeout(() => setStatus(''), 1200)
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900">Users</div>
        {status ? <div className="text-xs text-slate-600">{status}</div> : null}
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-3 py-2 font-semibold">User</th>
              <th className="px-3 py-2 font-semibold">Role</th>
              <th className="px-3 py-2 font-semibold">Set</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.user_id} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-2">
                  <div className="font-semibold text-slate-900">{r.display_name ?? r.user_id}</div>
                </td>
                <td className="px-3 py-2 text-slate-700">{r.role}</td>
                <td className="px-3 py-2">
                  <select className="rounded-2xl border border-slate-200 px-2 py-1 text-sm" value={r.role} onChange={(e) => setRole(r.user_id, e.target.value as any)}>
                    <option value="founder">founder</option>
                    <option value="admin">admin</option>
                    <option value="member">member</option>
                    <option value="observer">observer</option>
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr><td className="px-3 py-3 text-slate-700" colSpan={3}>No entries published.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
