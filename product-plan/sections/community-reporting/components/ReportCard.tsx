import type { Report, ReportCardProps } from '../types'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)
// Typography: Inter for headings and body

const typeConfig = {
  obstacle: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  improvement: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  'fixed-issue': {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
}

const statusConfig = {
  pending: {
    label: 'Pending',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-600 dark:text-slate-400',
  },
  active: {
    label: 'Active',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  verified: {
    label: 'Verified',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  resolved: {
    label: 'Resolved',
    bg: 'bg-slate-100 dark:bg-slate-700',
    text: 'text-slate-500 dark:text-slate-400',
  },
  disputed: {
    label: 'Disputed',
    bg: 'bg-red-100 dark:bg-red-900/40',
    text: 'text-red-700 dark:text-red-300',
  },
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

export function ReportCard({ report, onView, onNavigate, onVerify, onDispute }: ReportCardProps) {
  const type = typeConfig[report.type]
  const status = statusConfig[report.status]

  return (
    <article
      className={`
        group relative overflow-hidden rounded-xl border
        bg-white dark:bg-slate-900
        border-slate-200 dark:border-slate-700
        shadow-sm hover:shadow-md
        transition-all duration-200
        cursor-pointer
      `}
      onClick={() => onView?.()}
    >
      {/* Type indicator stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${type.bg.replace('bg-', 'bg-').replace('-100', '-400').replace('-900/30', '-500')}`} />

      <div className="p-4 pl-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Type icon */}
          <div className={`shrink-0 p-2 rounded-lg ${type.bg} ${type.text}`}>
            {type.icon}
          </div>

          {/* Title and meta */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {report.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400">
              <span>{report.authorName}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>{formatRelativeTime(report.createdAt)}</span>
            </div>
          </div>

          {/* Status badge */}
          <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>

        {/* Description preview */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
          {report.description}
        </p>

        {/* Photo thumbnail if available */}
        {report.photoUrl && (
          <div className="mb-3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 h-32 w-full">
            <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Location */}
        {report.location.address && (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{report.location.address}</span>
          </div>
        )}

        {/* Footer: Votes and actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Vote counts */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); onVerify?.() }}
              className={`
                flex items-center gap-1.5 text-sm font-medium
                transition-colors
                ${report.userVote === 'verify'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'}
              `}
            >
              <svg className="w-4 h-4" fill={report.userVote === 'verify' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{report.verifyCount}</span>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onDispute?.() }}
              className={`
                flex items-center gap-1.5 text-sm font-medium
                transition-colors
                ${report.userVote === 'dispute'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400'}
              `}
            >
              <svg className="w-4 h-4" fill={report.userVote === 'dispute' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{report.disputeCount}</span>
            </button>
          </div>

          {/* Navigate button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate?.() }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="hidden sm:inline">Navigate</span>
          </button>
        </div>
      </div>
    </article>
  )
}
