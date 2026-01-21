# Milestone 4: Accessibility Data Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-3 complete

## Goal

Implement the Accessibility Data Management feature — an admin-focused interface for maintaining the accessibility database with table views, bulk operations, and import/export capabilities.

## Overview

This section provides administrators with tools to manage the accessibility database at scale. It includes a spreadsheet-like table view of all features and obstacles, with sorting, filtering, and bulk editing. Admins can import data from GeoJSON or CSV files and export filtered datasets. API key management enables external integrations.

**Key Functionality:**
- Data table with sortable columns (type, status, location, date, verifications)
- Advanced search and filtering (type, status, date range, area)
- Checkbox selection for bulk actions
- Bulk operations (delete, status change, field updates)
- Import from GeoJSON/CSV with preview
- Export to GeoJSON/CSV with filter scope
- API key management for external access
- Row count and pagination

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/accessibility-data-management/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/accessibility-data-management/components/`:

- `AccessibilityDataManagement.tsx` — Main container component
- `DataTable.tsx` — Sortable, selectable data table
- `FilterPanel.tsx` — Advanced filter controls
- `BulkActionsBar.tsx` — Actions for selected items
- `ImportModal.tsx` — File upload with preview
- `ApiKeysPanel.tsx` — API key management

### Data Layer

The components expect these data shapes (see `types.ts`):

- `AccessibilityItem` — Unified type for features and obstacles
- `ItemCategory` — 'feature' | 'obstacle'
- `ItemStatus` — 'active' | 'reported' | 'pending' | 'verified' | 'resolved'
- `ApiKey` — API key with permissions and usage stats
- `ImportPreview` — Preview of pending import with summary
- `ActiveFilters` — Current filter state

You'll need to:
- Create admin API endpoints with pagination
- Implement bulk update/delete operations
- Parse GeoJSON and CSV files for import
- Generate export files in both formats
- Manage API keys with proper security

### Callbacks

Wire up these user actions:

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

### Empty States

Implement empty state UI for when no records exist yet:

- **No data:** "No accessibility data yet. Import your first dataset or wait for community reports." with import CTA
- **No filtered results:** "No items match your filters" with clear filters option
- **No API keys:** "No API keys created yet. Create one to enable external integrations."
- **No selection:** Bulk actions bar hidden or disabled when nothing selected

## Files to Reference

- `product-plan/sections/accessibility-data-management/README.md` — Feature overview and design intent
- `product-plan/sections/accessibility-data-management/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/accessibility-data-management/components/` — React components
- `product-plan/sections/accessibility-data-management/types.ts` — TypeScript interfaces
- `product-plan/sections/accessibility-data-management/sample-data.json` — Test data
- `product-plan/sections/accessibility-data-management/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: View and Filter Data

1. Admin navigates to Data section
2. Table displays all accessibility items with pagination
3. Admin clicks "Type" column header to sort
4. Admin opens filter panel and selects "Obstacles only"
5. Admin enters date range filter
6. Table updates to show matching records
7. **Outcome:** Admin sees filtered, sorted subset of data

### Flow 2: Bulk Edit Items

1. Admin checks multiple rows in the table
2. Bulk actions bar appears with selection count
3. Admin clicks "Change Status" dropdown
4. Admin selects "Verified" status
5. Admin confirms the bulk action
6. **Outcome:** All selected items updated to "Verified" status

### Flow 3: Import GeoJSON Data

1. Admin clicks "Import" button
2. Modal opens with file upload zone
3. Admin uploads a GeoJSON file
4. Preview shows: X records to add, Y to update, Z to skip
5. Admin reviews preview table
6. Admin clicks "Confirm Import"
7. **Outcome:** Records are added/updated, success message shows counts

### Flow 4: Export Filtered Data

1. Admin applies filters to show specific subset
2. Admin clicks "Export" dropdown
3. Admin selects "GeoJSON" format
4. Admin chooses "Export filtered only"
5. File downloads with filtered data
6. **Outcome:** GeoJSON file contains only the filtered records

### Flow 5: Manage API Keys

1. Admin clicks "API" tab
2. Admin clicks "Create New Key"
3. Admin enters key name and selects permissions (read/write)
4. New key is generated and displayed
5. Admin copies key (one-time view)
6. **Outcome:** API key is active and can be used for integrations

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Data table renders with all columns
- [ ] Sorting works on all sortable columns
- [ ] Filter panel filters by type, status, date, area
- [ ] Search finds items by name/description
- [ ] Row selection works with checkbox
- [ ] Bulk delete removes selected items
- [ ] Bulk status change updates selected items
- [ ] Import parses GeoJSON and CSV files
- [ ] Import preview shows accurate counts
- [ ] Import commits changes to database
- [ ] Export generates valid GeoJSON/CSV
- [ ] Export respects current filters
- [ ] API keys can be created with permissions
- [ ] API keys can be revoked
- [ ] Pagination works correctly
- [ ] Empty states display appropriately
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile (may use card view instead of table)
