import type { Route } from '../types'

interface NavigationSheetProps {
  route: Route
  height: 'collapsed' | 'expanded'
  onHeightChange?: (height: 'collapsed' | 'expanded') => void
  onClearRoute?: () => void
}

export function NavigationSheet({
  route,
  height,
  onHeightChange,
  onClearRoute
}: NavigationSheetProps) {
  const isExpanded = height === 'expanded'

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30'
      case 'moderate':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
      case 'challenging':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default:
        return 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700'
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'turn-left':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        )
      case 'turn-right':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )
      case 'feature':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'arrival':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 transform rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out dark:border-slate-700 dark:bg-slate-800 ${
        isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-180px)]'
      }`}
      style={{ maxHeight: '85vh' }}
    >
      {/* Drag Handle */}
      <button
        onClick={() => onHeightChange?.(isExpanded ? 'collapsed' : 'expanded')}
        className="w-full cursor-pointer border-b border-slate-200 px-4 pb-4 pt-3 dark:border-slate-700"
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {route.end.name}
              </h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getDifficultyColor(route.difficulty)}`}>
                {route.difficulty}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {route.distance}m
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {route.estimatedTime} min
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {route.accessibilityScore}% accessible
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClearRoute?.()
            }}
            className="ml-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            aria-label="Clear route"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </button>

      {/* Navigation Steps */}
      <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: 'calc(85vh - 140px)' }}>
        {isExpanded ? (
          <div className="space-y-3 pt-4">
            {route.steps.map((step, index) => {
              const isWarning = step.type === 'warning'
              const isFeature = step.type === 'feature'
              const isArrival = step.type === 'arrival'

              return (
                <div
                  key={step.id}
                  className={`flex gap-3 rounded-xl p-3 transition-colors ${
                    isWarning
                      ? 'bg-orange-50 dark:bg-orange-900/10'
                      : isFeature
                      ? 'bg-emerald-50 dark:bg-emerald-900/10'
                      : isArrival
                      ? 'bg-blue-50 dark:bg-blue-900/10'
                      : 'bg-slate-50 dark:bg-slate-700/30'
                  }`}
                >
                  {/* Step Number or Icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold ${
                      isWarning
                        ? 'bg-orange-200 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400'
                        : isFeature
                        ? 'bg-emerald-200 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
                        : isArrival
                        ? 'bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isWarning || isFeature || isArrival ? (
                      getStepIcon(step.type)
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {step.instruction}
                    </p>
                    {step.distance > 0 && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        {step.distance}m · {step.duration} min
                      </p>
                    )}
                  </div>

                  {/* Direction Icon */}
                  <div className="flex shrink-0 items-center text-slate-400 dark:text-slate-500">
                    {getStepIcon(step.type)}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-2 pt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Next: {route.steps[0]?.instruction}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Tap to expand for full directions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
