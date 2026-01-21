import type { ReportTypeSelectorProps, ReportType } from '../types'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)

const typeStyles: Record<ReportType, { bg: string; bgSelected: string; border: string; icon: JSX.Element }> = {
  obstacle: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    bgSelected: 'bg-amber-100 dark:bg-amber-900/40',
    border: 'border-amber-300 dark:border-amber-700',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  improvement: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    bgSelected: 'bg-emerald-100 dark:bg-emerald-900/40',
    border: 'border-emerald-300 dark:border-emerald-700',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  'fixed-issue': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    bgSelected: 'bg-blue-100 dark:bg-blue-900/40',
    border: 'border-blue-300 dark:border-blue-700',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
}

export function ReportTypeSelector({ types, selectedType, onSelect }: ReportTypeSelectorProps) {
  return (
    <div className="space-y-3">
      {types.map((type) => {
        const style = typeStyles[type.id]
        const isSelected = selectedType === type.id

        return (
          <button
            key={type.id}
            onClick={() => onSelect?.(type.id)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left
              transition-all duration-200
              ${isSelected ? style.bgSelected : style.bg}
              ${isSelected ? style.border : 'border-transparent'}
              ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900' : ''}
              hover:scale-[1.02] active:scale-[0.98]
            `}
          >
            <div className={`
              shrink-0 p-3 rounded-xl
              ${isSelected ? 'bg-white dark:bg-slate-800' : 'bg-white/50 dark:bg-slate-800/50'}
            `}>
              <span className={`
                ${type.id === 'obstacle' ? 'text-amber-600 dark:text-amber-400' : ''}
                ${type.id === 'improvement' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${type.id === 'fixed-issue' ? 'text-blue-600 dark:text-blue-400' : ''}
              `}>
                {style.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {type.label}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                {type.description}
              </p>
            </div>
            {isSelected && (
              <div className="shrink-0">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
