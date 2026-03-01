import { DocumentsManager } from '../../../components/app/DocumentsManager'
export const dynamic = 'force-dynamic'
export default function DocumentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Documents</h1>
      <div className="mt-6"><DocumentsManager /></div>
    </div>
  )
}
