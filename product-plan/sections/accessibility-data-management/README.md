# Accessibility Data Management

## Overview

Admin-focused data management interface for maintaining the accessibility database. Provides a spreadsheet-like table view with sorting, filtering, and bulk editing capabilities. Supports import/export via GeoJSON and CSV formats, plus API access for external integrations.

## User Flows

- Admin views all obstacles and accessibility features in a filterable, sortable table
- Admin searches and filters data by type, status, location, date range
- Admin selects multiple items and performs bulk actions (delete, status change, field updates)
- Admin imports GeoJSON or CSV file to add/update accessibility data
- Admin exports filtered data as GeoJSON or CSV
- Admin edits individual item details in a modal or side panel
- Admin views API documentation and manages API access credentials

## Design Decisions

- Table view for efficient data scanning (desktop-optimized)
- Checkbox selection for bulk operations
- Filter panel with multiple criteria
- Import preview shows changes before committing
- Export respects current filter state
- API keys panel with usage statistics

## Data Used

**Entities:**
- `AccessibilityItem` — Unified type for features and obstacles
- `ItemCategory` — 'feature' | 'obstacle'
- `ItemStatus` — 'active' | 'reported' | 'pending' | 'verified' | 'resolved'
- `ApiKey` — API key with permissions and usage stats
- `ImportPreview` — Preview of pending import
- `ActiveFilters` — Current filter state

**From global model:**
- All AccessibilityFeature and Obstacle entities
- Location data for each item

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `AccessibilityDataManagement` — Main container component
- `DataTable` — Sortable, selectable data table
- `FilterPanel` — Advanced filter controls
- `BulkActionsBar` — Actions for selected items
- `ImportModal` — File upload with preview
- `ApiKeysPanel` — API key management

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewItem` | View item details |
| `onEditItem` | Edit individual item |
| `onDeleteItem` | Delete individual item |
| `onSelectionChange` | Track selected items |
| `onBulkDelete` | Delete multiple items |
| `onBulkStatusChange` | Change status of multiple items |
| `onBulkUpdate` | Update fields on multiple items |
| `onImportFile` | Upload file for import |
| `onConfirmImport` | Confirm import after preview |
| `onCancelImport` | Cancel pending import |
| `onExport` | Export data as GeoJSON/CSV |
| `onCreateApiKey` | Create new API key |
| `onRevokeApiKey` | Revoke API key |
| `onRegenerateApiKey` | Regenerate API key |
| `onFilterChange` | Update filter criteria |
