import { useState } from 'react'
import type { FilterOptions, ActiveFilters, ItemCategory, ItemType, ItemStatus, Severity } from '../types'

interface FilterPanelProps {
  filterOptions: FilterOptions
  activeFilters: ActiveFilters
  onFilterChange?: (filters: ActiveFilters) => void
  totalCount: number
  filteredCount: number
}

export function FilterPanel({
  filterOptions,
  activeFilters,
  onFilterChange,
  totalCount,
  filteredCount,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => {
    onFilterChange?.({ ...activeFilters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange?.({})
  }

  const hasActiveFilters = Object.keys(activeFilters).some((key) => {
    const value = activeFilters[key as keyof ActiveFilters]
    if (Array.isArray(value)) return value.length > 0
    return value !== undefined && value !== ''
  })

  const toggleArrayFilter = <T extends string>(key: keyof ActiveFilters, value: T, currentArray?: T[]) => {
    const arr = currentArray || []
    const newArr = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    updateFilter(key, newArr.length > 0 ? newArr : undefined)
  }

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, address, or description..."
            value={activeFilters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value || undefined)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>

        {/* Category Toggle */}
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-1">
          <button
            onClick={() => updateFilter('category', undefined)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !activeFilters.category
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => updateFilter('category', 'feature')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFilters.category === 'feature'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => updateFilter('category', 'obstacle')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFilters.category === 'obstacle'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Obstacles
          </button>
        </div>

        {/* Advanced Filter Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
            isExpanded || hasActiveFilters
              ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
              : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
              {Object.keys(activeFilters).filter((k) => {
                const v = activeFilters[k as keyof ActiveFilters]
                return Array.isArray(v) ? v.length > 0 : v !== undefined
              }).length}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.types.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleArrayFilter('types', type, activeFilters.types)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      activeFilters.types?.includes(type)
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleArrayFilter('statuses', status, activeFilters.statuses)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      activeFilters.statuses?.includes(status)
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Severity</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.severities.map((severity) => (
                  <button
                    key={severity}
                    onClick={() => toggleArrayFilter('severities', severity, activeFilters.severities)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      activeFilters.severities?.includes(severity)
                        ? severity === 'high'
                          ? 'border-red-500 bg-red-500 text-white'
                          : severity === 'medium'
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-slate-500 bg-slate-500 text-white'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    {severity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredCount}</span> of{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{totalCount}</span> items
        </p>
      </div>
    </div>
  )
}
