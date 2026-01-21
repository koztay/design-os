import { useState, useRef } from 'react'
import type { ImportPreview } from '../types'

interface ImportModalProps {
  isOpen: boolean
  importPreview: ImportPreview | null
  onClose?: () => void
  onImportFile?: (file: File) => void
  onConfirmImport?: () => void
  onCancelImport?: () => void
}

export function ImportModal({
  isOpen,
  importPreview,
  onClose,
  onImportFile,
  onConfirmImport,
  onCancelImport,
}: ImportModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.geojson') || file.name.endsWith('.json') || file.name.endsWith('.csv'))) {
      onImportFile?.(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportFile?.(file)
    }
  }

  const actionColors = {
    add: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    update: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    skip: 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800',
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Import Data</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Upload a GeoJSON or CSV file to import accessibility data
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!importPreview ? (
              /* Upload Zone */
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".geojson,.json,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  Drop your file here, or <span className="text-blue-600 dark:text-blue-400">browse</span>
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Supports GeoJSON and CSV formats</p>
              </div>
            ) : (
              /* Import Preview */
              <div className="space-y-4">
                {/* File Info */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{importPreview.filename}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {importPreview.format.toUpperCase()} • {importPreview.summary.totalRecords} records
                    </p>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-center">
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{importPreview.summary.toAdd}</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">To Add</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{importPreview.summary.toUpdate}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">To Update</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-center">
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">{importPreview.summary.toSkip}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">To Skip</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{importPreview.summary.errors}</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Errors</p>
                  </div>
                </div>

                {/* Preview List */}
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview</p>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-200 dark:divide-slate-700 max-h-48 overflow-y-auto">
                    {importPreview.preview.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${actionColors[item.action]}`}>
                          {item.action}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                          {item.location && <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.location}</p>}
                          {item.changes && (
                            <p className="text-xs text-blue-600 dark:text-blue-400">{item.changes.join(', ')}</p>
                          )}
                          {item.reason && <p className="text-xs text-slate-400">{item.reason}</p>}
                        </div>
                        <span className="text-xs text-slate-400 capitalize">{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
            {importPreview ? (
              <>
                <button
                  onClick={onCancelImport}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmImport}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Import {importPreview.summary.toAdd + importPreview.summary.toUpdate} items
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
