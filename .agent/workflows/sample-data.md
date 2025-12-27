---
description: Create sample data and TypeScript types for a section
---

# Sample Data Workflow

You are helping create realistic sample data for a section. This data populates screen designs. You'll also generate TypeScript types.

## Step 1: Check Prerequisites

Identify the target section and verify `spec.md` exists.

If multiple sections, ask which one. If spec doesn't exist:
> "Please run `/shape-section` first to define the section requirements."

Also check for `product/data-model/data-model.md` — if it exists, use those entity names for consistency.

## Step 2: Analyze the Specification

Read `product/sections/[section-id]/spec.md` to understand:
- What data entities are implied?
- What fields would each entity need?
- What sample values would be realistic?
- What actions can be taken? (become callback props)

Cross-reference with global data model if it exists.

## Step 3: Present Data Structure

Present in human-friendly language:

> "Based on **[Section]** and your data model, here's how I'm organizing data:
> 
> **Entities:**
> - **[Entity1]** — [Description]
> - **[Entity2]** — [Description]
> 
> **What You Can Do:**
> - View, edit, delete [entities]
> - [Other actions]
> 
> I'll create [X] realistic records. Does this make sense?"

## Step 4: Generate data.json

Create `product/sections/[section-id]/data.json`:

```json
{
  "_meta": {
    "models": {
      "invoices": "Each invoice represents a bill sent to a client."
    },
    "relationships": [
      "Each Invoice contains one or more Line Items"
    ]
  },
  "invoices": [
    {
      "id": "inv-001",
      "invoiceNumber": "INV-2024-001",
      "clientName": "Acme Corp",
      "total": 1500.00,
      "status": "sent"
    }
  ]
}
```

**Requirements:**
- Include `_meta` with models and relationships
- 5-10 realistic sample records
- Varied content (short/long text, different statuses)
- Edge cases (empty arrays, long descriptions)
- **Use placeholder image URLs** for any image fields:
  - `https://picsum.photos/seed/[unique-id]/[width]/[height]` for general images
  - `https://images.unsplash.com/photo-[id]?w=[width]&q=80` for themed backgrounds

## Step 5: Generate types.ts

Create `product/sections/[section-id]/types.ts`:

```typescript
// Data Types
export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
}

// Component Props
export interface InvoiceListProps {
  invoices: Invoice[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onCreate?: () => void
}
```

**Rules:**
- Infer types from sample data
- Use union types for status/enum fields
- Create Props interface with data + callbacks
- Use PascalCase for interfaces, camelCase for properties

## Step 6: Confirm Completion

> "I've created:
> - `product/sections/[section-id]/data.json` — Sample data
> - `product/sections/[section-id]/types.ts` — TypeScript interfaces
> 
> **Next:** Run `/design-screen` to create the screen design."

## Notes

- Generate realistic data (not "Lorem ipsum" or "Test 123")
- Use entity names from global data model for consistency
- Callback props should cover all actions from the spec
