---
title: Markdown Guide
description: A comprehensive, living example of Markdown features supported in this site.
date: 2032-01-15
tags:
  - markdown
  - formatting
  - examples
---

This page demonstrates the Markdown features and site-specific styling. Use it as a reference when writing content.

## Headings

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

This is a paragraph with inline elements: emphasis with _italics_, strong with **bold**, inline `code`, and a [link](https://example.com).

## Images

Example:

![Alt text](/placeholder.svg)

## Blockquotes

### Without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> You can use _Markdown syntax_ within a blockquote.

### With attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: Excerpted from Rob Pike's talk during Gopherfest, November 18, 2015.

## Tables

| Column | Italics   | Bold     | Code   |
| ------ | --------- | -------- | ------ |
| A      | _italics_ | **bold** | `code` |

## Code Blocks

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

```bash
echo "Hello, world"
```

```javascript
export function greet(name) {
  return `Hello, ${name}!`
}
console.log(greet('world'))
```

```astro
---
import { SITE_TITLE } from '../consts';
---
<section>
  <h1>{SITE_TITLE}</h1>
  <p>Astro component example.</p>
</section>
```

## List Types

### Ordered

1. First item
2. Second item
3. Third item

### Unordered

- List item
- Another item
- And another item

### Nested

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal.

## Math

Inline math: $E = mc^2$.

Block math:

$$
\int_{0}^{\pi} \sin(x)\,dx = 2
$$

## Blockquote Examples

> Example quote: “Security is a process, not a product.”
>
> — Bruce Schneier

> “The quieter you become, the more you are able to hear.”

## Admonitions with blockquote syntax

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

