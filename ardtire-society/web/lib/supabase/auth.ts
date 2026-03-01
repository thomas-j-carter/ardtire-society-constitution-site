import { supabaseServer } from './server'

export async function requireUser() {
  const supabase = supabaseServer()
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}
