---
description: Capture screenshots of screen designs for documentation
---

# Screenshot Design Workflow

You are capturing screenshots of screen designs for documentation purposes.

## Prerequisites: Browser Tool Required

This workflow requires browser automation capabilities. In Antigravity, use the `browser_subagent` tool to navigate and capture screenshots.

## Step 1: Identify the Screen Design

Read `product/product-roadmap.md` to get sections, then check `src/sections/` for existing screen designs.

- If one screen design exists, auto-select it
- If multiple, ask which one to screenshot

## Step 2: Ensure Dev Server is Running

Start the dev server if not already running:

```bash
npm run dev
```

Wait a few seconds for it to be ready.

## Step 3: Navigate and Capture

Use browser automation to:

1. Navigate to the screen design URL:
   `http://localhost:3000/sections/[section-id]/screen-designs/[screen-design-name]`

2. Wait for page to fully load

3. Click the "Hide" link (has `data-hide-header` attribute) to hide navigation before capture

4. Take a full-page screenshot at desktop width (1280px)

## Step 4: Save the Screenshot

Save to the product folder:

```
product/sections/[section-id]/[screen-design-name].png
```

**Naming conventions:**
- `invoice-list.png` — Main view
- `invoice-list-dark.png` — Dark mode variant
- `invoice-detail.png` — Detail view
- `invoice-form-empty.png` — Empty state

## Step 5: Confirm Completion

> "I've saved the screenshot to `product/sections/[section-id]/[filename].png`.
> 
> Would you like additional screenshots?
> - Dark mode version
> - Mobile viewport
> - Different states (empty, loading)"

## Notes

- Start dev server yourself, don't ask user
- Use consistent viewport width (1280px) for documentation
- Capture full page (all scrollable content)
- You may stop the dev server when done if you started it
