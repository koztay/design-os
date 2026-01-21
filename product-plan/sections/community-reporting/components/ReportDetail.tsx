import type { ReportDetailProps, ReportType, ReportStatus } from '../types'
import { VoteButtons } from './VoteButtons'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)
// Typography: Inter

const typeConfig: Record<ReportType, { label: string; icon: JSX.Element; color: string }> = {
  obstacle: {
    label: 'Obstacle',
    color: 'text-amber-600 dark:text-amber-400',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  improvement: {
    label: 'Improvement',
    color: 'text-emerald-600 dark:text-emerald-400',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  'fixed-issue': {
    label: 'Fixed Issue',
    color: 'text-blue-600 dark:text-blue-400',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
}

const statusConfig: Record<ReportStatus, { label: string; bg: string; text: string }> = {
  pending: {
    label: 'Pending Review',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-600 dark:text-slate-400',
  },
  active: {
    label: 'Active',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  verified: {
    label: 'Verified by Community',
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

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
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

export function ReportDetail({
  report,
  onEdit,
  onDelete,
  onVerify,
  onDispute,
  onNavigate,
  onClose,
}: ReportDetailProps) {
  const type = typeConfig[report.type]
  const status = statusConfig[report.status]
  const isOwnReport = report.authorName === 'You'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onClose?.()}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Report Details
            </h1>
            {isOwnReport ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit?.()}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete?.()}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-16" />
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-32">
        {/* Type and Status badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${type.color} bg-slate-100 dark:bg-slate-800`}>
            {type.icon}
            {type.label}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {report.title}
        </h2>

        {/* Author and date */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {report.authorName}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span title={formatDate(report.createdAt)}>
            {formatRelativeTime(report.createdAt)}
          </span>
          {report.updatedAt !== report.createdAt && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="italic">Updated {formatRelativeTime(report.updatedAt)}</span>
            </>
          )}
        </div>

        {/* Photo */}
        {report.photoUrl && (
          <div className="mb-6 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Photo</p>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Description
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {report.description}
          </p>
        </div>

        {/* Location card with mini-map */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Location
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Mini map placeholder */}
            <div className="relative aspect-[2/1] bg-slate-100 dark:bg-slate-700">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="detail-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-500" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#detail-grid)" />
                </svg>
              </div>
              {/* Center pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-500 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/* Address */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  {report.location.address && (
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {report.location.address}
                    </p>
                  )}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {report.location.latitude.toFixed(6)}, {report.location.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification stats */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Community Verification
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {report.verifyCount}
              </div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                Verifications
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {report.disputeCount}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                Disputes
              </div>
            </div>
          </div>
          {report.userVote && (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-3">
              You {report.userVote === 'verify' ? 'verified' : 'disputed'} this report
            </p>
          )}
        </div>
      </main>

      {/* Fixed footer with actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg safe-area-pb">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
          {/* Vote buttons */}
          <VoteButtons
            verifyCount={report.verifyCount}
            disputeCount={report.disputeCount}
            userVote={report.userVote}
            onVerify={() => onVerify?.()}
            onDispute={() => onDispute?.()}
          />

          {/* Navigate button */}
          <button
            onClick={() => onNavigate?.()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Navigate to Location
          </button>
        </div>
      </footer>
    </div>
  )
}
