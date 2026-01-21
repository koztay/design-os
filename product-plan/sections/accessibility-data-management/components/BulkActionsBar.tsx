import type { ItemStatus } from '../types'

interface BulkActionsBarProps {
  selectedCount: number
  onBulkDelete?: () => void
  onBulkStatusChange?: (status: ItemStatus) => void
  onClearSelection?: () => void
}

export function BulkActionsBar({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onClearSelection,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-slate-700 text-white shadow-2xl shadow-slate-900/30 dark:shadow-black/50 border border-slate-700 dark:border-slate-600">
        <div className="flex items-center gap-2 pr-3 border-r border-slate-700 dark:border-slate-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-xs font-bold">
            {selectedCount}
          </span>
          <span className="text-sm text-slate-300">selected</span>
        </div>

        {/* Status Change Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Change Status
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute bottom-full left-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
            <div className="py-2 rounded-xl bg-slate-800 dark:bg-slate-600 shadow-xl border border-slate-700 dark:border-slate-500 min-w-[140px]">
              {(['active', 'reported', 'pending', 'verified', 'resolved'] as ItemStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => onBulkStatusChange?.(status)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors capitalize"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={onBulkDelete}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>

        {/* Close Button */}
        <button
          onClick={onClearSelection}
          className="ml-1 p-1.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
