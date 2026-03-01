export type MemberRole = 'founder'|'admin'|'member'|'observer'
const rank: Record<MemberRole, number> = { observer: 1, member: 2, admin: 3, founder: 4 }
export function hasRole(role: MemberRole | null | undefined, atLeast: MemberRole) {
  if (!role) return false
  return rank[role] >= rank[atLeast]
}
