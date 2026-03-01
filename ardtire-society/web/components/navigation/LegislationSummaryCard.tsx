'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import styles from './SiteHeader.module.css'
import type { LegislationSummary } from '../../lib/legislation-summary'

export default function LegislationSummaryCard({
  overviewHref,
}: {
  overviewHref: string
}) {
  const [data, setData] = useState<LegislationSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const response = await fetch('/api/legislation/summary', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const nextData = (await response.json()) as LegislationSummary

        if (!active) {
          return
        }

        setData(nextData)
        setHasError(false)
      } catch {
        if (!active) {
          return
        }

        setHasError(true)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void load()

    const intervalId = window.setInterval(() => {
      void load()
    }, 60_000)

    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  const generatedLabel = useMemo(() => {
    if (!data?.generatedAt) {
      return null
    }

    const date = new Date(data.generatedAt)

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }, [data])

  return (
    <section className={styles.summaryCard} aria-label="Legislation summary">
      <p className={styles.summaryEyebrow}>Legislative Records</p>

      <Link href={overviewHref} className={styles.summaryTitle}>
        Legislation Overview
      </Link>

      <p className={styles.summaryLead}>
        Live snapshot of current legislative activity and the latest enacted record.
      </p>

      {isLoading ? (
        <p className={styles.summaryMeta}>Loading current record summary…</p>
      ) : null}

      {hasError ? (
        <p className={styles.summaryError}>
          Current totals are temporarily unavailable.
        </p>
      ) : null}

      {data?.latestPass ? (
        <Link href={data.latestPass.href} className={styles.summaryFeatured}>
          <span className={styles.summaryFeaturedLabel}>{data.latestPass.label}</span>
          <span className={styles.summaryFeaturedTitle}>{data.latestPass.title}</span>
        </Link>
      ) : null}

      {data?.metrics?.length ? (
        <div className={styles.summaryMetricGrid}>
          {data.metrics.map((metric) => (
            <Link
              key={metric.label}
              href={metric.href}
              className={styles.summaryMetricLink}
            >
              <span className={styles.summaryMetricValue}>{metric.value}</span>
              <span className={styles.summaryMetricLabel}>{metric.label}</span>
            </Link>
          ))}
        </div>
      ) : null}

      {generatedLabel ? (
        <p className={styles.summaryMeta}>Updated {generatedLabel}</p>
      ) : null}
    </section>
  )
}