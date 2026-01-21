import { useState } from 'react'
import type { ApiKey, ApiPermission } from '../types'

interface ApiKeysPanelProps {
  apiKeys: ApiKey[]
  onCreateApiKey?: (name: string, permissions: ApiPermission[]) => void
  onRevokeApiKey?: (id: string) => void
  onRegenerateApiKey?: (id: string) => void
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ApiKeysPanel({
  apiKeys,
  onCreateApiKey,
  onRevokeApiKey,
  onRegenerateApiKey,
}: ApiKeysPanelProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState<ApiPermission[]>(['read'])
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  const handleCreate = () => {
    if (newKeyName.trim()) {
      onCreateApiKey?.(newKeyName.trim(), newKeyPermissions)
      setNewKeyName('')
      setNewKeyPermissions(['read'])
      setIsCreating(false)
    }
  }

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  const togglePermission = (perm: ApiPermission) => {
    if (newKeyPermissions.includes(perm)) {
      if (newKeyPermissions.length > 1) {
        setNewKeyPermissions(newKeyPermissions.filter((p) => p !== perm))
      }
    } else {
      setNewKeyPermissions([...newKeyPermissions, perm])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">API Keys</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage API access credentials for external integrations
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Key
          </button>
        )}
      </div>

      {/* Create Key Form */}
      {isCreating && (
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Name</label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g., Mobile App, Partner Integration"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Permissions</label>
            <div className="flex gap-3">
              <button
                onClick={() => togglePermission('read')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  newKeyPermissions.includes('read')
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                }`}
              >
                Read
              </button>
              <button
                onClick={() => togglePermission('write')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  newKeyPermissions.includes('write')
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                }`}
              >
                Write
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newKeyName.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white transition-colors"
            >
              Create API Key
            </button>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{apiKey.name}</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      apiKey.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {apiKey.status}
                  </span>
                </div>

                {/* Key Value */}
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-900 text-sm font-mono text-slate-600 dark:text-slate-400 truncate">
                    {apiKey.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedKeyId === apiKey.id ? (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Permissions */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Permissions:</span>
                  {apiKey.permissions.map((perm) => (
                    <span
                      key={perm}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        perm === 'write'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {perm}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{formatNumber(apiKey.requestCount)}</span> requests
                  </span>
                  <span>Last used: {formatDate(apiKey.lastUsed)}</span>
                  <span>Created: {formatDate(apiKey.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onRegenerateApiKey?.(apiKey.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                  title="Regenerate key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => onRevokeApiKey?.(apiKey.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                  title="Revoke key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {apiKeys.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No API keys yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Create your first API key to enable external integrations</p>
          </div>
        )}
      </div>

      {/* API Documentation */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">API Endpoints</h4>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs">GET</span>
            <code className="text-slate-600 dark:text-slate-400">/api/v1/features</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs">GET</span>
            <code className="text-slate-600 dark:text-slate-400">/api/v1/obstacles</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs">POST</span>
            <code className="text-slate-600 dark:text-slate-400">/api/v1/reports</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs">GET</span>
            <code className="text-slate-600 dark:text-slate-400">/api/v1/export</code>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          Include your API key in the <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700">Authorization</code> header.
        </p>
      </div>
    </div>
  )
}
