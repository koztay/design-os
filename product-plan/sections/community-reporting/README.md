# Community Reporting

## Overview

Form-based reporting system enabling users to submit obstacles and accessibility improvements with photos, GPS-based location, and offline submission capability. Reports are stored locally when offline and sync when connectivity is restored. Community members can vote on reports to verify their accuracy and current status.

## User Flows

- User taps "Report" button → form opens with current GPS location pre-filled → user selects report type (obstacle/improvement)
- User fills report form → adds description → optionally attaches photo from camera/gallery → submits report
- User submits report while offline → report saved locally with pending status → auto-syncs when online
- User views existing report → sees details, photo, location on mini-map → can vote to verify or dispute
- User browses recent reports → filters by type/status → taps to view details or navigate to location
- User's report receives enough verifications → status changes to "verified" with visual indicator

## Design Decisions

- Multi-step form reduces cognitive load (Type → Details → Photo → Location → Review)
- Large icon buttons for report type selection (accessibility-friendly)
- Photo upload supports both camera and gallery
- Mini-map in location picker shows exact position with draggable pin
- Offline indicator banner clearly shows pending sync status
- Vote buttons show current counts and user's own vote state

## Data Used

**Entities:**
- `Report` — Full report with type, status, location, photo, votes
- `PendingReport` — Offline-queued report with sync status
- `ReportType` — 'obstacle' | 'improvement' | 'fixed-issue'
- `ReportStatus` — 'pending' | 'active' | 'verified' | 'resolved' | 'disputed'
- `VoteType` — 'verify' | 'dispute'

**From global model:**
- Location coordinates for report placement
- User information for authorship

## Visual Reference

See `screenshot.png` files for the target UI designs:
- `reports-list.png` — Reports list view
- `report-form.png` — Report creation form
- `report-detail.png` — Full report detail view

## Components Provided

- `ReportForm` — Multi-step form for creating reports
- `ReportTypeSelector` — Type selection with icons
- `PhotoUpload` — Camera/gallery photo handling
- `LocationPicker` — GPS location with map preview
- `ReportsList` — Filterable list of reports
- `ReportCard` — Individual report preview card
- `ReportDetail` — Full report view with voting
- `VoteButtons` — Verify/dispute voting controls
- `PendingReportCard` — Queued offline reports
- `OfflineBanner` — Offline status indicator

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSubmitReport` | Called when user submits new report |
| `onViewReport` | Called when user views report details |
| `onNavigateToReport` | Called to navigate to report location |
| `onVerifyReport` | Called when user votes to verify |
| `onDisputeReport` | Called when user votes to dispute |
| `onEditReport` | Called when user edits their report |
| `onDeleteReport` | Called when user deletes their report |
| `onSyncPendingReports` | Manual sync trigger for offline reports |
| `onRetrySync` | Retry failed sync |
| `onRequestLocation` | Get current GPS position |
| `onCapturePhoto` | Take photo with camera |
| `onSelectPhoto` | Pick photo from gallery |
| `onFilterByType` | Filter reports by type |
| `onFilterByStatus` | Filter reports by status |
