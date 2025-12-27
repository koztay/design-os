---
description: Define your product vision, key problems, and features
---

# Product Vision Workflow

You are helping the user define their product vision for Design OS. Follow these steps:

## Step 1: Gather Initial Input

Ask the user to share their raw notes, ideas, or thoughts about the product:

> "I'd love to help you define your product vision. Tell me about the product you're building - share any notes, ideas, or rough thoughts you have. What problem are you trying to solve? Who is it for? Don't worry about structure yet, just share what's on your mind."

**Wait for their response before proceeding.**

## Step 2: Ask Clarifying Questions

Based on their input, ask 3-5 targeted questions to define:

- **Product name** — A clear, concise name
- **Core description** — 1-3 sentences capturing the essence
- **Key problems** — 1-5 specific pain points
- **Solutions** — How the product solves each problem
- **Main features** — What makes this possible

Example questions:
- "What would you like to call this product?"
- "Who is the primary user?"
- "What's the single biggest pain point you're addressing?"
- "What are the 3-5 most essential features?"

Ask questions one or two at a time, conversationally.

## Step 3: Present Draft and Refine

Once you have enough information, present a draft summary:

```
Based on our discussion, here's what I'm capturing for **[Product Name]**:

**Description:**
[Draft 1-3 sentence description]

**Problems & Solutions:**
1. [Problem] → [Solution]
2. [Problem] → [Solution]

**Key Features:**
- Feature 1
- Feature 2
- Feature 3

Does this capture your vision? Would you like to adjust anything?
```

Iterate until the user is satisfied.

## Step 4: Create the File

Once approved, create the file at `product/product-overview.md` with this format:

```markdown
# [Product Name]

## Description
[The finalized 1-3 sentence description]

## Problems & Solutions

### Problem 1: [Problem Title]
[How the product solves it in 1-2 sentences]

### Problem 2: [Problem Title]
[How the product solves it in 1-2 sentences]

## Key Features
- [Feature 1]
- [Feature 2]
- [Feature 3]
```

**Important:** The `# [Product Name]` heading at the top is required for the app to parse correctly.

## Step 5: Confirm Completion

Let the user know:

> "I've created your product overview at `product/product-overview.md`. You can run `/product-roadmap` next to break this down into development sections."

## Notes

- Be conversational and helpful, not robotic
- Ask follow-up questions when answers are vague
- Help the user think through their product, don't just transcribe
- Keep the final output concise and clear
