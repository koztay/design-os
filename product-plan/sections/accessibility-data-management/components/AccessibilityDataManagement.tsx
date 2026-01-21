import { useState, useMemo } from 'react'
import type {
  AccessibilityDataManagementProps,
  AccessibilityItem,
  ActiveFilters,
  ItemStatus,
} from '../types'
import { DataTable } from './DataTable'
import { FilterPanel } from './FilterPanel'
import { BulkActionsBar } from './BulkActionsBar'
import { ImportModal } from './ImportModal'
import { ApiKeysPanel } from './ApiKeysPanel'

type TabType = 'data' | 'api'

export function AccessibilityDataManagement({
  accessibilityItems,
  filterOptions,
  apiKeys,
  importPreview,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onSelectionChange,
  onBulkDelete,
  onBulkStatusChange,
  onBulkUpdate,
  onImportFile,
  onConfirmImport,
  onCancelImport,
  onExport,
  onCreateApiKey,
  onRevokeApiKey,
  onRegenerateApiKey,
  onFilterChange,
}: AccessibilityDataManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('data')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})
  const [sortColumn, setSortColumn] = useState('lastUpdated')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Filter items
  const filteredItems = useMemo(() => {
    let items = [...accessibilityItems]

    // Search filter
    if (activeFilters.search) {
      const search = activeFilters.search.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.location.address.toLowerCase().includes(search)
      )
    }

    // Category filter
    if (activeFilters.category) {
      items = items.filter((item) => item.category === activeFilters.category)
    }

    // Type filter
    if (activeFilters.types && activeFilters.types.length > 0) {
      items = items.filter((item) => activeFilters.types!.includes(item.type))
    }

    // Status filter
    if (activeFilters.statuses && activeFilters.statuses.length > 0) {
      items = items.filter((item) => activeFilters.statuses!.includes(item.status))
    }

    // Severity filter
    if (activeFilters.severities && activeFilters.severities.length > 0) {
      items = items.filter((item) => item.severity && activeFilters.severities!.includes(item.severity))
    }

    // Sort
    items.sort((a, b) => {
      let comparison = 0
      switch (sortColumn) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
        case 'location':
          comparison = a.location.address.localeCompare(b.location.address)
          break
        case 'verificationCount':
          comparison = a.verificationCount - b.verificationCount
          break
        case 'lastUpdated':
        default:
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return items
  }, [accessibilityItems, activeFilters, sortColumn, sortDirection])

  const handleFilterChange = (filters: ActiveFilters) => {
    setActiveFilters(filters)
    onFilterChange?.(filters)
    setSelectedIds([]) // Clear selection when filters change
  }

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids)
    onSelectionChange?.(ids)
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleBulkDelete = () => {
    onBulkDelete?.(selectedIds)
    setSelectedIds([])
  }

  const handleBulkStatusChange = (status: ItemStatus) => {
    onBulkStatusChange?.(selectedIds, status)
    setSelectedIds([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Accessibility Data
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage obstacles and accessibility features across the city
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {accessibilityItems.filter((i) => i.category === 'feature').length} Features
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium text-red-700 dark:text-red-400">
                  {accessibilityItems.filter((i) => i.category === 'obstacle').length} Obstacles
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 w-fit">
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'data'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Data Management
              </span>
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'api'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                API Access
              </span>
            </button>
          </div>
        </div>

        {/* Data Tab */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <FilterPanel
                  filterOptions={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  totalCount={accessibilityItems.length}
                  filteredCount={filteredItems.length}
                />
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                {/* Import Button */}
                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="hidden sm:inline">Import</span>
                </button>

                {/* Export Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">Export</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showExportMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)} />
                      <div className="absolute right-0 top-full mt-2 z-20 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 min-w-[160px]">
                        <button
                          onClick={() => {
                            onExport?.('geojson', activeFilters)
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          Export as GeoJSON
                        </button>
                        <button
                          onClick={() => {
                            onExport?.('csv', activeFilters)
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          Export as CSV
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              items={filteredItems}
              selectedIds={selectedIds}
              onSelectionChange={handleSelectionChange}
              onViewItem={onViewItem}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            {/* Pagination placeholder */}
            {filteredItems.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Page 1 of 1
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Bulk Actions Bar */}
            <BulkActionsBar
              selectedCount={selectedIds.length}
              onBulkDelete={handleBulkDelete}
              onBulkStatusChange={handleBulkStatusChange}
              onClearSelection={() => setSelectedIds([])}
            />
          </div>
        )}

        {/* API Tab */}
        {activeTab === 'api' && (
          <ApiKeysPanel
            apiKeys={apiKeys}
            onCreateApiKey={onCreateApiKey}
            onRevokeApiKey={onRevokeApiKey}
            onRegenerateApiKey={onRegenerateApiKey}
          />
        )}

        {/* Import Modal */}
        <ImportModal
          isOpen={isImportModalOpen}
          importPreview={importPreview}
          onClose={() => setIsImportModalOpen(false)}
          onImportFile={onImportFile}
          onConfirmImport={() => {
            onConfirmImport?.()
            setIsImportModalOpen(false)
          }}
          onCancelImport={() => {
            onCancelImport?.()
            setIsImportModalOpen(false)
          }}
        />
      </div>
    </div>
  )
}
