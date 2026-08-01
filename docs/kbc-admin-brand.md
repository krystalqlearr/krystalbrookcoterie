# KBC Admin — Brand Rules (the studio's back office)

> The marketing site **performs** the brand (it sells — atmosphere, monumental type,
> slow luxury). The admin **inhabits** it (a tool used for hours — clarity, density,
> speed, calm). Same taste, different job: *editorial showpiece → quiet, precise
> instrument.* Reference tools that get this right: Linear, the Vercel dashboard,
> Notion, Things. Keep the palette, the typeface, the sharp restraint, and the
> "in expert hands" calm — swap monumental for legible, slow for fast, atmospheric
> for functional.

## Palette

Warm neutrals (bone is easier on the eyes for all-day work than stark white — an
on-brand advantage), but a data tool needs elevation levels and status colors the
marketing palette deliberately lacks. Neutrals are warm-biased, never a dead grey.

### Light theme (bone)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#EBE5D8` | app background (bone) |
| `raised` | `#F2EEE4` | cards, panels, table surface (a step *up* from bone) |
| `sunken` | `#E0D8C7` | secondary surface, row hover, inset (stone) |
| `line` | `rgba(35,32,27,0.12)` | hairline borders / dividers (ink @ 12%) |
| `ink` | `#23201B` | primary text |
| `ink-muted` | `rgba(35,32,27,0.62)` | secondary text, labels |
| `accent` | `#B08A57` | interactive/active/selection — a darker camel that passes AA |
| `accent-soft` | `rgba(198,169,138,0.18)` | selected row / active-nav fill (camel wash) |

### Dark theme (charcoal — the site's "punctuation" becomes a full theme)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#1C1915` | app background |
| `raised` | `#26221C` | cards, panels |
| `sunken` | `#211E18` | row hover, inset |
| `line` | `rgba(235,229,216,0.14)` | hairlines |
| `ink` | `#EBE5D8` | primary text (bone) |
| `ink-muted` | `rgba(235,229,216,0.60)` | secondary text |
| `accent` | `#C6A98A` | camel works at full strength on charcoal |
| `accent-soft` | `rgba(198,169,138,0.16)` | selection / active fill |

### Status (muted — desaturated so they never break the luxury feel; separate from the accent)
| Token | Light hex | Meaning |
|---|---|---|
| `ok` | `#6E7B5A` (sage) | won / success / live |
| `warn` | `#B08A3E` (amber) | pending / in review / due |
| `crit` | `#A6553D` (clay) | passed / error / overdue |
| `neutral` | `ink-muted` | proposal sent / informational |

**Rules:** primary action stays **ink-filled / bone text** (the strongest tie-back to
the site's buttons). Camel finally gets a real job here — accent, active nav, selected
row — but never as small text on bone (use the darker `accent` value for text/icons).
Status color is always paired with a label or icon, never color alone.

## Typography

The monumental UPPERCASE caps are a marketing device — slow and shouty in a UI.
- **UI face — Neue Montreal, Regular/Medium, sentence case, 13–15px** carries the
  whole interface (a clean grotesque, ideal for UI). Reserve **UPPERCASE + 0.14em
  tracking** only for tiny section labels, table headers, and status pills.
- **Editorial New Italic — a grace note only:** greetings, empty states, a section
  intro. Never on functional labels or data.
- **Tabular numbers everywhere digits align** (`font-variant-numeric: tabular-nums`)
  — tables, metrics, money, timestamps. A mono (`ui-monospace`) for raw IDs.
- **Functional scale:** 11 (label) · 13 (body/UI) · 14 · 16 · 20 · 24 (page title).
  Tighter line-heights than the site.

## Density, radius, motion
- **Denser but calm:** left sidebar nav (KBC monogram up top) + content area on an
  8px spacing grid. Generous-but-not-wasteful whitespace; retain left-aligned,
  asymmetric-orderly composition.
- **Sharp corners:** 2–4px on inputs/cards/pills (crisp, not pill-y) — matches the
  site's `rounded-[1px]`.
- **Flat, editorial elevation:** borders + a surface step, soft/no drop shadows.
  Avoid heavy Material shadows.
- **Motion flips to fast:** 120–200ms, same easing family
  `cubic-bezier(0.16,1,0.3,1)` but snappy. **No smooth-scroll, no scroll reveals, no
  atmospheric drift.** Micro-interactions only (hover, focus, toast, row select).
  Respect `prefers-reduced-motion`.

## Components
- **Buttons:** primary = ink fill / bone text · secondary = ink outline · destructive
  = clay outline/fill · tertiary = ghost text. 3px radius.
- **Inputs:** the site's `EnquiryForm` pattern is the starting point — `raised`/stone
  fill, `line` border, ink text, accent focus ring (2px).
- **Cards/panels:** `raised` surface + `line` border; flat elevation.
- **Tables:** hairline dividers, tabular figures, hover = `sunken`, selected =
  `accent-soft`, generous rows, uppercase tracked headers.
- **Status pills:** small tracked-caps labels — NEW, IN REVIEW, PROPOSAL SENT, WON,
  PASSED — in muted status colors, with a dot.
- **Nav:** left sidebar, ink text, active item = `accent-soft` fill + accent left
  tick; KBC monogram at top.
- **Focus:** always visible — accent ring on both themes.

## Drop entirely (they belong to the marketing site, not a tool)
Mix-blend inversion cursor · giant vertical section markers · the work-transition
theatrics · monumental headlines · heavy grain. (A whisper of paper texture on empty
states is fine; keep it crisp.)

## Accessibility
WCAG AA minimum — even more critical in an all-day tool. Every text/surface pair ≥
4.5:1; status never conveyed by color alone; visible keyboard focus; both themes
carry equal care.

---

## Build-ready tokens (Tailwind + CSS variables)

Semantic tokens via CSS variables so light/dark is a single class flip. Channel
(`R G B`) values enable Tailwind's opacity utilities (`bg-raised/60`).

```css
/* globals.css */
:root {
  --canvas: 235 229 216;  --raised: 242 238 228;  --sunken: 224 216 199;
  --ink: 35 32 27;        --ink-muted: 108 101 90; --line: 35 32 27; /* used @ /12 */
  --accent: 176 138 87;   --accent-soft: 198 169 138;
  --ok: 110 123 90;       --warn: 176 138 62;      --crit: 166 85 61;
}
:root.dark {
  --canvas: 28 25 21;     --raised: 38 34 28;      --sunken: 33 30 24;
  --ink: 235 229 216;     --ink-muted: 150 143 130;--line: 235 229 216;
  --accent: 198 169 138;  --accent-soft: 198 169 138;
  --ok: 138 150 112;      --warn: 198 163 96;      --crit: 194 116 92;
}
```

```ts
// tailwind.config.ts — theme.extend
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;
export default {
  darkMode: "class",
  theme: { extend: {
    colors: {
      canvas: c("--canvas"), raised: c("--raised"), sunken: c("--sunken"),
      ink: c("--ink"), "ink-muted": c("--ink-muted"), line: c("--line"),
      accent: c("--accent"), "accent-soft": c("--accent-soft"),
      ok: c("--ok"), warn: c("--warn"), crit: c("--crit"),
    },
    borderRadius: { DEFAULT: "3px", sm: "2px", md: "4px" },
    fontFamily: {
      sans: ["var(--font-sans)"],       // Neue Montreal
      editorial: ["var(--font-editorial)"], // Editorial New italic — grace note
      mono: ["ui-monospace", "SFMono-Regular", "monospace"],
    },
    transitionTimingFunction: { editorial: "cubic-bezier(0.16,1,0.3,1)" },
  }},
} satisfies import("tailwindcss").Config;
```

Usage: `bg-canvas text-ink`, cards `bg-raised border border-line`, selected row
`bg-accent-soft/20`, primary button `bg-ink text-canvas`, status dot
`bg-ok`/`bg-warn`/`bg-crit`. Flip the whole app by toggling `.dark` on `<html>`.
