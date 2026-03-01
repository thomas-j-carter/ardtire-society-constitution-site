import { redirect } from 'next/navigation'
import { SignActionButton } from '@/components/governance/SignActionButton'
import { supabaseServer } from '@/lib/supabase/server'

export default async function FounderApprovalQueue() {
  const supabase = supabaseServer()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .single()

  if (profile?.role !== 'Founder') {
    redirect('/dashboard')
  }

  const { data: actions } = await supabase
    .from('pending_governance_actions')
    .select('*')
    .eq('status', 'pending')


  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Executive Approval Queue</h2>
      
      <div className="space-y-4">
        {actions?.length === 0 && (
          <p className="text-slate-500 italic">No actions requiring signature at this time.</p>
        )}
        
        {actions?.map((action) => (
          <div key={action.id} className="p-6 bg-white border-l-4 border-l-indigo-600 shadow-sm rounded-r-xl border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{action.action_type}</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Target: {action.payload.target_user_id}
                </h3>
                <p className="text-sm text-slate-600">New Role: {action.payload.new_role}</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Signatures: {action.current_signatures.length} / {action.required_signatures}
                </p>
                {/* Client Component for the RPC Call */}
                <SignActionButton actionId={action.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}