# Data Model

## Overview

AccessiblePrague uses six core entities that work together to provide wheelchair-accessible navigation.

## Entities

### AccessibilityFeature
A barrier-free element that helps wheelchair users navigate, such as a ramp, accessible crossing, or wide sidewalk. Each feature has a location, type, and accessibility metadata (slope angle, width, surface type) to help with route calculation.

**Key fields:**
- `id` — Unique identifier
- `type` — 'ramp' | 'crossing' | 'sidewalk'
- `name` — Display name
- `location` — Geographic coordinates
- `metadata` — Accessibility characteristics (slope, width, surface, condition)
- `verified` — Community verification status
- `lastUpdated` — Last modification timestamp

### Obstacle
A barrier or impediment that blocks or restricts wheelchair access, such as construction work, damaged sidewalks, stairs without ramps, or temporary obstacles.

**Key fields:**
- `id` — Unique identifier
- `type` — 'construction' | 'damaged-sidewalk' | 'stairs-without-ramp' | 'temporary'
- `name` — Display name
- `location` — Geographic coordinates
- `severity` — 'low' | 'medium' | 'high'
- `status` — 'active' | 'verified' | 'resolved'
- `description` — Detailed description
- `reportedDate` — When first reported
- `estimatedClearance` — Expected resolution date (if known)

### Report
A community-submitted observation about an obstacle or improvement in the accessibility infrastructure. Users can report new obstacles, request improvements, or confirm that issues have been fixed.

**Key fields:**
- `id` — Unique identifier
- `type` — 'obstacle' | 'improvement' | 'fixed-issue'
- `status` — 'pending' | 'active' | 'verified' | 'resolved' | 'disputed'
- `title` — Report title
- `description` — Detailed description
- `location` — Geographic coordinates
- `photoUrl` — Optional photo evidence
- `createdAt` — Submission timestamp
- `authorName` — Reporter name
- `verifyCount` / `disputeCount` — Community votes

### Route
A calculated path from point A to point B optimized for wheelchair accessibility. The route considers slopes, sidewalk widths, presence of ramps, and avoids known obstacles.

**Key fields:**
- `id` — Unique identifier
- `start` / `end` — Start and destination locations
- `distance` — Total distance in meters
- `estimatedTime` — Travel time in minutes
- `difficulty` — 'easy' | 'moderate' | 'challenging'
- `accessibilityScore` — 0-100 rating
- `steps` — Turn-by-turn navigation instructions
- `featuresUsed` — IDs of accessibility features along the route
- `obstaclesAvoided` — IDs of obstacles the route avoids

### Verification
A user's vote or confirmation on a report's accuracy. Community members can verify that an obstacle still exists, confirm it has been fixed, or dispute the report.

**Relationship:**
- Belongs to one Report
- Aggregated as `verifyCount` and `disputeCount` on Report

### Location
A geographic point defined by latitude and longitude coordinates. Serves as the spatial anchor for accessibility features, obstacles, reports, and route waypoints.

**Key fields:**
- `lat` / `lng` (or `latitude` / `longitude`) — Coordinates
- `address` — Human-readable address (optional)
- `name` — Location name (optional)

## Relationships

```
AccessibilityFeature ──has one──> Location
Obstacle ──has one──> Location
Report ──has one──> Location
Report ──can reference──> AccessibilityFeature OR Obstacle
Route ──has many──> Location (start, end, waypoints)
Route ──passes through──> AccessibilityFeature[]
Route ──avoids──> Obstacle[]
Report ──has many──> Verification
Verification ──belongs to──> Report
```

## Notes for Implementation

1. **GeoJSON Compatibility:** Consider storing location data in GeoJSON format for import/export
2. **Offline Sync:** Reports need a `syncStatus` field for offline queue management
3. **User Context:** Add user IDs to Reports and Verifications for ownership
4. **Timestamps:** Use ISO 8601 format for all dates
5. **Coordinates:** Use decimal degrees (WGS84) for lat/lng
