// =============================================================================
// Data Types
// =============================================================================

/**
 * Geographic coordinates with optional address information
 */
export interface Location {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
}

/**
 * The type of report being submitted
 */
export type ReportType = 'obstacle' | 'improvement' | 'fixed-issue'

/**
 * Current status of a report in the verification workflow
 */
export type ReportStatus = 'pending' | 'active' | 'verified' | 'resolved' | 'disputed'

/**
 * User's vote on a report
 */
export type VoteType = 'verify' | 'dispute'

/**
 * Sync status for offline-submitted reports
 */
export type SyncStatus = 'pending-sync' | 'synced' | 'failed'

/**
 * A community-submitted report about an accessibility obstacle or improvement
 */
export interface Report {
  id: string
  type: ReportType
  status: ReportStatus
  title: string
  description: string
  location: Location
  photoUrl: string | null
  createdAt: string
  updatedAt: string
  authorName: string
  verifyCount: number
  disputeCount: number
  /** The current user's vote on this report, if any */
  userVote: VoteType | null
}

/**
 * A report that was submitted offline and is waiting to sync
 */
export interface PendingReport {
  id: string
  type: ReportType
  title: string
  description: string
  location: Location
  photoUrl: string | null
  createdAt: string
  syncStatus: SyncStatus
  retryCount: number
  errorMessage?: string
}

/**
 * Configuration for a report type option in the form
 */
export interface ReportTypeOption {
  id: ReportType
  label: string
  description: string
  icon: string
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the main Community Reporting view
 */
export interface CommunityReportingProps {
  /** List of community reports to display */
  reports: Report[]
  /** Reports waiting to sync (submitted while offline) */
  pendingReports: PendingReport[]
  /** Available report type options for the form */
  reportTypes: ReportTypeOption[]
  /** User's current GPS location */
  currentLocation: Location | null
  /** Whether the app is currently offline */
  isOffline: boolean

  // --- Navigation callbacks ---
  /** Called when user wants to view a report's full details */
  onViewReport?: (id: string) => void
  /** Called when user wants to navigate to a report's location on the map */
  onNavigateToReport?: (id: string) => void

  // --- Report creation callbacks ---
  /** Called when user opens the report creation form */
  onStartReport?: () => void
  /** Called when user submits a new report */
  onSubmitReport?: (report: NewReportData) => void
  /** Called when user cancels report creation */
  onCancelReport?: () => void

  // --- Report editing callbacks ---
  /** Called when user wants to edit their own report */
  onEditReport?: (id: string) => void
  /** Called when user wants to delete their own report */
  onDeleteReport?: (id: string) => void

  // --- Voting callbacks ---
  /** Called when user votes to verify a report is accurate */
  onVerifyReport?: (id: string) => void
  /** Called when user votes to dispute a report */
  onDisputeReport?: (id: string) => void

  // --- Offline sync callbacks ---
  /** Called when user manually triggers sync for pending reports */
  onSyncPendingReports?: () => void
  /** Called when user wants to retry a failed sync */
  onRetrySync?: (id: string) => void
  /** Called when user deletes a pending report from the queue */
  onDeletePendingReport?: (id: string) => void

  // --- Location callbacks ---
  /** Called when user requests their current GPS location */
  onRequestLocation?: () => void
  /** Called when user manually adjusts the report location */
  onUpdateLocation?: (location: Location) => void

  // --- Photo callbacks ---
  /** Called when user wants to take a photo with camera */
  onCapturePhoto?: () => void
  /** Called when user wants to select photo from gallery */
  onSelectPhoto?: () => void
  /** Called when user removes the attached photo */
  onRemovePhoto?: () => void

  // --- Filter callbacks ---
  /** Called when user changes the report type filter */
  onFilterByType?: (type: ReportType | null) => void
  /** Called when user changes the status filter */
  onFilterByStatus?: (status: ReportStatus | null) => void
}

/**
 * Data for creating a new report
 */
export interface NewReportData {
  type: ReportType
  title: string
  description: string
  location: Location
  photoUrl?: string
}

/**
 * Props for the report card component
 */
export interface ReportCardProps {
  report: Report
  onView?: () => void
  onNavigate?: () => void
  onVerify?: () => void
  onDispute?: () => void
}

/**
 * Props for the pending report card component
 */
export interface PendingReportCardProps {
  report: PendingReport
  onRetry?: () => void
  onDelete?: () => void
}

/**
 * Props for the report form component
 */
export interface ReportFormProps {
  reportTypes: ReportTypeOption[]
  currentLocation: Location | null
  isOffline: boolean
  onSubmit?: (data: NewReportData) => void
  onCancel?: () => void
  onRequestLocation?: () => void
  onCapturePhoto?: () => void
  onSelectPhoto?: () => void
}

/**
 * Props for the report detail view
 */
export interface ReportDetailProps {
  report: Report
  onEdit?: () => void
  onDelete?: () => void
  onVerify?: () => void
  onDispute?: () => void
  onNavigate?: () => void
  onClose?: () => void
}

/**
 * Props for the voting buttons component
 */
export interface VoteButtonsProps {
  verifyCount: number
  disputeCount: number
  userVote: VoteType | null
  onVerify?: () => void
  onDispute?: () => void
}

/**
 * Props for the report type selector component
 */
export interface ReportTypeSelectorProps {
  types: ReportTypeOption[]
  selectedType: ReportType | null
  onSelect?: (type: ReportType) => void
}

/**
 * Props for the location picker component
 */
export interface LocationPickerProps {
  location: Location | null
  onRequestLocation?: () => void
  onUpdateLocation?: (location: Location) => void
}

/**
 * Props for the offline indicator banner
 */
export interface OfflineIndicatorProps {
  isOffline: boolean
  pendingCount: number
  onSyncNow?: () => void
}
