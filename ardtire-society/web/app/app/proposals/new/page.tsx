import { ProposalCreateForm } from '../../../../components/app/ProposalCreateForm'
export const dynamic = 'force-dynamic'
export default function NewProposalPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">New proposal</h1>
      <div className="mt-6"><ProposalCreateForm /></div>
    </div>
  )
}
