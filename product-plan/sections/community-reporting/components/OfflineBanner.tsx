import type { OfflineIndicatorProps } from '../types'

export function OfflineBanner({ isOffline, pendingCount, onSyncNow }: OfflineIndicatorProps) {
  if (!isOffline && pendingCount === 0) return null

  if (isOffline) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50">
          <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            You're offline
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {pendingCount > 0
              ? `${pendingCount} ${pendingCount === 1 ? 'report' : 'reports'} will sync when you reconnect`
              : 'Reports will be saved locally and sync later'}
          </p>
        </div>
      </div>
    )
  }

  // Online but has pending reports
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50">
        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Syncing reports
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {pendingCount} {pendingCount === 1 ? 'report' : 'reports'} uploading...
        </p>
      </div>
      <button
        onClick={() => onSyncNow?.()}
        className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md transition-colors"
      >
        Sync now
      </button>
    </div>
  )
}
