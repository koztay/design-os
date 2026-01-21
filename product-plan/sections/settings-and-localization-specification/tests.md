# Test Instructions: Settings & Localization

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the settings page including language switching, mobility profile configuration, and visual accessibility options. All settings should apply immediately and persist in localStorage.

---

## User Flow Tests

### Flow 1: Change Language

**Scenario:** User switches from English to Czech

#### Success Path

**Setup:**
- Current language: 'en'
- Available languages: [{ code: 'cs', label: 'Czech', nativeLabel: 'Čeština' }, { code: 'en', label: 'English', nativeLabel: 'English' }]

**Steps:**
1. User navigates to Settings page
2. User sees Language section with two-option toggle
3. User taps "Čeština" button
4. UI updates to Czech

**Expected Results:**
- [ ] Language section shows both options: "Čeština" and "English"
- [ ] Current language (English) is highlighted/selected
- [ ] Tapping "Čeština" calls `onLanguageChange('cs')`
- [ ] Toggle updates to show Czech selected
- [ ] All UI text throughout the app changes to Czech immediately
- [ ] Language preference persists after page refresh

---

### Flow 2: Configure Mobility Profile

**Scenario:** User sets up their wheelchair accessibility preferences

#### Success Path

**Setup:**
- Default settings loaded

**Steps:**
1. User scrolls to Mobility section
2. User selects "Electric" wheelchair type
3. User adjusts max slope slider to 8%
4. User adjusts curb height to 5cm
5. User adjusts path width to 120cm
6. User selects "Slow" walking speed
7. User enables rest stops
8. User sets rest stop interval to 15 minutes
9. User enables "Avoid stairs"
10. User unchecks "Cobblestone" surface preference

**Expected Results:**
- [ ] Wheelchair type selector shows 3 options: Manual, Electric, Scooter
- [ ] Selecting "Electric" calls `onWheelchairTypeChange('electric')`
- [ ] Max slope slider ranges 0-15%, shows current value "8%"
- [ ] Slider change calls `onMaxSlopeChange(8)`
- [ ] Curb height slider ranges 0-15cm
- [ ] Path width slider ranges 80-200cm, shows "120cm"
- [ ] Walking speed has 3 options: Slow, Normal, Fast
- [ ] Rest stops toggle calls `onRestStopsToggle(true)`
- [ ] Rest stop interval slider appears when enabled (5-60 min)
- [ ] "Avoid stairs" toggle calls `onAvoidStairsToggle(true)`
- [ ] Surface checkboxes: Paved, Cobblestone, Gravel, Grass, Dirt
- [ ] Unchecking calls `onSurfacePreferenceToggle('cobblestone', false)`
- [ ] All changes apply immediately (no save button)

---

### Flow 3: Adjust Visual Accessibility

**Scenario:** User enables high contrast and increases text size

#### Success Path

**Setup:**
- Default visual settings (no accessibility features enabled)

**Steps:**
1. User scrolls to Visual section
2. User toggles "High Contrast" on
3. User adjusts text size to "Large"
4. User selects "Deuteranopia" color blindness mode
5. User toggles "Reduce Motion" on

**Expected Results:**
- [ ] High Contrast toggle calls `onHighContrastToggle(true)`
- [ ] App immediately switches to high contrast color scheme
- [ ] Text size has options: Small, Medium, Large, Extra-Large
- [ ] Selecting "Large" calls `onTextSizeChange('large')`
- [ ] All text in app increases size immediately
- [ ] Color blindness dropdown shows: None, Protanopia, Deuteranopia, Tritanopia
- [ ] Selecting Deuteranopia calls `onColorBlindnessModeChange('deuteranopia')`
- [ ] Color scheme adjusts for red-green color blindness
- [ ] Reduce Motion toggle calls `onReduceMotionToggle(true)`
- [ ] Animations throughout app are minimized/disabled

---

### Flow 4: Settings Persistence

**Scenario:** User's settings persist across sessions

#### Success Path

**Setup:**
- User has made custom settings changes

**Steps:**
1. User configures various settings
2. User closes app/browser
3. User reopens app

**Expected Results:**
- [ ] All settings are restored from localStorage
- [ ] Language preference restored
- [ ] Mobility settings restored
- [ ] Visual settings applied on load
- [ ] UI reflects saved preferences immediately

---

## Empty State Tests

Settings don't have traditional empty states, but test default values:

### Default Settings

**Setup:**
- First-time user, no localStorage data

**Expected Results:**
- [ ] Language defaults to browser language or English
- [ ] Wheelchair type defaults to "Manual"
- [ ] Max slope defaults to reasonable value (e.g., 8%)
- [ ] Curb height defaults to reasonable value (e.g., 5cm)
- [ ] Path width defaults to reasonable value (e.g., 90cm)
- [ ] Walking speed defaults to "Normal"
- [ ] Rest stops disabled by default
- [ ] Avoid stairs enabled by default
- [ ] All surfaces preferred by default
- [ ] High contrast off by default
- [ ] Text size "Medium" by default
- [ ] Color blindness mode "None" by default
- [ ] Reduce motion off by default

---

## Component Interaction Tests

### SettingsPage

**Renders correctly:**
- [ ] Page title: "Settings"
- [ ] Three sections visible: Language, Mobility, Visual
- [ ] Scrollable on mobile
- [ ] No save button (immediate apply)

### LanguageSection

**Renders correctly:**
- [ ] Section heading: "Language"
- [ ] Two-button toggle group
- [ ] Current language highlighted

**User interactions:**
- [ ] Tapping inactive language switches selection
- [ ] Only one language can be selected
- [ ] Change triggers callback immediately

### MobilitySection

**Renders correctly:**
- [ ] Section heading: "Mobility"
- [ ] Wheelchair type selector (3 options with icons)
- [ ] Sliders with labels and current values
- [ ] Toggle switches for boolean options
- [ ] Surface preference checkboxes

**User interactions:**
- [ ] Wheelchair type cards are selectable (one at a time)
- [ ] Sliders are draggable
- [ ] Slider values update in real-time during drag
- [ ] Toggles flip state on tap
- [ ] Checkboxes toggle independently
- [ ] Rest stop interval only visible when rest stops enabled

### VisualSection

**Renders correctly:**
- [ ] Section heading: "Visual Accessibility"
- [ ] High contrast toggle
- [ ] Text size selector/slider
- [ ] Color blindness dropdown
- [ ] Reduce motion toggle

**User interactions:**
- [ ] High contrast toggle changes app theme
- [ ] Text size change affects all text
- [ ] Dropdown opens on tap, shows options
- [ ] Selecting option closes dropdown
- [ ] Reduce motion affects animations

---

## Edge Cases

- [ ] Extreme slider values (0% slope, 200cm width) handled correctly
- [ ] Rapid toggle clicking doesn't break state
- [ ] Language change mid-session updates all visible text
- [ ] High contrast + color blindness modes work together
- [ ] Very long translated strings don't break layout
- [ ] Settings page works without JavaScript (graceful degradation)
- [ ] localStorage full scenario handled gracefully

---

## Accessibility Checks

- [ ] All form controls have visible labels
- [ ] Sliders are keyboard accessible (arrow keys)
- [ ] Toggle switches have proper role and state
- [ ] Color contrast meets WCAG AA (AAA when high contrast on)
- [ ] Focus indicators visible on all controls
- [ ] Screen reader announces setting changes
- [ ] High contrast mode provides AAA contrast ratios
- [ ] Text size changes don't break layout

---

## Sample Test Data

```typescript
// Sample user settings
const mockSettings = {
  language: {
    current: 'en',
    available: [
      { code: 'cs', label: 'Czech', nativeLabel: 'Čeština' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ]
  },
  mobility: {
    wheelchairType: 'manual',
    maxSlope: 8,
    curbHeightTolerance: 5,
    preferredPathWidth: 90,
    walkingSpeed: 'normal',
    restStopsEnabled: false,
    restStopInterval: 15,
    avoidStairs: true,
    surfacePreferences: [
      { type: 'paved', label: 'Paved', preferred: true },
      { type: 'cobblestone', label: 'Cobblestone', preferred: false },
      { type: 'gravel', label: 'Gravel', preferred: false },
      { type: 'grass', label: 'Grass', preferred: false },
      { type: 'dirt', label: 'Dirt', preferred: false }
    ]
  },
  visual: {
    highContrast: false,
    textSize: 'medium',
    colorBlindnessMode: 'none',
    reduceMotion: false
  }
};

// Settings with accessibility features enabled
const mockAccessibleSettings = {
  ...mockSettings,
  visual: {
    highContrast: true,
    textSize: 'large',
    colorBlindnessMode: 'deuteranopia',
    reduceMotion: true
  }
};

// Electric wheelchair user settings
const mockElectricWheelchairSettings = {
  ...mockSettings,
  mobility: {
    ...mockSettings.mobility,
    wheelchairType: 'electric',
    maxSlope: 12,
    walkingSpeed: 'fast',
    restStopsEnabled: true,
    restStopInterval: 30
  }
};
```

---

## Integration Notes

- Settings affect route calculations in Map & Navigation section
- Language affects all text in the entire application
- Visual settings should be applied at the app root level
- Consider using CSS custom properties for dynamic theming
- localStorage key suggestion: `accessibleprague_settings`
