# Milestone 5: Settings & Localization

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-4 complete

## Goal

Implement the Settings & Localization feature — a single-page settings interface for language preferences, mobility settings, and visual accessibility options.

## Overview

This section allows users to customize their experience without requiring an account. Settings are stored locally on the device. Users can switch between Czech and English languages, configure their mobility profile for optimized route calculation, and adjust visual settings for accessibility needs.

**Key Functionality:**
- Language switching (Czech/English) with immediate UI update
- Mobility profile (wheelchair type, slopes, curb heights, path widths, surfaces)
- Visual accessibility (high contrast, text size, color blindness modes)
- Local storage persistence (no account required)
- Settings apply immediately without save button

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/settings-and-localization-specification/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/settings-and-localization-specification/components/`:

- `SettingsPage.tsx` — Main settings container
- `LanguageSection.tsx` — Language toggle (Czech/English)
- `MobilitySection.tsx` — Mobility profile settings
- `VisualSection.tsx` — Visual accessibility options

### Data Layer

The components expect these data shapes (see `types.ts`):

- `Language` — 'cs' | 'en'
- `WheelchairType` — 'manual' | 'electric' | 'scooter'
- `SurfaceType` — 'paved' | 'cobblestone' | 'gravel' | 'grass' | 'dirt'
- `ColorBlindnessMode` — 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
- `TextSize` — 'small' | 'medium' | 'large' | 'extra-large'
- `UserSettings` — Complete settings object with language, mobility, visual

You'll need to:
- Store settings in localStorage
- Implement i18n for Czech/English translations
- Apply visual settings globally (CSS variables or Tailwind config)
- Pass mobility settings to route calculation engine

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onLanguageChange` | Switch between Czech and English |
| `onWheelchairTypeChange` | Select wheelchair type |
| `onMaxSlopeChange` | Adjust maximum slope tolerance |
| `onCurbHeightChange` | Adjust curb height tolerance |
| `onPathWidthChange` | Set preferred path width |
| `onWalkingSpeedChange` | Select walking speed |
| `onRestStopsToggle` | Enable/disable rest stops |
| `onRestStopIntervalChange` | Set rest stop frequency |
| `onAvoidStairsToggle` | Toggle stairs avoidance |
| `onSurfacePreferenceToggle` | Toggle surface type preferences |
| `onHighContrastToggle` | Enable high contrast mode |
| `onTextSizeChange` | Adjust text size |
| `onColorBlindnessModeChange` | Select color blindness mode |
| `onReduceMotionToggle` | Reduce animations |

### Empty States

This section doesn't have traditional empty states since settings always have default values. However, ensure:

- **First-time users:** Settings show sensible defaults
- **Reset option:** Consider adding "Reset to defaults" functionality

## Files to Reference

- `product-plan/sections/settings-and-localization-specification/README.md` — Feature overview and design intent
- `product-plan/sections/settings-and-localization-specification/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/settings-and-localization-specification/components/` — React components
- `product-plan/sections/settings-and-localization-specification/types.ts` — TypeScript interfaces
- `product-plan/sections/settings-and-localization-specification/sample-data.json` — Test data
- `product-plan/sections/settings-and-localization-specification/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Change Language

1. User opens Settings tab
2. User sees Language section with Czech/English toggle
3. User taps "English"
4. Entire UI immediately updates to English
5. **Outcome:** All text throughout the app displays in English, preference saved

### Flow 2: Configure Mobility Profile

1. User scrolls to Mobility section
2. User selects "Electric wheelchair" type
3. User adjusts max slope slider to 8%
4. User sets curb height tolerance to 5cm
5. User toggles "Avoid cobblestone" surface preference
6. **Outcome:** Route calculations now use these constraints

### Flow 3: Enable High Contrast Mode

1. User scrolls to Visual section
2. User toggles "High Contrast" on
3. App switches to high contrast color scheme immediately
4. User increases text size to "Large"
5. **Outcome:** App displays with increased contrast and larger text

### Flow 4: Select Color Blindness Mode

1. User opens Visual section
2. User selects "Deuteranopia" from color blindness dropdown
3. Map markers and UI colors adjust for red-green color blindness
4. **Outcome:** All color-dependent UI elements use deuteranopia-safe palette

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Language toggle switches between Czech and English
- [ ] All UI text updates immediately on language change
- [ ] Language preference persists in localStorage
- [ ] Wheelchair type selector works
- [ ] All sliders work (slope, curb height, path width, rest interval)
- [ ] Walking speed selector works
- [ ] Rest stops toggle works
- [ ] Avoid stairs toggle works
- [ ] Surface preference checkboxes work
- [ ] High contrast toggle applies throughout app
- [ ] Text size changes apply throughout app
- [ ] Color blindness modes adjust colors appropriately
- [ ] Reduce motion toggle reduces animations
- [ ] All settings persist in localStorage
- [ ] Settings apply immediately (no save button needed)
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
