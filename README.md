# Pika UI

**A retro arcade design system — 8-bit looks, WCAG 2.2 AAA manners.**

Pika UI is the React component library behind the *Gender Reveal Voting App*. It
takes the warmth of an old arcade cabinet — hard 4px borders, a pink-and-gold
palette, `Press Start 2P` / `VT323` lettering, zero border-radius — and holds
every one of those choices to the **AAA level of WCAG 2.2**: 7:1 text contrast,
3px focus rings, 44px tap targets and full reduced-motion support.

---

## Project health

| Area | Status | Notes |
| --- | --- | --- |
| **Build** | ✅ passing | `npm run build` (tsc project refs + Vite 7) and `npm run build-storybook` both clean |
| **Types** | ✅ passing | `tsc -b`, strict, no errors |
| **Lint** | ✅ passing | flat ESLint config (`@eslint/js`, `typescript-eslint`, React Hooks, Storybook) — 0 warnings |
| **Tests** | ✅ 161 / 161 | story smoke tests via `@storybook/addon-vitest` in a real browser (Vitest 4 + Playwright Chromium) |
| **Accessibility** | 🎯 AAA, both themes | `@storybook/addon-a11y` runs the full WCAG 2.2 rule set **plus** axe `color-contrast-enhanced` (AAA 7:1); every text pairing verified ≥7:1 in light **and** dark; reported per-story, not yet CI-blocking (`a11y.test: 'todo'`) |
| **Theming** | ✅ light + dark | `src/styles/theme.css` drives `--pk-*` custom properties; components read them via `theme` in `src/tokens`. Switches on `[data-theme]`, `.dark`, or `prefers-color-scheme`. Storybook has a **Theme** toolbar toggle |
| **Visual regression** | ✅ wired | Chromatic project configured (`npm run chromatic`) |
| **Coverage** | ➖ none tracked | `@vitest/coverage-v8` installed but no threshold/report configured |
| **Release** | 🚧 pre-release | `v0.0.0`, `private`, no published package, no CHANGELOG |
| **Docs** | ✅ living | Storybook is the source of truth — `Overview/Introduction` homepage + autodocs on every component |

### Component inventory

| Layer | Count | Components |
| --- | --- | --- |
| **Atoms** | 8 | Button · Card · Input · Typography (Heading / Paragraph / Text) · Badge · Checkbox · Radio · Toggle · Tags |
| **Molecules** | 5 | FormField · RadioGroup · CheckboxGroup · ButtonGroup · CardSection |
| **Organisms** | 0 | planned (Phase 4) |

### Known gaps / tech debt

- **Standalone `*.test.tsx` files are not executed.** The Vitest config defines a
  single `storybook` project scoped to `*.stories.*` / `*.mdx`, and there is no
  `test` npm script. The per-component `*.test.tsx` stubs are vestigial — real
  coverage lives in the story smoke tests. Add a second Vitest project (or a
  `test` script) if unit tests are wanted.
- **Working tree mid-migration.** Components are being moved from flat files
  (`atoms/Badge.tsx`) into folders (`atoms/Badge/`); several folders are still
  untracked. Commit the reorg before building on top of it.
- **a11y is advisory, not enforced.** Flip `a11y.test` to `'error'` in
  `.storybook/preview.tsx` now that both themes are AAA-clean, to gate CI.
- **Chromatic baselines need re-approval** — the theme refactor changed the
  default ground (pink → *manual paper*), added a per-story surface wrapper, and
  re-tuned the `*Strong` colours for AAA on paper.
- **`design-tokens.json` is stale.** It still lists the v3 (AA-only) palette;
  `src/tokens/index.ts` + `src/styles/theme.css` are now the source of truth.
- **`colors.dark` has no dedicated stories** — dark mode is exercised via the
  Storybook Theme toggle rather than fixed dark stories.

---

## Getting started

**Requirements:** Node.js `20.19+` or `22.12+` (Storybook 10).

```bash
npm install
npm run storybook      # dev — http://localhost:6006
```

| Script | What it does |
| --- | --- |
| `npm run storybook` | Storybook dev server (component workbench + docs) |
| `npm run build-storybook` | static Storybook build → `storybook-static/` |
| `npm run dev` | Vite playground app (`src/main.tsx`) |
| `npm run build` | type-check + library build → `dist/` |
| `npm run lint` | ESLint over the repo |
| `npx vitest run` | run the story smoke + a11y test suite |
| `npm run chromatic` | push a visual-regression build to Chromatic |

---

## Design foundations

| Token group | Source of truth | Highlights |
| --- | --- | --- |
| **Colour** | `src/tokens/index.ts` + `src/styles/theme.css` | light + dark `--pk-*` custom properties; decorative tints for fills only; every text pairing uses a `*Strong` / `*Text` token verified ≥7:1 (AAA) in both themes |
| **Type** | `src/styles/fonts.ts` (self-hosted `@fontsource`) | `Press Start 2P` (display / H1), `VT323` (UI / labels — single 400 weight), `Nunito` (body) |
| **Spacing** | `spacing` token | 4 · 8 · 16 · 24 · 32 px hard grid |
| **Radius** | `radii` token | `0px` everywhere — pixel art has no rounded corners |
| **Motion** | `transitions` token | 150–300 ms; all looping effects disabled under `prefers-reduced-motion` |

### Accessibility commitments (WCAG 2.2)

- **SC 1.4.6 Contrast (AAA)** — body text ≥ 7:1, large text ≥ 4.5:1; checked in the
  a11y panel via `color-contrast-enhanced`.
- **SC 2.4.7 / 2.4.11 Focus Visible / Not Obscured** — 3px solid ring, 2px offset.
- **SC 2.5.8 Target Size** — interactive controls ≥ 44×44px (spec minimum is 24px).
- **SC 2.2.2 Pause, Stop, Hide** — `prefers-reduced-motion` disables pixel-float,
  pulse, blink and the CRT scanline overlay.
- **SC 1.4.11 Non-text Contrast** — borders, switch tracks and focus rings ≥ 3:1.

---

## Project structure

```
.storybook/         Storybook config — retro AAA manager theme, a11y, light/dark toggle
src/
  components/
    atoms/          Button, Card, Input, Typography, Badge, Checkbox, Radio, Toggle, Tags
    molecules/      FormField, RadioGroup, CheckboxGroup, ButtonGroup, CardSection
    organisms/      (planned)
  stories/
    Overview.mdx    design-system homepage
  styles/
    theme.css       --pk-* colour tokens (light + dark) + a11y baseline
    fonts.ts        self-hosted @fontsource webfonts
  tokens/           colour + type + spacing tokens, and the `theme` var accessor
design-tokens.json  stale v3 export — superseded by src/tokens + src/styles/theme.css
```

Each component folder is `Component.tsx` + `Component.stories.tsx` + `index.ts`
(+ an optional `Component.test.tsx`).

---

## License

BSD 2-Clause © 2026 Paola Anaya
