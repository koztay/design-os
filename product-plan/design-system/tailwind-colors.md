# Tailwind Color Configuration

## Color Choices

- **Primary:** `blue` — Used for buttons, links, active states, primary actions
- **Secondary:** `emerald` — Used for success states, accessible features, positive indicators
- **Neutral:** `slate` — Used for backgrounds, text, borders, cards

## Usage Examples

### Primary (Blue)
```html
<!-- Primary button -->
<button class="bg-blue-600 hover:bg-blue-700 text-white">
  Calculate Route
</button>

<!-- Primary link -->
<a class="text-blue-600 hover:text-blue-700 dark:text-blue-400">
  View Details
</a>

<!-- Active state -->
<div class="border-blue-500 bg-blue-50 dark:bg-blue-950">
  Selected item
</div>
```

### Secondary (Emerald)
```html
<!-- Success badge -->
<span class="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
  Verified
</span>

<!-- Accessible feature marker -->
<div class="bg-emerald-500">
  <!-- Green dot for ramps, crossings -->
</div>

<!-- Success message -->
<div class="text-emerald-600 dark:text-emerald-400">
  Report submitted successfully
</div>
```

### Neutral (Slate)
```html
<!-- Background -->
<div class="bg-slate-50 dark:bg-slate-900">
  Page background
</div>

<!-- Card -->
<div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
  Card content
</div>

<!-- Text -->
<p class="text-slate-900 dark:text-white">Primary text</p>
<p class="text-slate-600 dark:text-slate-400">Secondary text</p>
<p class="text-slate-400 dark:text-slate-500">Muted text</p>
```

## Common Patterns

### Buttons
```html
<!-- Primary -->
<button class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2">

<!-- Secondary -->
<button class="bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg px-4 py-2">

<!-- Outline -->
<button class="border border-slate-300 hover:border-blue-500 hover:text-blue-600 dark:border-slate-600 rounded-lg px-4 py-2">
```

### Status Colors
```html
<!-- Active/Warning (obstacles) -->
<span class="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">

<!-- Pending -->
<span class="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">

<!-- Success/Verified -->
<span class="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
```

### Dark Mode
All components use `dark:` variants for dark mode support:
- Light backgrounds (`bg-white`, `bg-slate-50`) → Dark backgrounds (`dark:bg-slate-800`, `dark:bg-slate-900`)
- Light text (`text-slate-900`) → Dark text (`dark:text-white`)
- Light borders (`border-slate-200`) → Dark borders (`dark:border-slate-700`)

## Accessibility Notes

- Ensure sufficient contrast ratios (WCAG AA minimum, AAA for high contrast mode)
- Use semantic colors consistently (red for obstacles/warnings, green for accessible features)
- Test color combinations with color blindness simulators
- Don't rely solely on color to convey information (use icons, text labels)
