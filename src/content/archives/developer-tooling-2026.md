---
title: My developer tooling stack for 2026
description: The editors, terminals, CLI tools, and workflow glue I actually use daily — with honest notes on what earned its place and what got cut.
date: 2026-07-15
tags:
  - tooling
  - typescript
  - workflow
---

Tool posts age badly, so here's the honest version: this is what survived a year of real work, and what didn't. This post is plain markdown — where the original uses interactive tabs, each package manager variant is shown in its own tab.

## The rules

> [!SUCCESS] One in, one out
> Every new tool has to replace something. Tool collections grow entropy — the stack should get smaller and sharper over time, not wider.
i
Three questions before anything gets installed:

1. Does it remove a step from something I do daily?
2. Will it still work if the company behind it disappears?
3. Can I configure it in a file that lives in a dotfiles repo?

## Package manager

Still pnpm. The strictness that makes it occasionally annoying is exactly what makes monorepos survivable:

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

## The CLI layer

The unglamorous winners, in order of keystrokes saved:

```bash title="daily-drivers.sh"
fzf        # fuzzy-find everything: files, history, branches
ripgrep    # grep, but you never wait for it
fd         # find with defaults that make sense
jq         # JSON surgery in pipelines
just       # make, minus the tab-based footguns
direnv     # per-project env vars that load themselves
```

> [!WARNING] The one that got cut
> I dropped my custom git aliases collection. Muscle memory for 40 aliases is a tax you pay on every machine you touch. I kept six.

## Editor

VS Code with fewer than ten extensions. The controversial part of the config:

```json title=".vscode/settings.json"
{
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "editor.inlineSuggest.enabled": true,
  "workbench.activityBar.location": "hidden",
  "files.autoSave": "onFocusChange"
}
```

Hiding the activity bar sounds extreme until you realize every panel has a keybinding and your eyes stop drifting left.

## What ties it together

A `justfile` in every repo, so that muscle memory transfers between projects:

```make title="justfile"
dev:
    pnpm astro dev

check:
    pnpm astro check && pnpm eslint .

ship: check
    pnpm astro build && wrangler pages deploy dist
```

`just dev`, `just check`, `just ship` — same three commands in every project I own, regardless of what's underneath.

## The honest summary

The stack is boring on purpose. Every exciting tool I adopted in the last five years either became boring (good) or got deleted (also good). Optimize for the tools you'll still be using when the trend cycle moves on.
