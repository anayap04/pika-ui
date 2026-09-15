# Pika UI

**A retro arcade design system — 8-bit looks, WCAG 2.2 AAA manners.**

[![CI](https://github.com/anayap04/pika-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/anayap04/pika-ui/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/badge/coverage-%E2%89%A585%25-brightgreen)
[![SonarCloud Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=anayap04_pika-ui&metric=alert_status)](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=anayap04_pika-ui&metric=sqale_rating)](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=anayap04_pika-ui&metric=reliability_rating)](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)
[![Security](https://sonarcloud.io/api/project_badges/measure?project=anayap04_pika-ui&metric=security_rating)](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=anayap04_pika-ui&metric=code_smells)](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)

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
| **Tests** | ✅ passing | **unit tests** (Vitest 4 + jsdom + Testing Library) for every atom, molecule, organism and token module, **`@sa11y/vitest` `toBeAccessible` axe checks** on every component, plus story smoke / a11y tests via `@storybook/addon-vitest` in a real browser (Playwright Chromium) |
| **Accessibility** | 🎯 AAA, both themes | **CI-blocking** `@sa11y/vitest` axe checks (WCAG 2.1 A/AA base ruleset) on every component in the unit suite — roles, names, label associations, ARIA. Plus `@storybook/addon-a11y` per-story with the full WCAG 2.2 rule set **and** axe `color-contrast-enhanced` (AAA 7:1); every text pairing verified ≥7:1 in light **and** dark (jsdom has no layout, so contrast is checked in the browser project, not the sa11y unit tests) |
| **Theming** | ✅ light + dark | `src/tokens/colors.css` drives `--pk-*` custom properties; components read them via `theme` in `src/tokens`. Switches on `[data-theme]`, `.dark`, or `prefers-color-scheme`. Storybook has a **Theme** toolbar toggle |
| **Visual regression** | ✅ wired | Chromatic project configured (`npm run chromatic`) |
| **Coverage** | ✅ 100% · 85% gate | `@vitest/coverage-v8` over `src/components`, `src/tokens`, `src/utils`; **CI fails below 85%** (statements / branches / functions / lines). Run `npm run test:coverage` |
| **CI** | ✅ GitHub Actions | `.github/workflows/ci.yml` runs lint → types → unit tests + coverage → build, plus a Storybook browser-test job, on every push to `main` and PR |
| **SonarCloud** | ✅ Quality Gate passing | [Project dashboard](https://sonarcloud.io/project/overview?id=anayap04_pika-ui) — 0 bugs, 0 vulnerabilities, 0 security hotspots, 4 code smells, 5.7% duplicated lines (526 lines / 20 blocks), reliability **A**, security **A**, security review **A**, maintainability **A**. 7,986 lines of analyzed code across 115 files |
| **Release** | ✅ v0.1.2 | Published to NPM as `@anayap10/pika-ui`; see [releases](https://github.com/anayap04/pika-ui/releases) |
| **Docs** | ✅ living | Storybook is the source of truth — `Overview/Introduction` homepage + autodocs on every component |

### Component inventory

| Layer | Count | Components |
| --- | --- | --- |
| **Atoms** | 8 | Button · Card · Input · Typography (Heading / Paragraph / Text) · Badge · Checkbox · Radio · Toggle · Tags |
| **Molecules** | 5 | FormField · RadioGroup · CheckboxGroup · ButtonGroup · CardSection |
| **Organisms** | 6 | EventHero · CountdownPanel · VotePanel · ResultsPanel · ConfirmationPanel · QRBlock |

### Known gaps / tech debt

- **QRBlock renders a placeholder pattern**, not a scannable code. A real code
  needs a runtime dependency (`qrcode.react` or equivalent) — this library's
  first — which is flagged for the maintainer rather than added silently.
- **VotesList and LockedLevelCard** exist on the live Invitation/Reveal screens
  but are not yet specified as organisms; both need a decision on avatars,
  since the system has no avatar atom and no icon set.
- **4 open SonarCloud code smells, 5.7% duplicated lines** — see the
  [SonarCloud dashboard](https://sonarcloud.io/project/overview?id=anayap04_pika-ui)
  for the current list.

---

## Getting started

**Requirements:** Node.js `22.12+` (Storybook 10).

### From NPM (as a consumer)

```bash
npm install @anayap10/pika-ui
```

### Local development (contributing to Pika UI)

```bash
git clone https://github.com/anayap04/pika-ui.git
cd pika-ui
npm install
npm run storybook      # dev — http://localhost:6006
```

| Script | What it does |
| --- | --- |
| `npm run storybook` | Storybook dev server (component workbench + docs) |
| `npm run build-storybook` | static Storybook build → `storybook-static/` |
| `npm run build` | type-check + library build (ESM + CommonJS) → `dist/` |
| `npm run lint` | ESLint over the repo |
| `npm run typecheck` | `tsc -b` project-reference type-check |
| `npm test` | run the unit test suite (Vitest `unit` project, jsdom) |
| `npm run test:watch` | unit tests in watch mode |
| `npm run test:coverage` | unit tests + v8 coverage report (fails under 85%) |
| `npm run test:a11y` | just the `@sa11y/vitest` accessibility matrix ([src/test/a11y.test.tsx](src/test/a11y.test.tsx)) |
| `npm run test:storybook` | story smoke + a11y suite in a real browser (needs Playwright) |
| `npm run test:all` | both Vitest projects (`unit` + `storybook`) |
| `npm run chromatic` | push a visual-regression build to Chromatic |
| `npm publish` | publish to NPM (CI automation via GitHub Actions on version tags) |

---

## Testing

Two Vitest **projects** run from one config ([vite.config.ts](vite.config.ts)):

| Project | Environment | Scope | Command |
| --- | --- | --- | --- |
| `unit` | jsdom + `@testing-library/react` | `src/**/*.test.{ts,tsx}` — behaviour, props, variants, a11y wiring | `npm test` |
| `storybook` | Playwright Chromium | every `*.stories.tsx` — render smoke + `@storybook/addon-a11y` | `npm run test:storybook` |

### Accessibility (`@sa11y/vitest`)

[src/test/setup.ts](src/test/setup.ts) calls `setup()` from
[`@sa11y/vitest`](https://www.npmjs.com/package/@sa11y/vitest), which registers the
async `toBeAccessible` matcher (axe-core, WCAG 2.1 A/AA base ruleset).
[src/test/a11y.test.tsx](src/test/a11y.test.tsx) renders every atom, molecule and organism in
representative configurations and asserts:

```tsx
render(<Toggle label="Dark mode" />);
await expect(document.body).toBeAccessible();
```

These run inside the `unit` project, so **CI fails on a structural a11y regression**
(missing label, bad role, broken ARIA). jsdom has no layout engine, so
colour-contrast rules do not run here — AAA contrast stays covered by
`@storybook/addon-a11y` (`color-contrast-enhanced`) in the browser project.
The matcher's type is declared in [src/test/sa11y.d.ts](src/test/sa11y.d.ts).

### Coverage

Measured over the `unit` project only (`src/components`, `src/tokens`,
`src/utils`), reported as `text` / `html` / `lcov` into `coverage/`, and gated at
**85%** for statements, branches, functions and lines. Barrel `index.ts` files and
the deprecated `components/{Button,Card,Input}.tsx` shims are excluded.

```bash
npm run test:coverage        # -> coverage/index.html
```

CI runs the same gate — see [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## Design foundations

| Token group | Source of truth | Highlights |
| --- | --- | --- |
| **Colour** | `src/tokens/index.ts` + `src/tokens/colors.css` | light + dark `--pk-*` custom properties; decorative tints for fills only; every text pairing uses a `*Strong` / `*Text` token verified ≥7:1 (AAA) in both themes |
| **Effects** | `shadows` token + `src/tokens/effects.css` | pixel depth is stacked hard offsets of `--pk-border` (`--pk-shadow-pixel` / `-elevated`) — never a blur; `.crt-effect` scanline overlay is opt-in and off under `prefers-reduced-motion` |
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
.github/
  workflows/
    ci.yml          Lint, type-check, unit tests, coverage gate, build on every push/PR
    publish.yml     Test → Build → Publish to NPM on version tags
.storybook/         Storybook config — retro AAA manager theme, a11y, light/dark toggle
src/
  components/
    atoms/          Button, Card, Input, Typography, Badge, Checkbox, Radio, Toggle, Tags
    molecules/      FormField, RadioGroup, CheckboxGroup, ButtonGroup, CardSection
    organisms/      EventHero, CountdownPanel, VotePanel, ResultsPanel, ConfirmationPanel, QRBlock
  stories/
    Overview.mdx    design-system homepage
  styles/
    fonts.ts        self-hosted @fontsource webfonts
  tokens/
    index.css       the one stylesheet to link — @imports the partials below
    colors.css      --pk-* colour tokens (light + dark, OS-follow + opt-in)
    typography.css spacing.css motion.css effects.css   value tokens
    base.css        global baseline + the a11y rules that need real CSS
    fonts.css       Google-Fonts CDN fallback (not imported by index.css)
    index.ts        the JS mirror of the tokens + the `theme` var accessor
  test/
    setup.ts        jest-dom + `@sa11y/vitest` matchers, Testing Library cleanup (`unit` project)
    a11y.test.tsx   `toBeAccessible` axe checks for every component
    sa11y.d.ts      `toBeAccessible` matcher type augmentation
.nvmrc              Node version lock (22.12.0)
design-tokens.json  stale v3 export — superseded by src/tokens/
```

Each component folder is `Component.tsx` + `Component.stories.tsx` +
`Component.test.tsx` + `index.ts`.

---

## License

BSD 2-Clause © 2026 Paola Anaya
