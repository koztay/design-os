# Test Instructions: Community Reporting

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the community reporting system including report creation, photo upload, location picking, offline submission, report viewing, and voting functionality.

---

## User Flow Tests

### Flow 1: Create New Report (Online)

**Scenario:** User creates and submits a new obstacle report

#### Success Path

**Setup:**
- User is online
- GPS location available: { latitude: 50.0880, longitude: 14.4207 }
- Report types loaded

**Steps:**
1. User taps "Report Issue" button
2. User selects "Obstacle" type (red icon)
3. User enters title: "Broken Sidewalk"
4. User enters description: "Large crack makes passage difficult"
5. User taps "Take Photo" and captures image
6. User confirms GPS location (or adjusts on mini-map)
7. User reviews and taps "Submit"

**Expected Results:**
- [ ] Form opens at step 1 (Type Selection)
- [ ] Progress indicator shows current step
- [ ] "Obstacle" type card highlights when selected
- [ ] Title field accepts text input
- [ ] Description field has character counter
- [ ] Photo preview appears after capture
- [ ] Location shows on mini-map with pin
- [ ] "Use Current Location" button fills GPS coordinates
- [ ] Review step shows all entered information
- [ ] Submit calls `onSubmitReport` with complete data
- [ ] Success message: "Report submitted successfully"

#### Failure Path: Validation Error

**Setup:**
- User attempts to submit without required fields

**Steps:**
1. User selects report type
2. User leaves title empty
3. User taps "Next"

**Expected Results:**
- [ ] Error message: "Title is required"
- [ ] Form does not advance to next step
- [ ] Title field shows error state (red border)

---

### Flow 2: Create Report While Offline

**Scenario:** User submits report without internet connection

#### Success Path

**Setup:**
- `isOffline = true`
- GPS location available

**Steps:**
1. User taps "Report Issue"
2. Offline banner appears at top
3. User completes form as normal
4. User taps "Submit"

**Expected Results:**
- [ ] Offline banner shows: "You're offline. Report will be saved and synced later."
- [ ] Form works normally
- [ ] Submit saves to local queue (IndexedDB/localStorage)
- [ ] Success message: "Report saved. Will sync when online."
- [ ] Pending report appears in pending reports section
- [ ] PendingReportCard shows "Pending sync" status

#### Sync Flow

**Setup:**
- Pending report exists
- Connection restored (`isOffline = false`)

**Steps:**
1. App detects connectivity
2. Auto-sync triggers

**Expected Results:**
- [ ] Pending report syncs automatically
- [ ] Status changes from "pending-sync" to "synced"
- [ ] Report appears in main reports list
- [ ] Pending card removed from queue

---

### Flow 3: View Report Details

**Scenario:** User views full details of an existing report

#### Success Path

**Setup:**
- Report with all data:
  - Type: "obstacle"
  - Title: "Construction Site"
  - Description: "Sidewalk blocked by construction"
  - Photo URL present
  - Location with address
  - Verify count: 5
  - Dispute count: 1
  - Status: "active"

**Steps:**
1. User taps on report card in list
2. Detail view opens

**Expected Results:**
- [ ] Full title displayed
- [ ] Type icon and label shown
- [ ] Status badge: "Active" in appropriate color
- [ ] Photo displays (or placeholder if none)
- [ ] Description text fully visible
- [ ] Mini-map shows report location
- [ ] Address displayed below map
- [ ] Vote counts shown: "5 verifications, 1 dispute"
- [ ] VoteButtons component visible
- [ ] "Navigate" button available
- [ ] Close button (X) returns to list

---

### Flow 4: Vote on Report

**Scenario:** User votes to verify a report's accuracy

#### Success Path

**Setup:**
- Report with no user vote yet (`userVote: null`)
- Verify count: 3, Dispute count: 0

**Steps:**
1. User views report detail
2. User taps "Verify" button

**Expected Results:**
- [ ] `onVerifyReport` called with report ID
- [ ] Verify count updates to 4
- [ ] "Verify" button shows selected state
- [ ] User cannot vote again (button disabled or shows vote)

#### Already Voted

**Setup:**
- User already voted verify (`userVote: "verify"`)

**Expected Results:**
- [ ] "Verify" button shows selected/active state
- [ ] "Dispute" button is not selected
- [ ] User can change vote by tapping "Dispute"

---

### Flow 5: Browse and Filter Reports

**Scenario:** User browses reports with filters

#### Success Path

**Setup:**
- 10 reports of mixed types and statuses

**Steps:**
1. User views reports list
2. User taps filter dropdown
3. User selects "Obstacles only"
4. User taps status filter
5. User selects "Verified"

**Expected Results:**
- [ ] Initial list shows all 10 reports
- [ ] Filter by type calls `onFilterByType("obstacle")`
- [ ] List updates to show only obstacle reports
- [ ] Filter by status calls `onFilterByStatus("verified")`
- [ ] List shows only verified obstacles
- [ ] Report cards show correct type icons
- [ ] Status badges display correctly

---

## Empty State Tests

### No Reports Yet

**Setup:**
- `reports = []`
- `pendingReports = []`

**Expected Results:**
- [ ] Empty state illustration/icon displayed
- [ ] Message: "No reports in this area yet"
- [ ] Sub-message: "Be the first to contribute!"
- [ ] CTA button: "Create Report" visible
- [ ] Tapping CTA opens report form

### No Filtered Results

**Setup:**
- Reports exist but none match filter

**Steps:**
1. User filters by "Fixed Issues"
2. No reports match

**Expected Results:**
- [ ] Message: "No reports match your filters"
- [ ] "Clear filters" link visible
- [ ] Tapping link resets filters and shows all reports

### No Pending Reports

**Setup:**
- `pendingReports = []`
- User is online

**Expected Results:**
- [ ] Pending reports section is hidden (not shown at all)
- [ ] No "Pending sync" area visible

---

## Component Interaction Tests

### ReportForm

**Renders correctly:**
- [ ] Progress indicator shows steps
- [ ] Current step content displays
- [ ] "Next" and "Back" buttons visible
- [ ] "Submit" button on final step

**User interactions:**
- [ ] Selecting type advances to next step
- [ ] "Back" returns to previous step
- [ ] Form state persists when navigating steps

### ReportTypeSelector

**Renders correctly:**
- [ ] Three type cards: Obstacle, Improvement, Fixed Issue
- [ ] Each has icon, label, description

**User interactions:**
- [ ] Tapping card selects it (highlighted state)
- [ ] Only one type can be selected
- [ ] Selection calls `onSelect` with type value

### PhotoUpload

**Renders correctly:**
- [ ] "Take Photo" button visible
- [ ] "Choose from Gallery" button visible
- [ ] Preview area (empty initially)

**User interactions:**
- [ ] "Take Photo" calls `onCapturePhoto`
- [ ] "Choose from Gallery" calls `onSelectPhoto`
- [ ] After photo selected, preview shows thumbnail
- [ ] "Remove" button appears on preview
- [ ] Remove calls `onRemovePhoto`

### VoteButtons

**Renders correctly:**
- [ ] "Verify" button with count
- [ ] "Dispute" button with count
- [ ] Appropriate icons (check, x)

**User interactions:**
- [ ] Tapping Verify calls `onVerify`
- [ ] Tapping Dispute calls `onDispute`
- [ ] Active vote highlighted
- [ ] Counts update on vote

### OfflineBanner

**Renders correctly when offline:**
- [ ] Yellow/orange warning color
- [ ] Offline icon visible
- [ ] Message: "You're offline"
- [ ] Pending count shown: "3 reports pending"

**User interactions:**
- [ ] "Sync Now" button calls `onSyncNow`

---

## Edge Cases

- [ ] Very long report titles truncate in cards, show full in detail
- [ ] Reports without photos show placeholder
- [ ] Location without address shows coordinates
- [ ] Photo upload handles large files (compression)
- [ ] Rapid voting doesn't duplicate votes
- [ ] Form state preserved on accidental back navigation
- [ ] Offline queue handles 50+ pending reports

---

## Accessibility Checks

- [ ] Form fields have associated labels
- [ ] Error messages announced to screen readers
- [ ] Vote buttons have aria-pressed states
- [ ] Photo upload has accessible alternatives
- [ ] Status badges have aria-labels
- [ ] Modal/dialog properly traps focus

---

## Sample Test Data

```typescript
// Sample report
const mockReport = {
  id: "r1",
  type: "obstacle",
  status: "active",
  title: "Broken Sidewalk",
  description: "Large crack in sidewalk makes wheelchair passage difficult",
  location: {
    latitude: 50.0880,
    longitude: 14.4207,
    address: "Evropská 15, Prague 6"
  },
  photoUrl: "https://example.com/photo.jpg",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  authorName: "Jan Novák",
  verifyCount: 5,
  disputeCount: 1,
  userVote: null
};

// Sample pending report
const mockPendingReport = {
  id: "p1",
  type: "improvement",
  title: "New Ramp Installed",
  description: "Building added wheelchair ramp at entrance",
  location: { latitude: 50.0900, longitude: 14.4250 },
  photoUrl: null,
  createdAt: "2024-01-16T14:00:00Z",
  syncStatus: "pending-sync",
  retryCount: 0
};

// Report types
const mockReportTypes = [
  { id: "obstacle", label: "Obstacle", description: "Report a barrier", icon: "alert-triangle" },
  { id: "improvement", label: "Improvement", description: "Report an improvement", icon: "trending-up" },
  { id: "fixed-issue", label: "Fixed Issue", description: "Report a fix", icon: "check-circle" }
];

// Empty states
const emptyReports = [];
const emptyPendingReports = [];
```
