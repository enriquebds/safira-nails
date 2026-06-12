# Design

## Theme
Light mode primary. Scene: a woman opening the site on her phone on a Tuesday afternoon, warm São Paulo light, wanting to feel like this is worth her time. The interface should feel like walking into a clean, well-lit studio that smells of polish and florals.

Dark mode exists as a system-preference option; it does not redefine the visual register.

## Color strategy
Committed. Purple is the brand anchor, not just an accent. It appears throughout — in headings, icons, buttons, borders — but it is never used as a background gradient.

```
--color-primary:       oklch(49% 0.22 292)   /* amethyst-purple, brand anchor */
--color-primary-light: oklch(66% 0.19 292)   /* hover fills, subtle tints */
--color-primary-pale:  oklch(85% 0.09 292)   /* section surfaces, icon backgrounds */
--color-primary-dark:  oklch(34% 0.22 288)   /* CTAs, deep accents */

--color-accent:        oklch(67% 0.22 354)   /* rose-pink, warmth */
--color-accent-deep:   oklch(45% 0.25 354)   /* hover on accent elements */

--color-brand-offwhite: oklch(97% 0.015 292) /* page background, purple-tinted */
--color-brand-text:     oklch(20% 0.12 290)  /* primary text */
--color-brand-muted:    oklch(40% 0.16 292)  /* secondary text */
--color-brand-surface:  oklch(93% 0.04 292)  /* card surfaces, alternate sections */
```

Neutrals are always tinted toward the brand hue (chroma 0.005–0.04). No pure black or pure white anywhere.

## Typography
Display: **Bodoni Moda** — high-contrast Italian didone serif. Carries the luxury/fashion register without Playfair Display's ubiquity. Use for h1, h2, h3, and the logo wordmark. Italic cuts add elegance in key phrases.

Script: **Great Vibes** — warm, personal. Used sparingly for brand phrases and section openers, not section headers.

Body: **Lato** — humanist sans-serif. Warm, neutral, legible at small sizes on mobile. Not a design statement on its own.

Scale: ≥1.25 ratio between heading steps. Fluid `clamp()` for h1 and h2 only. h3 and below use fixed rem.

## Elevation and surfaces
- No gradient backgrounds on sections or cards.
- No gradient text. No `background-clip: text`.
- No gradient rule bars in section titles.
- Card borders: `1px solid oklch(49% 0.22 292 / 0.10)` — single thin tinted border.
- Card shadows: fixed, not animated. No purple glow on hover.
- Hover state: `translateY(-4px)` only. No shadow changes on hover.
- Floating "floating card" badges on hero: removed. Trust signals as inline text instead.

## Radius
Buttons: full pill (rounded-full)
Cards: 16px
Large containers (booking band, drawers): 20px
Small badges/chips: 8px

## Motion
Entrance animations: stagger + fade-in+translate for above-the-fold elements. Keep existing pattern.
No bounce easing anywhere.
Drawer/panel transitions: 0.28s ease-out, not spring. Easing cubic: [0.22, 1, 0.36, 1].
Cart badge appear: gentle fade+scale (0.85 → 1.0), 0.2s ease-out.

## Absolute bans for this project
- Side-stripe border accents (border-left/right as colored accent)
- Gradient text (background-clip: text + gradient)
- Gradient backgrounds on hero, CTA band, footer
- Floating metric cards in hero (the +100/5.0 badges)
- Sparkle decoration fields around hero content
- Icon-in-rounded-square container above every card heading
- Purple glow box-shadow on hover (rgba(155,63,200,…))
- Playfair Display or DM Sans fonts
