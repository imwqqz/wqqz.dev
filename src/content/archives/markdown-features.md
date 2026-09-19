---
title: Markdown features & migration guide
description: Every markdown feature available on this site, with new and old examples shown side by side.
date: 2026-09-16
tags:
  - markdown
  - formatting
  - examples
---

This document shows every markdown feature available on the site, with **new** and **old** examples side by side.

The new rendering style is modelled after the reference article. It is implemented entirely at build time by three Astro/remark/rehype plugins, so **no MDX is required** and `.md` content keeps working.

- New features: callouts (`> [!TYPE]`), titled code frames, terminal code frames.
- Changed: inline code, blockquotes, heading/body typography, code-block chrome.
- Removed: the uppercase language badge, dead line-number styling.

---

## 1. Callouts (admonitions)

### New

Write a callout as a blockquote whose first line starts with a type marker. An optional custom title follows the marker on the same line.

````md
> [!SUCCESS] One in, one out
> Every new tool has to replace something. Tool collections grow entropy —
> the stack should get smaller and sharper over time, not wider.
````

**Renders as** (roughly):

> One in, one out
>
> Every new tool has to replace something. Tool collections grow entropy — the stack should get smaller and sharper over time, not wider.

Simplified HTML:

```html
<aside class="prose-callout prose-callout-success">
  <p class="callout-title">One in, one out</p>
  <p>Every new tool has to replace something. …</p>
</aside>
```

#### Supported types

The marker is case-insensitive. Unknown types are left untouched as a normal blockquote.

| Marker | Default title | Accent color |
| --- | --- | --- |
| `[!NOTE]` | Note | blue `oklch(62% 0.19 259)` |
| `[!INFO]` | Info | blue `oklch(62% 0.19 259)` |
| `[!TIP]` | Tip | green `var(--success)` |
| `[!SUCCESS]` | Success | green `var(--success)` |
| `[!IMPORTANT]` | Important | purple `oklch(60% 0.22 300)` |
| `[!WARNING]` | Warning | amber `oklch(0.77 0.16 70)` |
| `[!CAUTION]` | Caution | red `oklch(63% 0.24 25)` |

#### Examples

Default title (no custom title):

````md
> [!NOTE]
> Useful information that users should know, even when skimming content.
````

````md
> [!TIP]
> Helpful advice for doing things better or more easily.
````

````md
> [!IMPORTANT]
> Key information users need to know to achieve their goal.
````

````md
> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.
````

````md
> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
````

Custom amber callout (used for "gotcha" asides):

````md
> [!WARNING] The one that got cut
> I dropped my custom git aliases collection. Muscle memory for 40 aliases is
> a tax you pay on every machine you touch. I kept six.
````

Callout bodies are real markdown, so formatting still works:

````md
> [!TIP] Try `pnpm dlx`
> Run one-off binaries without installing them:
>
> - No global install
> - No version conflicts
> - Uses the lockfile when available
````

### Old

Before this change there was **no callout plugin**. `> [!NOTE]` rendered as an ordinary blockquote and the marker was shown as literal text:

```
> [!NOTE]
> Useful information that users should know.
```

…rendered as a plain bar with the text `[!NOTE] Useful information…`.

The stylesheet contained `.prose blockquote.admonition …` rules, but nothing in the build produced those classes, so they were dead CSS. That CSS has been removed.

### Migration

| Old | New |
| --- | --- |
| `**One in, one out**` as a standalone paragraph | `> [!SUCCESS] One in, one out` |
| `### The one that got cut` heading | `> [!WARNING] The one that got cut` |
| `> [!NOTE]` (rendered literally) | `> [!NOTE]` (renders as a callout) |

> Adding a heading-only section was the old way to call something out; the new callouts are lighter and no longer add entries to the "On this page" table of contents.

---

## 2. Titled code frames (editor tab)

### New

Add `title="…"` to a fenced code block. A header bar with an accent tab indicator is rendered above the code.

````md
```bash title="daily-drivers.sh"
fzf        # fuzzy-find everything: files, history, branches
ripgrep    # grep, but you never wait for it
```
````

Other examples:

````md
```json title=".vscode/settings.json"
{
  "editor.formatOnSave": true
}
```
````

````md
```make title="justfile"
dev:
    pnpm astro dev
```
````

**Renders as** an editor frame whose header shows the title as an active tab (rendered by the Expressive Code integration):

```html
<div class="expressive-code">
  <style>…</style>
  <figure class="frame has-title">
    <figcaption class="header">
      <span class="title">daily-drivers.sh</span>
    </figcaption>
    <pre><code>…</code></pre>
  </figure>
</div>
```

### Old

The title was faked with a bold paragraph placed just above the block:

````md
**daily-drivers.sh**

```bash
fzf        # fuzzy-find everything: files, history, branches
```
````

This produced a bare paragraph with no visual connection to the code block.

### Migration

Remove the bold caption line and move its text into `title="…"`:

| Old | New |
| --- | --- |
| `**daily-drivers.sh**` + ```` ```bash ```` | ```` ```bash title="daily-drivers.sh" ```` |
| `**.vscode/settings.json**` + ```` ```json ```` | ```` ```json title=".vscode/settings.json" ```` |
| `**justfile**` + ```` ```makefile ```` | ```` ```make title="justfile" ```` |

---

## 3. Terminal code frames & tabs

### New

Add `frame="terminal"` to get a terminal-style window: a bar with three dots on the left. Combine it with `title="…"` to label a single variant, or use `group="…"` + `tab="…"` on consecutive blocks to group them into an interactive tab widget (see Under the hood):

````md
```bash frame="terminal" group="package-manager" tab="pnpm"
pnpm add astro
pnpm dlx create-astro@latest
```

```bash frame="terminal" group="package-manager" tab="npm"
npm install astro
npx create-astro@latest
```

```bash frame="terminal" group="package-manager" tab="bun"
bun add astro
bunx create-astro@latest
```
````

**Renders as** a window with a tab bar (`pnpm` / `npm` / `bun`); each tab shows one terminal frame. The widget is built entirely server-side (no client script) and switches panels with hidden radio inputs, so clicking a tab or using the arrow keys to change the radio selection works out of the box.

Omitting `title` is allowed; you still get the terminal bar with the dots.

### Old

Interactive tabs were used for the package-manager variants. Because content is `.md`-only (no MDX components), tabs were not available, so the fallback was a bold label plus a plain code block:

````md
**Terminal window (pnpm)**

```bash
pnpm add astro
pnpm dlx create-astro@latest
```
````

### Migration

| Old | New |
| --- | --- |
| `**Terminal window (pnpm)**` + ```` ```bash ```` | ```` ```bash frame="terminal" group="package-manager" tab="pnpm" ```` |
| `**Terminal window (npm)**` + ```` ```bash ```` | ```` ```bash frame="terminal" group="package-manager" tab="npm" ```` |
| `**Terminal window (bun)**` + ```` ```bash ```` | ```` ```bash frame="terminal" group="package-manager" tab="bun" ```` |

---

## 4. Inline code

### New

Inline code is a muted rounded pill, and no quote characters are added around it.

```md
Run `pnpm astro check` before committing.
```

### Old

The previous stylesheet wrapped inline code in literal backticks via generated content, so `` `value` `` rendered with extra accent backticks around the pill.

### Migration

No syntax change — the source is identical. Only the rendering changed (decorative backticks removed to match the reference).

---

## 5. Blockquotes

### New

Plain blockquotes keep their styling: a `0.25rem` left rule, muted text, no italics.

```md
> “Security is a process, not a product.”
>
> — Bruce Schneier
```

### Old

Plain blockquotes used a `3px` left border and *italic* text.

### Migration

No syntax change.

---

## 6. Headings & body typography

The prose scale now mirrors the reference (em-based sizing and spacing) instead of fixed Tailwind sizes.

| Element | Old | New |
| --- | --- | --- |
| Body | `leading-relaxed`, text `foreground/90` | `line-height: 1.75`, `foreground` |
| `h2` | `text-2xl sm:text-3xl`, `mt-10 mb-4` | `1.5em`, `margin: 2em 0 1em` |
| `h3` | `text-xl sm:text-2xl` | `1.25em`, `margin: 1.6em 0 .6em` |
| Links | accent-colored decoration | `foreground`, underline with muted decoration that turns accent on hover |
| `strong` | inherited | `font-weight: 600` |
| Tables | bordered, `bg-muted/40` head | bordered, `bg-muted` head, scrollable |
| `hr` | `my-8` | `margin: 2.5rem 0` |

No markdown syntax changed here — it only affects how existing headings, links, and tables are dressed.

---

## 7. Code-block chrome changes

Code blocks are now rendered by **Expressive Code** (`rehype-expressive-code`, wired into the `unified()` markdown processor) instead of the previous custom Shiki transformer + rehype plugin.

| Feature | Old | New |
| --- | --- | --- |
| Language badge | Uppercase language label pinned to the top-right of every block | **Removed** |
| Copy button | Injected on page load, shown on hover | Expressive Code's built-in button (hover to reveal, shows a "Copied" tooltip) |
| Line numbers | CSS existed for `.code-line`, but Astro/Shiki never emitted that class — effectively unused | Expressive Code gutter, disabled by default (`showLineNumbers: false`) |
| Code panel color | Dark panel via the Shiki theme; forced to `--code-bg` only in dark mode | Dark panel via `--code-panel-bg` in **both** themes (set through `styleOverrides`) so the github-dark tokens stay readable |
| Classes used | `.astro-code` / `.code-frame` / `.has-title` / `.is-terminal` | `.expressive-code` / `.frame` / `.has-title` / `.is-terminal` |

> Code panels intentionally stay dark in light mode. The site uses a single dark syntax theme, so a light panel would make the token colors unreadable.

---

## Quick reference: old → new

| Goal | Old syntax | New syntax |
| --- | --- | --- |
| Callout | `**Title**` paragraph or `### Title` | `> [!TYPE] Title` |
| Titled code block | `**file.sh**` above the fence | ```` ```bash title="file.sh" ```` |
| Terminal code block | `**Terminal window (pnpm)**` above the fence | ```` ```bash frame="terminal" group="package-manager" tab="pnpm" ```` |
| Inline code | `` `code` `` (rendered with backticks) | `` `code` `` (rendered as a pill) |
| Blockquote | `> quote` (italic) | `> quote` (non-italic) |

---

## Under the hood

Expressive Code renders every fenced code block (`title="…"` frames, `frame="terminal"`, syntax highlighting, copy buttons). Two small remark/rehype steps in `astro.config.mjs` add the tab widget on top, with no Expressive Code plugin and no client script:

| Step | Role |
| --- | --- |
| `remarkCodeGroups` (remark, before the code blocks render) | Reads `group="…"` / `tab="…"` from the fence meta and inserts an `.ec-tabs` marker before each run of consecutive blocks that share a group. |
| `rehypeCodeTabs` (rehype, after Expressive Code) | Collects the rendered `.frame` siblings following each marker and builds a static `.ec-tabs` widget: hidden shared-name radios, a tab bar of labels, and the panels. |
| `remarkCallouts` (`src/plugins/remark-callouts.ts`) | Converts `> [!TYPE] Optional title` blockquotes into `<aside class="prose-callout prose-callout-*">`. |

Relevant styles:

- `../styles/global.css` — Expressive Code `styleOverrides` wiring (in `astro.config.mjs`) plus the `.ec-tabs` widget styles (including the `:checked ~` rules that switch panels).
- `../styles/archives.css` — prose typography and `.prose-callout` colors.

## Verify

```bash
pnpm astro check   # 0 errors
pnpm build         # 21 pages
```
