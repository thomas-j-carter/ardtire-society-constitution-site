export type LegislationMetric = {
  label: string
  value: number
  href: string
}

export type LegislationRecord = {
  label: string
  title: string
  href: string
  updatedAt: string
}

export type LegislationSummary = {
  generatedAt: string
  metrics: LegislationMetric[]
  latestPass: LegislationRecord | null
}

export async function getLegislationSummary(): Promise<LegislationSummary> {
  const now = new Date().toISOString()

  /**
   * Replace this with your real data layer.
   *
   * Suggested mapping:
   * - Open Polls: count of polls where status = 'open'
   * - Active Proposals: count of proposals in active workflow states
   * - Tracked Processes: count of active/published processes
   * - Latest Pass: most recent enacted pass ordered by passed/effective date desc
   */
  return {
    generatedAt: now,
    metrics: [
      {
        label: 'Open Polls',
        value: 3,
        href: '/legislation/polls',
      },
      {
        label: 'Active Proposals',
        value: 12,
        href: '/legislation/proposals',
      },
      {
        label: 'Tracked Processes',
        value: 5,
        href: '/legislation/processes',
      },
    ],
    latestPass: {
      label: 'Latest Pass',
      title: 'Pass 2026-001 — Standing Rules Update',
      href: '/legislation/passes',
      updatedAt: now,
    },
  }
}