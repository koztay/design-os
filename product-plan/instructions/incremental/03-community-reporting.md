# Milestone 3: Community Reporting

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 2 (Map & Navigation) complete

## Goal

Implement the Community Reporting feature — a form-based system for users to submit obstacles and improvements with photos, GPS location, and offline submission capability.

## Overview

Community reporting enables users to contribute to the accessibility database by reporting new obstacles (construction, damaged sidewalks) or improvements (new ramps, fixed issues). Reports include photos, GPS location, and descriptions. The system works offline, queuing reports for sync when connectivity returns. Other users can vote to verify or dispute reports, maintaining data quality through crowdsourcing.

**Key Functionality:**
- Multi-step report creation form (Type → Details → Photo → Location → Review)
- Photo capture from camera or gallery selection
- GPS-based location with manual adjustment
- Offline report submission with sync queue
- Report list with filtering by type and status
- Detailed report view with mini-map
- Community voting (verify/dispute) on reports
- Status badges (Pending, Active, Verified, Resolved, Disputed)

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/community-reporting/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/community-reporting/components/`:

- `ReportForm.tsx` — Multi-step form for creating reports
- `ReportTypeSelector.tsx` — Type selection with icons
- `PhotoUpload.tsx` — Camera/gallery photo handling
- `LocationPicker.tsx` — GPS location with map preview
- `ReportsList.tsx` — Filterable list of reports
- `ReportCard.tsx` — Individual report preview card
- `ReportDetail.tsx` — Full report view with voting
- `VoteButtons.tsx` — Verify/dispute voting controls
- `PendingReportCard.tsx` — Queued offline reports
- `OfflineBanner.tsx` — Offline status indicator

### Data Layer

The components expect these data shapes (see `types.ts`):

- `Report` — Full report with type, status, location, photo, votes
- `PendingReport` — Offline-queued report with sync status
- `ReportType` — 'obstacle' | 'improvement' | 'fixed-issue'
- `ReportStatus` — 'pending' | 'active' | 'verified' | 'resolved' | 'disputed'
- `VoteType` — 'verify' | 'dispute'
- `Location` — Coordinates with optional address

You'll need to:
- Create API endpoints for report CRUD operations
- Implement photo upload to storage (S3, Cloudinary, etc.)
- Store pending reports in IndexedDB for offline sync
- Track user votes to prevent duplicate voting
- Calculate verification thresholds for status changes

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onSubmitReport` | User submits new report |
| `onViewReport` | User views report details |
| `onNavigateToReport` | User navigates to report location on map |
| `onVerifyReport` | User votes to verify accuracy |
| `onDisputeReport` | User votes to dispute report |
| `onEditReport` | User edits their own report |
| `onDeleteReport` | User deletes their own report |
| `onSyncPendingReports` | Manual sync trigger |
| `onRetrySync` | Retry failed sync |
| `onRequestLocation` | Get current GPS position |
| `onCapturePhoto` | Take photo with camera |
| `onSelectPhoto` | Pick photo from gallery |
| `onFilterByType` | Filter reports by type |
| `onFilterByStatus` | Filter reports by status |

### Empty States

Implement empty state UI for when no records exist yet:

- **No reports:** Show "No reports in this area yet. Be the first to contribute!" with CTA to create report
- **No pending reports:** Don't show pending section if queue is empty
- **No filtered results:** "No reports match your filters" with clear filters option
- **First-time user:** Welcome message explaining how reporting helps the community

## Files to Reference

- `product-plan/sections/community-reporting/README.md` — Feature overview and design intent
- `product-plan/sections/community-reporting/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/community-reporting/components/` — React components
- `product-plan/sections/community-reporting/types.ts` — TypeScript interfaces
- `product-plan/sections/community-reporting/sample-data.json` — Test data
- `product-plan/sections/community-reporting/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Create New Report (Online)

1. User taps "Report Issue" floating action button
2. User selects report type (Obstacle, Improvement, or Fixed Issue)
3. User enters title and description
4. User takes or selects photo (optional)
5. User confirms or adjusts GPS location
6. User reviews and submits report
7. **Outcome:** Report appears in list with "Pending" status, success confirmation shown

### Flow 2: Create Report While Offline

1. User taps "Report Issue" while offline
2. Offline banner appears indicating report will be queued
3. User completes the report form as normal
4. User submits report
5. Report saved to local queue with "Pending Sync" indicator
6. When online, report automatically syncs
7. **Outcome:** Report syncs when connectivity returns, user notified of success

### Flow 3: Vote on a Report

1. User views report details
2. User taps "Verify" to confirm the report is accurate
3. Vote count increases
4. If enough verifications, status changes to "Verified"
5. **Outcome:** Report status updated, user's vote recorded (can't vote twice)

### Flow 4: Browse and Filter Reports

1. User views reports list
2. User taps filter button
3. User selects "Obstacles only" filter
4. List updates to show only obstacle reports
5. User taps on a report card
6. **Outcome:** Report detail view opens with full information and mini-map

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Multi-step report form works completely
- [ ] Photo capture and gallery selection work
- [ ] GPS location detection works
- [ ] Location can be manually adjusted on mini-map
- [ ] Reports submit successfully (online)
- [ ] Offline reports queue and sync when online
- [ ] Pending reports show sync status
- [ ] Reports list displays with filtering
- [ ] Report detail view shows all information
- [ ] Voting increments counts correctly
- [ ] User's own vote is tracked (no duplicate votes)
- [ ] Status badges display correctly
- [ ] Empty states display when no reports exist
- [ ] Matches the visual design (see screenshots)
- [ ] Responsive on mobile
