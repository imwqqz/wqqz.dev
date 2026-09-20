---
title: Markdown features & site guide
description: Every markdown feature available on the site, with all syntax examples shown in one place.
date: 2026-09-01
tags:
  - markdown
  - formatting
  - examples
---

This document shows every markdown feature available on the site.

- Callouts (`> [!TYPE]`), titled code frames, terminal code frames.
- Tabs, inline code, blockquotes, tables, headings, typography.

---

## 1. Callouts (admonitions)

Write a callout as a blockquote whose first line starts with a type marker. An optional custom title follows the marker on the same line.

````md
> [!SUCCESS] One in, one out
> Every new tool has to replace something. Tool collections grow entropy —
> the stack should get smaller and sharper over time, not wider.
````

**Supported types** (case-insensitive, unknown types render as a normal blockquote):

| Marker | Default title | Accent color |
| --- | --- | --- |
| `[!NOTE]` | Note | blue |
| `[!INFO]` | Info | blue |
| `[!TIP]` | Tip | green |
| `[!SUCCESS]` | Success | green |
| `[!IMPORTANT]` | Important | purple |
| `[!WARNING]` | Warning | amber |
| `[!CAUTION]` | Caution | red |

**Examples:**

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION] Cross-check before merging
> Advises about risks or negative outcomes of certain actions.

Callout bodies are real markdown, so formatting still works:

> [!TIP] Try `pnpm dlx`
> Run one-off binaries without installing them:
>
> - No global install
> - No version conflicts
> - Uses the lockfile when available

---

## 2. Titled code frames (editor tab)

Add `title="…"` to a fenced code block. A header bar with an accent tab indicator is rendered above the code.

````md
```bash title="daily-drivers.sh"
fzf        # fuzzy-find everything: files, history, branches
ripgrep    # grep, but you never wait for it
```
````

**Example:**

```bash title="daily-drivers.sh"
fzf        # fuzzy-find everything: files, history, branches
ripgrep    # grep, but you never wait for it
```

---

## 3. Terminal code frames & tabs

Add `frame="terminal"` to get a terminal-style window. Combine it with `group="…"` + `tab="…"` on consecutive blocks to group them into an interactive tab widget:

````md
```bash frame="terminal" group="package-manager" tab="pnpm"
pnpm add astro
```

```bash frame="terminal" group="package-manager" tab="npm"
npm install astro
```

```bash frame="terminal" group="package-manager" tab="bun"
bun add astro
```
````

**Example:**

```bash frame="terminal" group="package-manager" tab="pnpm"
pnpm add astro
```

```bash frame="terminal" group="package-manager" tab="npm"
npm install astro
```

```bash frame="terminal" group="package-manager" tab="bun"
bun add astro
```

**Renders as** a window with a tab bar (`pnpm` / `npm` / `bun`); each tab shows one terminal frame. The widget is built entirely server-side with hidden radio inputs — no client script required.

---

## 4. Inline code

Inline code is a muted rounded pill:

```md
Run `pnpm astro check` before committing.
```

---

## 5. Blockquotes

Plain blockquotes keep their styling: a left rule, muted text, no italics.

```md
> "Security is a process, not a product."
>
> — Bruce Schneier
```

---

## 6. Headings & body typography

The prose scale is em-based so it scales with the font size.

| Element | Style |
| --- | --- |
| Body | `line-height: 1.75` |
| `h2` | `1.5em`, margin `2em 0 1em` |
| `h3` | `1.25em`, margin `1.6em 0 .6em` |
| Links | underline, turns accent on hover |
| `strong` | `font-weight: 600` |
| Tables | bordered, `bg-muted` head, scrollable |
| `hr` | `margin: 2.5rem 0` |

## 7. Code-block chrome

Code blocks are rendered by **Expressive Code**: syntax highlighting, copy button, line-number gutter, dark panels in both themes.

> Note: code panels intentionally stay dark in light mode. The site uses a single dark syntax theme.

---

## Under the hood

Two small remark/rehype steps in `astro.config.mjs` add the tab widget on top of Expressive Code:

| Step | Role |
| --- | --- |
| `remarkCodeGroups` (remark) | Reads `group="…"` / `tab="…"` from the fence meta and inserts a group marker. |
| `rehypeCodeTabs` (rehype) | Builds the static `.ec-tabs` widget with shared-name radios. |
| `remarkCallouts` | Converts `> [!TYPE]` blockquotes into styled callout `<aside>` elements. |

## Verify

```bash
pnpm astro check   # 0 errors
pnpm astro build   # builds all pages
```