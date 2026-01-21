# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
```

## Font Usage

### Inter (Heading & Body)
- **Purpose:** All headings and body text
- **Weights used:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Features:** Highly legible at all sizes, excellent for UI

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### IBM Plex Mono (Code & Technical)
- **Purpose:** Code snippets, API keys, coordinates, technical data
- **Weights used:** 400 (Regular), 500 (Medium), 600 (Semibold)
- **Features:** Clear distinction between similar characters (0/O, 1/l/I)

```css
font-family: 'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
```

## Tailwind CSS Configuration

If using Tailwind CSS v4, the fonts are applied via utility classes:

```html
<!-- Heading -->
<h1 class="font-[Inter] text-2xl font-bold">

<!-- Body text -->
<p class="font-[Inter] text-base">

<!-- Code/technical -->
<code class="font-[IBM_Plex_Mono] text-sm">
```

Or configure in your CSS:

```css
@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

## Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2rem (32px) | Bold (700) | 1.25 |
| H2 | 1.5rem (24px) | Semibold (600) | 1.3 |
| H3 | 1.25rem (20px) | Semibold (600) | 1.4 |
| H4 | 1.125rem (18px) | Medium (500) | 1.4 |
| Body | 1rem (16px) | Regular (400) | 1.5 |
| Small | 0.875rem (14px) | Regular (400) | 1.5 |
| Caption | 0.75rem (12px) | Medium (500) | 1.4 |

## Accessibility Considerations

- Default text size is 16px (1rem) for readability
- Support text scaling up to 200% without layout breaking
- Minimum touch target size: 48x48px with appropriate font sizes for labels
- Provide text size adjustment in Settings (small/medium/large/extra-large)
- Ensure sufficient line-height for readability (1.4-1.5 for body text)
