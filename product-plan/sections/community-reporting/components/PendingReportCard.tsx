import type { PendingReportCardProps } from '../types'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)

const typeConfig = {
  obstacle: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    text: 'text-amber-600 dark:text-amber-400',
  },
  improvement: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  'fixed-issue': {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'text-blue-600 dark:text-blue-400',
  },
}

const syncStatusConfig = {
  'pending-sync': {
    icon: (
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    label: 'Waiting to sync',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  synced: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    label: 'Synced',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  failed: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Sync failed',
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function PendingReportCard({ report, onRetry, onDelete }: PendingReportCardProps) {
  const type = typeConfig[report.type]
  const syncStatus = syncStatusConfig[report.syncStatus]

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border
        ${syncStatus.bg} ${syncStatus.border}
        p-3
      `}
    >
      {/* Sync status indicator */}
      <div className="flex items-center justify-between mb-2">
        <div className={`flex items-center gap-2 text-xs font-medium ${syncStatus.text}`}>
          {syncStatus.icon}
          <span>{syncStatus.label}</span>
          {report.retryCount > 0 && (
            <span className="text-slate-400 dark:text-slate-500">
              ({report.retryCount} {report.retryCount === 1 ? 'retry' : 'retries'})
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {formatTime(report.createdAt)}
        </span>
      </div>

      {/* Report info */}
      <div className="flex items-start gap-2">
        <span className={type.text}>{type.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {report.title}
          </h4>
          {report.location.address && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {report.location.address}
            </p>
          )}
        </div>
      </div>

      {/* Error message */}
      {report.errorMessage && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded px-2 py-1">
          {report.errorMessage}
        </p>
      )}

      {/* Actions for failed syncs */}
      {report.syncStatus === 'failed' && (
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-red-200 dark:border-red-800">
          <button
            onClick={() => onRetry?.()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
          <button
            onClick={() => onDelete?.()}
            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
