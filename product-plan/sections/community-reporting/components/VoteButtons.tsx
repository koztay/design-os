import type { VoteButtonsProps } from '../types'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)

export function VoteButtons({ verifyCount, disputeCount, userVote, onVerify, onDispute }: VoteButtonsProps) {
  return (
    <div className="flex gap-3">
      {/* Verify button */}
      <button
        onClick={() => onVerify?.()}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
          transition-all duration-200
          ${userVote === 'verify'
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'}
        `}
      >
        <svg
          className="w-5 h-5"
          fill={userVote === 'verify' ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Verify</span>
        <span className={`
          px-2 py-0.5 text-sm rounded-full
          ${userVote === 'verify'
            ? 'bg-emerald-500/30 text-white'
            : 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400'}
        `}>
          {verifyCount}
        </span>
      </button>

      {/* Dispute button */}
      <button
        onClick={() => onDispute?.()}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
          transition-all duration-200
          ${userVote === 'dispute'
            ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50'}
        `}
      >
        <svg
          className="w-5 h-5"
          fill={userVote === 'dispute' ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Dispute</span>
        <span className={`
          px-2 py-0.5 text-sm rounded-full
          ${userVote === 'dispute'
            ? 'bg-red-500/30 text-white'
            : 'bg-red-100 dark:bg-red-800/50 text-red-600 dark:text-red-400'}
        `}>
          {disputeCount}
        </span>
      </button>
    </div>
  )
}
