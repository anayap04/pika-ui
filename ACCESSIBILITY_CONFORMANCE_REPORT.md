# Accessibility Conformance Report

**Product:** Pika UI (`@anayap04/pika-ui`) — React component library
**Report date:** 2026-09-16
**Report version:** 1.0
**Evaluated release:** v0.1.2, commit [`a77ffdc`](https://github.com/anayap04/pika-ui/commit/a77ffdc)
**Contact:** Paola Anaya

This report follows the structure of the [ITI Voluntary Product Accessibility
Template (VPAT®) 2.5 — WCAG Edition](https://www.itic.org/policy/accessibility/vpat),
scoped to WCAG 2.2. It is not a certified VPAT filing — it is a self-assessment
produced for this project.

## Scope

Pika UI ships **components**, not pages or applications. Several WCAG success
criteria apply to a full document or site (page titles, navigation consistency
across pages, language of page, bypass blocks) rather than to an individual
component; those are marked **Not Applicable — host application
responsibility** below, with a note on what the library does provide toward
each.

This report covers every shipped atom, molecule and organism as of the
evaluated commit: `Button`, `Card`, `Input`, `Typography` (`Heading` /
`Paragraph` / `Text`), `Badge`, `Checkbox`, `Radio`, `Toggle`, `Tags`,
`FormField`, `RadioGroup`, `CheckboxGroup`, `ButtonGroup`, `CardSection`,
`EventHero`, `CountdownPanel`, `VotePanel`, `ResultsPanel`,
`ConfirmationPanel`, `QRBlock`.

## Evaluation methods used

| Method | Tooling | Coverage |
| --- | --- | --- |
| Automated, structural | [`@sa11y/vitest`](https://www.npmjs.com/package/@sa11y/vitest) (wraps **axe-core 4.11.1**, Deque Systems) under jsdom | Roles, accessible names, label associations, ARIA wiring — every component, 20 assertions. [`src/test/a11y.test.tsx`](src/test/a11y.test.tsx) |
| Automated, visual + contrast | [`@storybook/addon-a11y`](https://storybook.js.org/addons/@storybook/addon-a11y) (same **axe-core 4.11.1** engine) in a real Chromium browser via `@storybook/addon-vitest` | Full WCAG 2.2 A/AA/AAA rule tags plus `color-contrast-enhanced` (7:1) — all 232 stories, both themes |
| Manual code review | — | Keyboard operability, focus management, label/name computation, reflow/min-width patterns, heading-level API, live-region wiring |
| Manual verification | Playwright, real Tab-key navigation | Confirmed visible focus rings render on the correct element for `Button`, `Input`, `Checkbox`, `Radio`, `Toggle` |
| Manual contrast calculation | WCAG relative-luminance formula, computed styles pulled from a live render | Verified 9 cases axe-core flagged as *incomplete* (glyph rendering / text-shadow limitations it cannot resolve automatically) |
| Live assistive technology | — | **Not performed.** VoiceOver/NVDA testing of interaction flows (e.g. `VotePanel` → `ConfirmationPanel`) is recommended as a follow-up; automated tooling verifies structure, not whether an announcement sequence reads sensibly to a listener |

CI enforces the first two rows on every push (`test: 'error'` in
[`.storybook/preview.ts`](.storybook/preview.ts); `npm run test:all` — see
[README § Testing](README.md#testing)). As of this report: **499/499 tests
passing, 0 open axe-core violations.**

## Terms used

| Term | Meaning |
| --- | --- |
| **Supports** | The component fully meets the criterion. |
| **Partially Supports** | Some functionality meets the criterion; a caveat is noted. |
| **Not Applicable** | The criterion does not apply to a component library (page/site-level), or the library ships no component of the relevant type. |
| **Not Evaluated** | Not covered by the methods above; no claim is made either way. |

---

## WCAG 2.2 Level A

| Criterion | Conformance | Remarks |
| --- | --- | --- |
| 1.1.1 Non-text Content | Supports | Decorative glyphs (`Tag` icon, `VotePanel` diamond) are `aria-hidden`; `QRBlock`'s placeholder graphic carries a computed `alt` describing the destination. |
| 1.3.1 Info and Relationships | Supports | `FormField` wires `label`/`hint`/`error` via `htmlFor` + `aria-describedby`; `RadioGroup`/`CheckboxGroup` use `<fieldset>`. A duplicate-`<label>` defect in `Toggle` and in `FormField` + self-labeling children was found by axe-core and fixed this cycle. |
| 1.3.2 Meaningful Sequence | Supports | DOM order matches visual order throughout; no CSS-driven reordering that would separate them. |
| 1.3.3 Sensory Characteristics | Supports | No instruction depends on shape, position or sound alone. |
| 1.4.1 Use of Color | Supports | Checked/selected states pair color with a shape or position change (checkmark, radio dot, toggle-thumb position), never color alone. `CountdownPanel`'s urgency border color is supplementary — the numeric value itself is always readable regardless of color. |
| 1.4.2 Audio Control | Not Applicable | No component plays audio. |
| 2.1.1 Keyboard | Supports | All interactive components are native `<button>`/`<input>`/`<label>` elements; no custom keyboard-only traps. Inline `outline: none` on `Button`, `Input`, `Checkbox`, `Radio` was defeating the global focus-visible ring — **fixed this cycle**. |
| 2.1.2 No Keyboard Trap | Supports | No modal/dialog or custom focus-trap component is currently shipped. |
| 2.1.4 Character Key Shortcuts | Not Applicable | No single-character keyboard shortcuts are implemented. |
| 2.2.1 Timing Adjustable | Not Applicable | `CountdownPanel` displays a countdown but does not itself impose an interaction deadline or lock content when it reaches zero — timing behavior is entirely up to the consuming application. |
| 2.2.2 Pause, Stop, Hide | Supports | Global `@media (prefers-reduced-motion: reduce)` rule in [`base.css`](src/tokens/base.css) clamps all animation/transition durations to near-zero. |
| 2.3.1 Three Flashes or Below Threshold | Supports | No flashing content. |
| 2.4.1 Bypass Blocks | Not Applicable — host application responsibility | Page-level navigation and landmark structure are the consuming application's responsibility. |
| 2.4.2 Page Titled | Not Applicable — host application responsibility | No component sets `<title>`. |
| 2.4.3 Focus Order | Supports | No positive `tabindex` values in the codebase; the one `tabindex="-1"` (`ConfirmationPanel`'s status heading) is a deliberate programmatic-focus target, not part of the tab sequence. |
| 2.4.4 Link Purpose (In Context) | Not Applicable | No link-role component is currently shipped. |
| 2.5.1 Pointer Gestures | Not Applicable | No multipoint or path-based gesture interactions. |
| 2.5.2 Pointer Cancellation | Supports | Interactions use standard `onClick` (fires on the up-event), not `pointerdown`/`mousedown`. |
| 2.5.3 Label in Name | Supports | `Toggle`'s `aria-label` matches its visible text exactly; `VotePanel`'s pending-state `aria-label` ("Saving vote for X") contains its visible text ("SAVING") as a substring. |
| 2.5.4 Motion Actuation | Not Applicable | No motion-triggered controls. |
| 3.1.1 Language of Page | Not Applicable — host application responsibility | Set on the consuming application's `<html>` element. |
| 3.2.1 On Focus | Supports | No component triggers a context change purely on receiving focus. |
| 3.2.2 On Input | Supports | `onChange` handlers update local/controlled state only; no unrequested navigation or context change. |
| 3.3.1 Error Identification | Supports | `FormField`'s `error` prop renders `role="alert"` text and sets `aria-invalid` + `aria-describedby` on the control. |
| 3.3.2 Labels or Instructions | Supports | `FormField` requires a `label`; `CountdownPanel`'s doc comment recommends always pairing the relative countdown with an absolute `caption` for a visitor who arrives late. |
| 4.1.2 Name, Role, Value | Supports | Two duplicate-label defects (`Toggle`; `FormField` + `Checkbox`/`Radio`) found by axe-core's `form-field-multiple-labels` rule (18 flagged instances) — **fixed this cycle**, 0 remaining. |

*(4.1.1 Parsing is omitted — formally removed in WCAG 2.2.)*

## WCAG 2.2 Level AA

| Criterion | Conformance | Remarks |
| --- | --- | --- |
| 1.2.4 / 1.2.5 Captions / Audio Description (Live & Prerecorded) | Not Applicable | No time-based media. |
| 1.3.4 Orientation | Supports | No component locks or depends on a specific screen orientation. |
| 1.3.5 Identify Input Purpose | Supports | `Input` spreads native `InputHTMLAttributes`, so a consuming app can set `autoComplete` per field; the library imposes no restriction. |
| 1.4.3 Contrast (Minimum) | Supports | Exceeded — see AAA section below. |
| 1.4.4 Resize Text | Partially Supports | Full-page zoom to 200% works cleanly (flex-wrap layouts, no clipping found in review). Font sizes are declared in fixed `px` rather than relative units, so a "text-only" resize setting independent of page zoom (rare in current browsers, but present in Firefox) will not scale component text. Not verified live. |
| 1.4.5 Images of Text | Supports | No component renders text as an image; `QRBlock`'s graphic is a non-text placeholder pattern with a descriptive `alt`. |
| 1.4.10 Reflow | Supports | Reviewed for hard-coded widths that would force 2D scrolling at 320px; layouts use `flex-wrap` and `minWidth: 0` on shrinkable containers (`VotePanel`, `CountdownPanel`, `ButtonGroup`, `EventHero`). No blocking min-widths found. |
| 1.4.11 Non-text Contrast | Supports | Borders, switch tracks and focus rings are verified ≥3:1 in both themes ([`colors.css`](src/tokens/colors.css), [`index.ts`](src/tokens/index.ts) inline remarks). |
| 1.4.12 Text Spacing | Not Evaluated | No automated coverage for user-stylesheet text-spacing overrides; not manually verified live. |
| 1.4.13 Content on Hover or Focus | Not Applicable | No component currently ships a hover- or focus-triggered popover/tooltip. |
| 2.4.5 Multiple Ways | Not Applicable — host application responsibility | Site-level navigation concern. |
| 2.4.6 Headings and Labels | Supports | `Heading` requires an explicit `level` prop (no silent default that could skip a level); `FormField` requires `label`. |
| 2.4.7 Focus Visible | Supports | `Button`, `Input`, `Checkbox`, `Radio`, `ConfirmationPanel`'s status heading, and `Toggle` (whose real `<input>` is visually 0×0) all had focus-ring defects — **fixed this cycle**, verified with real Tab-key navigation in Playwright. |
| 2.5.7 Dragging Movements | Not Applicable | No drag interactions. |
| 2.5.8 Target Size (Minimum) | Supports | Global 44×44px minimum enforced in [`base.css`](src/tokens/base.css) and per-component size tokens — exceeds the 24px spec minimum. |
| 3.1.2 Language of Parts | Not Applicable — host application responsibility | No multi-language content in any component. |
| 3.2.3 Consistent Navigation | Not Applicable | No navigation components. |
| 3.2.4 Consistent Identification | Supports | Same interaction pattern is used consistently for the same function across the system (e.g. every removable chip uses the same `×` affordance and `aria-label` phrasing). |
| 3.3.3 Error Suggestion | Supports | `FormField`'s `error` is free text, letting the consumer supply a corrective suggestion; the library provides the wiring, not the copy. |
| 3.3.4 Error Prevention (Legal, Financial, Data) | Not Applicable | No such transactions occur in a component library. |
| 4.1.3 Status Messages | Supports | `ConfirmationPanel` uses `role="status"`/`"alert"` *and* shifts programmatic focus to a heading (avoids the classic bug where a live region populated on insertion is never announced); `ResultsPanel` uses a debounced `aria-live="polite"` region (at most once per 5s); `CountdownPanel` keeps `aria-live="off"` while ticking and flips to `"polite"` only at expiry, avoiding per-second announcement spam. |

---

## WCAG 2.2 Level AAA (voluntary commitments)

Pika UI does not claim full AAA conformance, but commits to and verifies the
following AAA criteria as a deliberate design-system standard:

| Criterion | Conformance | Remarks |
| --- | --- | --- |
| 1.4.6 Contrast (Enhanced) | Supports | Every text/background pairing in both themes is verified ≥7:1 (body) / ≥4.5:1 (large text) via axe-core's `color-contrast-enhanced` rule, CI-blocking on regression. Source values and ratios are documented inline in [`colors.css`](src/tokens/colors.css) and [`index.ts`](src/tokens/index.ts). |

---

## Known gaps

1. **Live assistive-technology testing has not been performed.** Automated
   axe-core coverage verifies structure (roles, names, contrast, label
   relationships) but cannot judge whether an announcement sequence makes
   sense to a listener. A VoiceOver or NVDA pass over `VotePanel` →
   `ConfirmationPanel` and the `Toggle`/`FormField` compositions is the
   recommended next step.
2. **1.4.4 Resize Text** and **1.4.12 Text Spacing** are not fully verified
   (see remarks above) — fixed-`px` font sizing and no live user-stylesheet
   testing.
3. Several Level A/AA criteria are marked **Not Applicable — host application
   responsibility** (page title, language of page, bypass blocks, navigation
   consistency). A consuming application must still satisfy these at the page
   level; Pika UI's components do not block or hinder that.

## Feedback

Issues or corrections to this report: open an issue at
[github.com/anayap04/pika-ui/issues](https://github.com/anayap04/pika-ui/issues).
