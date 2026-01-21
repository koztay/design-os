import { useState } from 'react'
import type { AccessibilityItem, ItemStatus, Severity } from '../types'

interface DataTableProps {
  items: AccessibilityItem[]
  selectedIds: string[]
  onSelectionChange?: (ids: string[]) => void
  onViewItem?: (id: string) => void
  onEditItem?: (id: string) => void
  onDeleteItem?: (id: string) => void
  sortColumn: string
  sortDirection: 'asc' | 'desc'
  onSort?: (column: string) => void
}

const statusColors: Record<ItemStatus, { bg: string; text: string; dot: string }> = {
  active: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  reported: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
  pending: { bg: 'bg-slate-500/10 dark:bg-slate-500/20', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-400' },
  verified: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  resolved: { bg: 'bg-slate-500/10 dark:bg-slate-500/20', text: 'text-slate-500 dark:text-slate-500', dot: 'bg-slate-400' },
}

const severityColors: Record<Severity, string> = {
  low: 'text-slate-500 dark:text-slate-400',
  medium: 'text-amber-600 dark:text-amber-400',
  high: 'text-red-600 dark:text-red-400',
}

const typeIcons: Record<string, string> = {
  ramp: '♿',
  crossing: '🚶',
  sidewalk: '🛤️',
  elevator: '🛗',
  construction: '🚧',
  damaged: '⚠️',
  stairs: '🪜',
  temporary: '⏱️',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function DataTable({
  items,
  selectedIds,
  onSelectionChange,
  onViewItem,
  onEditItem,
  onDeleteItem,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps) {
  const allSelected = items.length > 0 && selectedIds.length === items.length
  const someSelected = selectedIds.length > 0 && selectedIds.length < items.length

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(items.map((item) => item.id))
    }
  }

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange?.([...selectedIds, id])
    }
  }

  const SortHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <button
      onClick={() => onSort?.(column)}
      className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
    >
      {children}
      <span className={`transition-opacity ${sortColumn === column ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
        {sortColumn === column && sortDirection === 'desc' ? '↓' : '↑'}
      </span>
    </button>
  )

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 dark:bg-slate-700"
                />
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                <SortHeader column="type">Type</SortHeader>
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                <SortHeader column="name">Name</SortHeader>
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300 hidden lg:table-cell">
                <SortHeader column="location">Location</SortHeader>
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                <SortHeader column="status">Status</SortHeader>
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300 hidden md:table-cell">
                <SortHeader column="verificationCount">Verifications</SortHeader>
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300 hidden xl:table-cell">
                <SortHeader column="lastUpdated">Updated</SortHeader>
              </th>
              <th className="w-24 p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {items.map((item) => (
              <tr
                key={item.id}
                className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30 ${
                  selectedIds.includes(item.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 dark:bg-slate-700"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" title={item.type}>
                      {typeIcons[item.type] || '📍'}
                    </span>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          item.category === 'feature'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {item.category}
                      </span>
                      {item.severity && (
                        <span className={`block text-xs mt-0.5 ${severityColors[item.severity]}`}>
                          {item.severity} severity
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onViewItem?.(item.id)}
                    className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <p className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{item.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1 lg:hidden">{item.location.address}</p>
                  </button>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-1">{item.location.address}</p>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status].bg} ${statusColors[item.status].text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColors[item.status].dot}`}></span>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item.verificationCount}</span>
                  </div>
                </td>
                <td className="p-4 hidden xl:table-cell">
                  <span className="text-slate-500 dark:text-slate-400">{formatDate(item.lastUpdated)}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => onEditItem?.(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteItem?.(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">No items found</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
