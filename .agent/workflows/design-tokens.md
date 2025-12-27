---
description: Choose your color palette and typography for screen designs
---

# Design Tokens Workflow

You are helping the user choose colors and typography. These tokens will be used consistently across all screen designs and the application shell.

## Step 1: Check Prerequisites

Read `product/product-overview.md` to understand what the product is.

If it doesn't exist:
> "Before defining your design system, please run `/product-vision` first."

**Stop here if prerequisite is missing.**

## Step 2: Explain the Process

> "Let's define the visual identity for **[Product Name]**.
> 
> I'll help you choose:
> 1. **Colors** — A primary accent, secondary accent, and neutral palette
> 2. **Typography** — Fonts for headings, body text, and code
> 
> Do you have any existing brand colors or fonts in mind, or would you like suggestions?"

**Wait for response.**

## Step 3: Choose Colors

Help select from Tailwind's palette:

> "**Primary color** (buttons, links, key accents):
> Options: `blue`, `indigo`, `violet`, `emerald`, `teal`, `amber`, `rose`, `lime`
> 
> **Secondary color** (tags, highlights):
> Should complement your primary
> 
> **Neutral color** (backgrounds, text, borders):
> Options: `slate` (cool), `gray`, `zinc`, `neutral`, `stone` (warm)
> 
> Based on **[Product Name]**, I'd suggest:
> - **Primary:** [suggestion] — [why]
> - **Secondary:** [suggestion] — [why]
> - **Neutral:** [suggestion] — [why]"

Ask follow-ups if needed:
- "What vibe? Professional, playful, modern, minimal?"
- "Any colors to avoid?"
- "Light mode, dark mode, or both?"

## Step 4: Choose Typography

> "**Heading font:** `DM Sans`, `Inter`, `Poppins`, `Manrope`, `Space Grotesk`, `Outfit`
> 
> **Body font:** Often same as heading, or: `Inter`, `Source Sans 3`, `Nunito Sans`
> 
> **Mono font:** `IBM Plex Mono`, `JetBrains Mono`, `Fira Code`
> 
> My suggestions:
> - **Heading:** [suggestion]
> - **Body:** [suggestion]
> - **Mono:** [suggestion]"

## Step 5: Create the Files

Once approved, create two files:

**File 1:** `product/design-system/colors.json`
```json
{
  "primary": "[color]",
  "secondary": "[color]",
  "neutral": "[color]"
}
```

**File 2:** `product/design-system/typography.json`
```json
{
  "heading": "[Font Name]",
  "body": "[Font Name]",
  "mono": "[Font Name]"
}
```

## Step 6: Confirm Completion

> "I've saved your design tokens:
> - `product/design-system/colors.json`
> - `product/design-system/typography.json`
> 
> **Next step:** Run `/design-shell` to design your app's navigation and layout."

## Reference: Popular Font Pairings

- **Modern & Clean:** DM Sans + IBM Plex Mono
- **Professional:** Inter + JetBrains Mono
- **Friendly:** Nunito Sans + Fira Code
- **Bold & Modern:** Space Grotesk + Source Code Pro

## Notes

- Colors should be Tailwind palette names (not hex codes)
- Fonts should be exact Google Fonts names
- The mono font is optional but recommended for technical products
