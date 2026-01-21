// =============================================================================
// Data Types
// =============================================================================

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface FeatureMetadata {
  slope?: number
  width?: number
  surface?: string
  handrails?: boolean
  curbHeight?: number
  tactilePaving?: boolean
  audioSignal?: boolean
  obstructions?: boolean
  operatingHours?: string
  cabinWidth?: number
  cabinDepth?: number
  weightLimit?: number
}

export interface ObstacleMetadata {
  startDate?: string
  expectedEnd?: string
  alternateRoute?: boolean
  damageType?: string
  gapWidth?: number
  stepCount?: number
  alternateEntrance?: string
  frequency?: string
  timeRange?: string
}

export type ItemCategory = 'feature' | 'obstacle'

export type FeatureType = 'ramp' | 'crossing' | 'sidewalk' | 'elevator'

export type ObstacleType = 'construction' | 'damaged' | 'stairs' | 'temporary'

export type ItemType = FeatureType | ObstacleType

export type ItemStatus = 'active' | 'reported' | 'pending' | 'verified' | 'resolved'

export type Severity = 'low' | 'medium' | 'high'

export interface AccessibilityItem {
  id: string
  category: ItemCategory
  type: ItemType
  name: string
  description: string
  location: Location
  status: ItemStatus
  severity?: Severity
  metadata: FeatureMetadata | ObstacleMetadata
  verificationCount: number
  lastUpdated: string
  createdAt: string
  reportedBy: 'system' | 'community'
}

export type ApiPermission = 'read' | 'write'

export type ApiKeyStatus = 'active' | 'revoked' | 'expired'

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: ApiPermission[]
  endpoints: string[]
  createdAt: string
  lastUsed: string | null
  requestCount: number
  status: ApiKeyStatus
}

export type ImportAction = 'add' | 'update' | 'skip'

export interface ImportPreviewItem {
  action: ImportAction
  type: string
  name: string
  location?: string
  changes?: string[]
  reason?: string
}

export interface ImportSummary {
  totalRecords: number
  toAdd: number
  toUpdate: number
  toSkip: number
  errors: number
}

export interface ImportPreview {
  filename: string
  format: 'geojson' | 'csv'
  summary: ImportSummary
  preview: ImportPreviewItem[]
}

export interface FilterOptions {
  types: ItemType[]
  statuses: ItemStatus[]
  severities: Severity[]
  categories: ItemCategory[]
}

export interface ActiveFilters {
  search?: string
  category?: ItemCategory
  types?: ItemType[]
  statuses?: ItemStatus[]
  severities?: Severity[]
  dateRange?: {
    start: string
    end: string
  }
  area?: {
    lat: number
    lng: number
    radius: number
  }
}

// =============================================================================
// Component Props
// =============================================================================

export interface AccessibilityDataManagementProps {
  /** List of all accessibility items (features and obstacles) */
  accessibilityItems: AccessibilityItem[]
  /** Available filter options */
  filterOptions: FilterOptions
  /** List of API keys for external integrations */
  apiKeys: ApiKey[]
  /** Preview data for pending import (null if no import in progress) */
  importPreview: ImportPreview | null

  // Table actions
  /** Called when user wants to view item details */
  onViewItem?: (id: string) => void
  /** Called when user wants to edit an item */
  onEditItem?: (id: string) => void
  /** Called when user wants to delete an item */
  onDeleteItem?: (id: string) => void
  /** Called when user selects/deselects items for bulk actions */
  onSelectionChange?: (selectedIds: string[]) => void

  // Bulk actions
  /** Called when user performs bulk delete on selected items */
  onBulkDelete?: (ids: string[]) => void
  /** Called when user performs bulk status change */
  onBulkStatusChange?: (ids: string[], newStatus: ItemStatus) => void
  /** Called when user performs bulk field update */
  onBulkUpdate?: (ids: string[], updates: Partial<AccessibilityItem>) => void

  // Import/Export actions
  /** Called when user uploads a file for import */
  onImportFile?: (file: File) => void
  /** Called when user confirms import after preview */
  onConfirmImport?: () => void
  /** Called when user cancels import */
  onCancelImport?: () => void
  /** Called when user requests data export */
  onExport?: (format: 'geojson' | 'csv', filters?: ActiveFilters) => void

  // API key management
  /** Called when user creates a new API key */
  onCreateApiKey?: (name: string, permissions: ApiPermission[]) => void
  /** Called when user revokes an API key */
  onRevokeApiKey?: (id: string) => void
  /** Called when user regenerates an API key */
  onRegenerateApiKey?: (id: string) => void

  // Filter actions
  /** Called when filters change */
  onFilterChange?: (filters: ActiveFilters) => void
}
