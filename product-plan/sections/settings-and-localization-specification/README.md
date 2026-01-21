# Settings & Localization

## Overview

A single-page settings interface where users configure language preferences (Czech/English), mobility settings for route optimization, and visual accessibility options. All settings are stored locally on the device without requiring an account.

## User Flows

- User switches between Czech and English with immediate UI update
- User configures mobility profile (wheelchair type, max slope, curb height tolerance, preferred path width, walking speed, rest stop preferences, surface type preferences)
- User adjusts visual settings (high contrast mode, text size, color blindness modes)
- User toggles "avoid stairs" preference for route planning

## Design Decisions

- Single scrollable page (no tabs) for simplicity
- Settings apply immediately without save button
- Clear section headings (Language, Mobility, Visual)
- Range sliders for numerical preferences
- Toggle switches for on/off options
- Dropdown for color blindness modes
- No account required - localStorage persistence

## Data Used

**Entities:**
- `Language` — 'cs' | 'en'
- `WheelchairType` — 'manual' | 'electric' | 'scooter'
- `SurfaceType` — 'paved' | 'cobblestone' | 'gravel' | 'grass' | 'dirt'
- `ColorBlindnessMode` — 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
- `TextSize` — 'small' | 'medium' | 'large' | 'extra-large'
- `UserSettings` — Complete settings object

**From global model:**
- Settings affect Route calculations
- Language affects all UI text

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `SettingsPage` — Main settings container
- `LanguageSection` — Language toggle (Czech/English)
- `MobilitySection` — Mobility profile settings
- `VisualSection` — Visual accessibility options

## Callback Props

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
