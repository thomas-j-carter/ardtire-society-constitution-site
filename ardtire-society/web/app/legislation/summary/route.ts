import { getLegislationSummary } from '@/lib/legislation-summary'

export async function GET() {
  const summary = await getLegislationSummary()
  return Response.json(summary)
}