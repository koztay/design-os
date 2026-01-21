# Test Instructions: Accessibility Data Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the admin data management interface including table display, filtering, sorting, bulk operations, import/export, and API key management.

---

## User Flow Tests

### Flow 1: View and Sort Data Table

**Scenario:** Admin views data and sorts by different columns

#### Success Path

**Setup:**
- 25 accessibility items loaded (mix of features and obstacles)
- Pagination set to 10 items per page

**Steps:**
1. Admin navigates to Data Management section
2. Table displays with default sort (newest first)
3. Admin clicks "Type" column header
4. Admin clicks "Status" column header

**Expected Results:**
- [ ] Table renders with 10 items (first page)
- [ ] Columns visible: Type, Name, Location, Status, Date, Verifications
- [ ] Clicking "Type" sorts A-Z (ascending)
- [ ] Clicking "Type" again sorts Z-A (descending)
- [ ] Sort indicator arrow shows current sort direction
- [ ] Pagination shows "1-10 of 25"
- [ ] Next/Previous page buttons work

---

### Flow 2: Filter Data

**Scenario:** Admin applies multiple filters to find specific records

#### Success Path

**Setup:**
- Data includes mix of types, statuses, and dates

**Steps:**
1. Admin clicks "Filter" button
2. Admin selects "Obstacles" in category filter
3. Admin selects "Active" in status filter
4. Admin sets date range: last 30 days
5. Admin clicks "Apply"

**Expected Results:**
- [ ] Filter panel opens with all filter options
- [ ] Category dropdown shows Feature/Obstacle options
- [ ] Status shows all status options with checkboxes
- [ ] Date range picker allows start/end selection
- [ ] "Apply" calls `onFilterChange` with filter object
- [ ] Table updates to show only matching records
- [ ] Active filter count badge appears on filter button
- [ ] "Clear all" option available to reset filters

---

### Flow 3: Bulk Edit Items

**Scenario:** Admin selects multiple items and changes their status

#### Success Path

**Setup:**
- Table shows 10 items
- Admin needs to verify 5 pending items

**Steps:**
1. Admin checks checkbox on row 1
2. Admin checks checkbox on row 3
3. Admin checks checkbox on row 5, 7, 9
4. Bulk actions bar appears
5. Admin clicks "Change Status" dropdown
6. Admin selects "Verified"
7. Admin clicks "Apply to 5 items"

**Expected Results:**
- [ ] Checkbox in each row responds to clicks
- [ ] "Select all" checkbox in header selects all visible rows
- [ ] Bulk actions bar appears when 1+ items selected
- [ ] Bar shows: "5 items selected"
- [ ] "Change Status" dropdown shows all status options
- [ ] Clicking "Apply" calls `onBulkStatusChange` with IDs and status
- [ ] Confirmation dialog: "Change status of 5 items to Verified?"
- [ ] After confirm, items update in table
- [ ] Selection cleared after action

---

### Flow 4: Import GeoJSON Data

**Scenario:** Admin imports accessibility data from a GeoJSON file

#### Success Path

**Setup:**
- GeoJSON file with 50 features:
  - 30 new items (to add)
  - 15 existing items (to update)
  - 5 invalid items (to skip)

**Steps:**
1. Admin clicks "Import" button
2. Import modal opens
3. Admin drags/drops GeoJSON file (or clicks to browse)
4. File uploads and parses
5. Preview shows summary and sample records
6. Admin reviews and clicks "Confirm Import"

**Expected Results:**
- [ ] Import modal has drag-drop zone
- [ ] "Browse" button opens file picker
- [ ] Accepts .geojson and .json files
- [ ] Progress indicator during parsing
- [ ] Preview shows summary: "50 records: 30 to add, 15 to update, 5 to skip"
- [ ] Preview table shows first 10 records with action (Add/Update/Skip)
- [ ] Skipped items show reason (e.g., "Missing coordinates")
- [ ] "Confirm Import" calls `onConfirmImport`
- [ ] Success message: "Imported 45 records (30 added, 15 updated)"
- [ ] Table refreshes with new data

#### Failure Path: Invalid File

**Setup:**
- User uploads invalid/corrupt file

**Steps:**
1. Admin uploads non-GeoJSON file (e.g., .txt)

**Expected Results:**
- [ ] Error message: "Invalid file format. Please upload GeoJSON or CSV."
- [ ] Modal remains open for retry
- [ ] No data changed

---

### Flow 5: Export Data

**Scenario:** Admin exports filtered data as CSV

#### Success Path

**Setup:**
- Filter applied: only "obstacles" showing
- 15 obstacles match filter

**Steps:**
1. Admin clicks "Export" dropdown
2. Admin selects "Export as CSV"
3. Admin confirms export scope

**Expected Results:**
- [ ] Export dropdown shows: "Export as GeoJSON", "Export as CSV"
- [ ] Scope options: "Export all (100 items)" / "Export filtered (15 items)"
- [ ] Selecting "Export filtered as CSV" triggers download
- [ ] Downloaded file contains 15 records
- [ ] CSV has proper headers and formatting

---

### Flow 6: Manage API Keys

**Scenario:** Admin creates and manages API keys for integrations

#### Success Path - Create Key

**Setup:**
- No existing API keys

**Steps:**
1. Admin clicks "API" tab
2. Admin clicks "Create New Key"
3. Admin enters name: "Mobile App"
4. Admin selects permissions: Read, Write
5. Admin clicks "Create"

**Expected Results:**
- [ ] API panel shows empty state: "No API keys yet"
- [ ] Create form has name input
- [ ] Permission checkboxes: Read, Write
- [ ] `onCreateApiKey` called with name and permissions
- [ ] New key displayed (shown once for copying)
- [ ] Warning: "Copy this key now. It won't be shown again."
- [ ] Key appears in list with name, permissions, created date

#### Revoke Key

**Setup:**
- API key exists: "Mobile App"

**Steps:**
1. Admin clicks revoke button on key row
2. Confirmation dialog appears
3. Admin confirms

**Expected Results:**
- [ ] Confirmation: "Revoke API key 'Mobile App'? This cannot be undone."
- [ ] `onRevokeApiKey` called with key ID
- [ ] Key shows "Revoked" status (grayed out)
- [ ] Key no longer functional for API calls

---

## Empty State Tests

### No Data Yet

**Setup:**
- `accessibilityItems = []`

**Expected Results:**
- [ ] Table shows empty state
- [ ] Message: "No accessibility data yet"
- [ ] Sub-message: "Import your first dataset or wait for community reports"
- [ ] "Import Data" CTA button visible
- [ ] Clicking CTA opens import modal

### No Filtered Results

**Setup:**
- Data exists but filter matches nothing

**Expected Results:**
- [ ] Table shows: "No items match your filters"
- [ ] "Clear filters" link visible
- [ ] Filters still displayed (user can adjust)

### No API Keys

**Setup:**
- `apiKeys = []`

**Expected Results:**
- [ ] API panel shows: "No API keys created yet"
- [ ] "Create one to enable external integrations"
- [ ] "Create API Key" button prominent

---

## Component Interaction Tests

### DataTable

**Renders correctly:**
- [ ] Header row with column names
- [ ] Checkbox column for selection
- [ ] Data rows with all fields
- [ ] Pagination controls at bottom

**User interactions:**
- [ ] Column header click triggers sort
- [ ] Row checkbox toggles selection
- [ ] Header checkbox toggles all
- [ ] Row click can trigger `onViewItem` (if implemented)
- [ ] Edit/Delete icons call respective callbacks

### FilterPanel

**Renders correctly:**
- [ ] Search input for text search
- [ ] Category dropdown
- [ ] Status multi-select
- [ ] Severity multi-select
- [ ] Date range picker
- [ ] Area/location filter (if implemented)

**User interactions:**
- [ ] Search typing updates immediately (debounced)
- [ ] Dropdown selections update filter state
- [ ] "Apply" submits all filters
- [ ] "Clear" resets all filters

### BulkActionsBar

**Renders correctly (when items selected):**
- [ ] Selection count: "X items selected"
- [ ] "Delete" button
- [ ] "Change Status" dropdown
- [ ] "Clear selection" button

**User interactions:**
- [ ] Delete calls `onBulkDelete` with selected IDs
- [ ] Status change calls `onBulkStatusChange`
- [ ] Clear selection deselects all

### ImportModal

**Renders correctly:**
- [ ] Drag-drop zone with icon
- [ ] "Browse files" button
- [ ] Format hint: "Accepts GeoJSON or CSV"
- [ ] Preview table (after file selected)
- [ ] Summary counts
- [ ] Confirm/Cancel buttons

### ApiKeysPanel

**Renders correctly:**
- [ ] List of API keys with: name, status, permissions, created date, last used
- [ ] "Create New Key" button
- [ ] Actions: Revoke, Regenerate

---

## Edge Cases

- [ ] Table handles 10,000+ records with pagination
- [ ] Very long names truncate with tooltip
- [ ] Import handles 1MB+ GeoJSON files
- [ ] Export handles 5,000+ records
- [ ] Bulk select respects current page vs all pages
- [ ] API key copy works across browsers
- [ ] Date range filter handles timezone differences

---

## Accessibility Checks

- [ ] Table has proper table semantics (thead, tbody, th, td)
- [ ] Sort buttons have aria-sort attribute
- [ ] Checkboxes have labels (can be visually hidden)
- [ ] Modal traps focus when open
- [ ] Filter controls have associated labels
- [ ] Keyboard navigation works in table

---

## Sample Test Data

```typescript
// Sample accessibility item
const mockItem = {
  id: "item-1",
  category: "obstacle",
  type: "construction",
  name: "Sidewalk Repair",
  description: "Construction blocking sidewalk",
  location: { lat: 50.0880, lng: 14.4207, address: "Evropská 15" },
  status: "active",
  severity: "medium",
  metadata: { startDate: "2024-01-10", expectedEnd: "2024-02-15" },
  verificationCount: 3,
  lastUpdated: "2024-01-15T10:00:00Z",
  createdAt: "2024-01-10T08:00:00Z",
  reportedBy: "community"
};

// Sample API key
const mockApiKey = {
  id: "key-1",
  name: "Mobile App",
  key: "ak_live_xxxxxxxxxxxxx",
  permissions: ["read", "write"],
  endpoints: ["/api/features", "/api/obstacles"],
  createdAt: "2024-01-01T00:00:00Z",
  lastUsed: "2024-01-15T14:30:00Z",
  requestCount: 1250,
  status: "active"
};

// Sample import preview
const mockImportPreview = {
  filename: "prague-data.geojson",
  format: "geojson",
  summary: {
    totalRecords: 50,
    toAdd: 30,
    toUpdate: 15,
    toSkip: 5,
    errors: 0
  },
  preview: [
    { action: "add", type: "ramp", name: "Metro Ramp A", location: "Dejvická" },
    { action: "update", type: "crossing", name: "Crossing B", changes: ["status"] },
    { action: "skip", type: "unknown", name: "Invalid", reason: "Missing coordinates" }
  ]
};

// Empty states
const emptyItems = [];
const emptyApiKeys = [];
```
