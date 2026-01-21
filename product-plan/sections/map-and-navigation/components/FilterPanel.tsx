import type { MapFilter } from '../types'

interface FilterPanelProps {
  filters: MapFilter[]
  onToggleFilter?: (filterId: string) => void
  onClose?: () => void
}

export function FilterPanel({ filters, onToggleFilter, onClose }: FilterPanelProps) {
  const featureFilters = filters.filter(f => f.category === 'accessibilityFeatures')
  const obstacleFilters = filters.filter(f => f.category === 'obstacles')

  const getColorClasses = (color: string, enabled: boolean) => {
    const baseClasses = 'h-3 w-3 rounded-full'
    if (!enabled) return `${baseClasses} bg-slate-300 dark:bg-slate-600`

    switch (color) {
      case 'green':
        return `${baseClasses} bg-emerald-500 dark:bg-emerald-400`
      case 'red':
        return `${baseClasses} bg-red-500 dark:bg-red-400`
      case 'orange':
        return `${baseClasses} bg-orange-500 dark:bg-orange-400`
      case 'yellow':
        return `${baseClasses} bg-yellow-500 dark:bg-yellow-400`
      default:
        return `${baseClasses} bg-slate-500 dark:bg-slate-400`
    }
  }

  return (
    <div className="w-72 rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:w-80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white">Map Filters</h3>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          aria-label="Close filters"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Filter Groups */}
      <div className="max-h-96 overflow-y-auto p-4">
        {/* Accessibility Features */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Accessible Features
          </h4>
          <div className="space-y-2">
            {featureFilters.map((filter) => (
              <label
                key={filter.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <input
                  type="checkbox"
                  checked={filter.enabled}
                  onChange={() => onToggleFilter?.(filter.id)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-emerald-400 dark:focus:ring-emerald-400/20"
                />
                <div className={getColorClasses(filter.color, filter.enabled)}></div>
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                  {filter.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Obstacles */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Obstacles
          </h4>
          <div className="space-y-2">
            {obstacleFilters.map((filter) => (
              <label
                key={filter.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <input
                  type="checkbox"
                  checked={filter.enabled}
                  onChange={() => onToggleFilter?.(filter.id)}
                  className="h-4 w-4 rounded border-slate-300 text-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-red-400 dark:focus:ring-red-400/20"
                />
                <div className={getColorClasses(filter.color, filter.enabled)}></div>
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                  {filter.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
