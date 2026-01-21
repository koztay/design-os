import { useState } from 'react'
import type {
  CommunityReportingProps,
  ReportType,
  ReportStatus,
} from '../types'
import { ReportCard } from './ReportCard'
import { PendingReportCard } from './PendingReportCard'
import { OfflineBanner } from './OfflineBanner'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)
// Typography: Inter

const filterOptions: { type: ReportType | null; label: string }[] = [
  { type: null, label: 'All' },
  { type: 'obstacle', label: 'Obstacles' },
  { type: 'improvement', label: 'Improvements' },
  { type: 'fixed-issue', label: 'Fixed' },
]

const statusOptions: { status: ReportStatus | null; label: string }[] = [
  { status: null, label: 'Any status' },
  { status: 'active', label: 'Active' },
  { status: 'verified', label: 'Verified' },
  { status: 'pending', label: 'Pending' },
  { status: 'disputed', label: 'Disputed' },
  { status: 'resolved', label: 'Resolved' },
]

export function ReportsList({
  reports,
  pendingReports,
  reportTypes,
  currentLocation,
  isOffline,
  onViewReport,
  onNavigateToReport,
  onStartReport,
  onVerifyReport,
  onDisputeReport,
  onSyncPendingReports,
  onRetrySync,
  onDeletePendingReport,
  onFilterByType,
  onFilterByStatus,
}: CommunityReportingProps) {
  const [activeTypeFilter, setActiveTypeFilter] = useState<ReportType | null>(null)
  const [activeStatusFilter, setActiveStatusFilter] = useState<ReportStatus | null>(null)
  const [showPendingQueue, setShowPendingQueue] = useState(true)

  const handleTypeFilter = (type: ReportType | null) => {
    setActiveTypeFilter(type)
    onFilterByType?.(type)
  }

  const handleStatusFilter = (status: ReportStatus | null) => {
    setActiveStatusFilter(status)
    onFilterByStatus?.(status)
  }

  // Filter reports based on active filters
  const filteredReports = reports.filter((report) => {
    if (activeTypeFilter && report.type !== activeTypeFilter) return false
    if (activeStatusFilter && report.status !== activeStatusFilter) return false
    return true
  })

  const hasPendingReports = pendingReports.length > 0
  const failedReports = pendingReports.filter((r) => r.syncStatus === 'failed')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Offline/Sync banner */}
      <OfflineBanner
        isOffline={isOffline}
        pendingCount={pendingReports.length}
        onSyncNow={onSyncPendingReports}
      />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Community Reports
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'}
                {activeTypeFilter || activeStatusFilter ? ' (filtered)' : ''}
              </p>
            </div>

            {/* Current location indicator */}
            {currentLocation?.address && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-300">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate max-w-[150px]">{currentLocation.address}</span>
              </div>
            )}
          </div>

          {/* Type filter tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
            {filterOptions.map(({ type, label }) => (
              <button
                key={type ?? 'all'}
                onClick={() => handleTypeFilter(type)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap
                  transition-all duration-200
                  ${activeTypeFilter === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}
                `}
              >
                {label}
              </button>
            ))}

            {/* Status dropdown */}
            <div className="relative ml-auto">
              <select
                value={activeStatusFilter ?? ''}
                onChange={(e) => handleStatusFilter((e.target.value || null) as ReportStatus | null)}
                className="appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-0 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {statusOptions.map(({ status, label }) => (
                  <option key={status ?? 'any'} value={status ?? ''}>
                    {label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Pending reports queue */}
        {hasPendingReports && (
          <section className="mb-6">
            <button
              onClick={() => setShowPendingQueue(!showPendingQueue)}
              className="flex items-center justify-between w-full mb-3"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Pending Queue
                </h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full">
                  {pendingReports.length}
                </span>
                {failedReports.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full">
                    {failedReports.length} failed
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${showPendingQueue ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showPendingQueue && (
              <div className="space-y-2">
                {pendingReports.map((report) => (
                  <PendingReportCard
                    key={report.id}
                    report={report}
                    onRetry={() => onRetrySync?.(report.id)}
                    onDelete={() => onDeletePendingReport?.(report.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Reports list */}
        <section>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">
            Recent Reports
          </h2>

          {filteredReports.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1">
                No reports found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {activeTypeFilter || activeStatusFilter
                  ? 'Try adjusting your filters'
                  : 'Be the first to report an accessibility issue'}
              </p>
              {(activeTypeFilter || activeStatusFilter) && (
                <button
                  onClick={() => {
                    handleTypeFilter(null)
                    handleStatusFilter(null)
                  }}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={() => onViewReport?.(report.id)}
                  onNavigate={() => onNavigateToReport?.(report.id)}
                  onVerify={() => onVerifyReport?.(report.id)}
                  onDispute={() => onDisputeReport?.(report.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => onStartReport?.()}
        className={`
          fixed bottom-6 right-6 z-20
          flex items-center gap-2 px-6 py-4
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          text-white font-semibold
          rounded-full shadow-lg hover:shadow-xl
          transition-all duration-200
          ${isOffline ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950' : ''}
        `}
        aria-label="Report new issue"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">Report Issue</span>
      </button>
    </div>
  )
}
