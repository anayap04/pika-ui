import { create } from 'storybook/theming';

/**
 * Pika UI — retro arcade Storybook theme (manager chrome + docs pages).
 *
 * Look & feel: 8-bit cabinet art — cream "manual paper" ground, hard plum
 * borders, zero radius, Press Start 2P / VT323 lettering (loaded in main.ts
 * via managerHead / previewHead).
 *
 * Accessibility (WCAG 2.2, targeting AAA / SC 1.4.6 — 7:1 body text):
 *   ink   #241026 on paper  #faf3e3 → 15.1:1  (AAA)
 *   ink   #241026 on white  #ffffff → 16.9:1  (AAA)
 *   link  #5a1878 on white  #ffffff → 11.4:1  (AAA)
 *   link  #5a1878 on paper  #faf3e3 →  9.9:1  (AAA)
 *   sel   #ffffff on plum   #5a1878 → 11.4:1  (AAA)
 *   muted #4a2a54 on paper  #faf3e3 →  8.4:1  (AAA)
 * Non-text UI (borders, focus ring) clears SC 1.4.11 (3:1) comfortably.
 */

const ink = '#241026';      // near-black plum — all body / bar text
const paper = '#faf3e3';    // arcade manual cream — app + preview ground
const white = '#ffffff';    // content / input ground
const plum = '#5a1878';     // links, selected state, focus ring
const magenta = '#a8175c';  // primary brand accent — 7.0:1 on white

const pikaTheme = create({
  base: 'light',

  brandTitle: 'PIKA UI · retro design system',
  brandTarget: '_self',

  fontBase: '"Nunito", system-ui, -apple-system, sans-serif',
  fontCode: '"VT323", "Courier New", monospace',

  colorPrimary: magenta,
  colorSecondary: plum,

  // Surfaces
  appBg: paper,
  appContentBg: white,
  appPreviewBg: paper,
  appBorderColor: ink,
  appBorderRadius: 0,

  // Text — dark plum ink everywhere for AAA contrast on paper and white
  textColor: ink,
  textInverseColor: white,
  textMutedColor: '#4a2a54',

  // Toolbars / sidebar bars
  barTextColor: ink,
  barSelectedColor: plum,
  barHoverColor: plum,
  barBg: paper,

  // Inputs
  inputBg: white,
  inputBorder: ink,
  inputTextColor: ink,
  inputBorderRadius: 0,
});

export default pikaTheme;
