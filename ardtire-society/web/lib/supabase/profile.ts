import { supabaseServer } from './server'

export async function getMyProfile() {
  const supabase = supabaseServer()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data } = await supabase.from('profiles').select('user_id, display_name, role').eq('user_id', auth.user.id).maybeSingle()
  return data ?? null
}
