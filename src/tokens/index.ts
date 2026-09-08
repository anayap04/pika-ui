// Design tokens aligned with design-tokens.json
// Light theme is the default; dark theme activates on `[data-theme="dark"]`,
// `.dark`, or `prefers-color-scheme: dark` (see src/styles/theme.css).
//
// Text/background pairings target WCAG 2.2 AAA (SC 1.4.6): 7:1 for body-size
// text, 4.5:1 for large text — in BOTH themes. The `*Strong` colours are the
// only ones that may carry text; each clears 7:1 as text on its theme's grounds
// AND as a fill under its `*Foreground`. The `*` decorative tints are for
// fills/art ONLY, never text.
//
// Components read colour through `theme` (below), not `colors.light` directly —
// that keeps them following the active theme via CSS custom properties.

export const colors = {
  light: {
    background: '#faf3e3',          // "Manual paper" — AAA ground (brand pink #e8b4d9 is
                                    // decorative-only: foreground on it is 5:1, fails AAA)
    foreground: '#6b2d8f',          // Body/heading ink — 8.8:1 white, 7.9:1 paper (AAA)
    card: '#ffffff',
    cardForeground: '#6b2d8f',
    primary: '#fc5c94',             // Decorative only (2.9:1) — do not use for text
    primaryStrong: '#87214b',       // Text + fill — 8.9:1 white, 8.1:1 paper, 8.9:1 under white (AAA)
    primaryForeground: '#ffffff',
    secondary: '#5c94fc',           // Decorative only (3.0:1) — do not use for text
    secondaryStrong: '#164499',     // Text + fill — 9.1:1 white, 8.2:1 paper, 9.1:1 under white (AAA)
    secondaryForeground: '#ffffff',
    accent: '#ffd700',              // Decorative only (1.4:1) — do not use for text
    accentStrong: '#ffd700',
    accentForeground: '#3d1a52',    // Text ON the gold fill — 10.2:1 on gold (AAA)
    accentText: '#3d1a52',          // "accent" as standalone text on the page — 12.9:1 paper (AAA)
    destructive: '#ff0044',         // Decorative only (3.9:1) — do not use for text
    destructiveStrong: '#99002a',   // Text + fill — 8.8:1 white, 8.0:1 paper, 8.8:1 under white (AAA)
    destructiveForeground: '#ffffff',
    muted: '#f5f5f5',
    mutedForeground: '#4d4d4d',     // 8.5:1 white, 7.7:1 paper, 7.8:1 on muted fill (AAA)
    border: '#000000',
    input: '#6b2d8f',
    inputBackground: '#ffffff',
    switchBackground: '#787878',    // Non-text: 4.4:1 vs white, 4.0:1 vs paper (SC 1.4.11, 3:1)
    ring: '#6b2d8f',
  },
  dark: {
    background: '#1a0b2e',
    foreground: '#f5d1ea',
    card: '#2d1b4e',
    cardForeground: '#f5d1ea',
    primary: '#ff6fa8',            // Decorative only
    primaryStrong: '#ff99c4',      // Text + fill — 9.4:1 bg, 7.7:1 card, 9.4:1 under dark text (AAA)
    primaryForeground: '#1a0b2e',
    secondary: '#6fb1ff',          // Decorative only
    secondaryStrong: '#8cc0ff',    // Text + fill — 9.8:1 bg, 8.1:1 card, 9.8:1 under dark text (AAA)
    secondaryForeground: '#1a0b2e',
    accent: '#ffe14d',
    accentStrong: '#ffe14d',
    accentForeground: '#1a0b2e',   // Text ON the gold fill — 14.3:1 on gold (AAA)
    accentText: '#ffe14d',         // "accent" as standalone text on the dark page — 14.3:1 bg (AAA)
    destructive: '#ff4d6d',        // Decorative only
    destructiveStrong: '#ff9aa8',  // Text + fill — 9.2:1 bg, 7.6:1 card, 9.2:1 under dark text (AAA)
    destructiveForeground: '#1a0b2e',
    muted: '#241540',
    mutedForeground: '#c4aed9',     // 9.2:1 bg, 7.6:1 card, 8.3:1 muted (AAA)
    border: '#ffe14d',              // Neon gold vs deep purple — 14.3:1 (non-text)
    input: '#f5d1ea',
    inputBackground: '#2d1b4e',
    switchBackground: '#9a86bf',    // Non-text: 4.7:1 vs card (SC 1.4.11, 3:1)
    ring: '#ff99c4',
  },
};

/**
 * Runtime colour accessor. Every value is a `var(--pk-*)` reference with the
 * light hex baked in as the fallback, so a component that writes
 * `color: theme.foreground` renders correctly with zero JS and then follows
 * `[data-theme="dark"]` when the stylesheet is present. Same string shape as
 * `colors.light[key]`, so it's a drop-in replacement.
 */
const cssVar = (key: string) => `--pk-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

export const theme = Object.fromEntries(
  (Object.keys(colors.light) as (keyof typeof colors.light)[]).map((key) => [
    key,
    `var(${cssVar(key)}, ${colors.light[key]})`,
  ]),
) as Record<keyof typeof colors.light, string>;

/** The `--pk-*` custom-property name for a colour token (used by theme.css authors/tests). */
export const colorVarName = cssVar;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const radii = {
  sm: '0px',     // Pixel art: sharp corners
  md: '0px',
  lg: '0px',
  xl: '0px',
};

export const fontSizes = {
  sm: '12px',
  md: '14px',    // Base from design-tokens.json
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
};

export const fontFamilies = {
  display: "'Press Start 2P', 'VT323', monospace",           // H1, hero, buttons, big CTAs
  subheading: "'VT323', 'Press Start 2P', monospace",        // H2-H4, labels, captions
  body: "'Nunito', system-ui, -apple-system, sans-serif",    // Paragraphs, inputs, body text
};

export const fontWeights = {
  normal: 400,
  medium: 700,   // Only Nunito (body) supports real weights
  bold: 800,
};

export const lineHeights = {
  heading: 1.4,
  body: 1.6,
};

export const accessibility = {
  focusRingWidth: '3px',
  focusRingOffset: '2px',
  tapTargetMin: '44px',             // WCAG 2.2 SC 2.5.8 (practical minimum, spec requires 24px)
};

export const transitions = {
  fast: '150ms ease-out',
  base: '200ms ease-out',
  slow: '300ms ease-out',
};

// Helper: Get color from theme (use in components with useTheme or CSS var fallback)
export const getColorVar = (colorKey: keyof typeof colors.light, isDark = false) => {
  return isDark ? colors.dark[colorKey] : colors.light[colorKey];
};
