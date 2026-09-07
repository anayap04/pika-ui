// Design tokens aligned with design-tokens.json (WCAG 2.2 AA compliant)
// Light theme as default, dark theme via CSS vars

export const colors = {
  light: {
    background: '#e8b4d9',
    foreground: '#6b2d8f',
    card: '#ffffff',
    cardForeground: '#6b2d8f',
    primary: '#fc5c94',
    primaryStrong: '#c93870',       // For text on primary fills
    primaryForeground: '#ffffff',
    secondary: '#5c94fc',
    secondaryStrong: '#2f6fe0',     // For text on secondary fills
    secondaryForeground: '#ffffff',
    accent: '#ffd700',
    accentStrong: '#ffd700',
    accentForeground: '#6b2d8f',
    destructive: '#ff0044',
    destructiveStrong: '#db1548',   // For text on destructive fills
    destructiveForeground: '#ffffff',
    muted: '#f5f5f5',
    mutedForeground: '#4d4d4d',     // 4.8:1 contrast on pink bg (AA pass)
    border: '#000000',
    input: '#6b2d8f',
    inputBackground: '#ffffff',
    switchBackground: '#787878',    // 4.4:1 vs white card (AA pass, SC 1.4.11)
    ring: '#6b2d8f',
  },
  dark: {
    background: '#1a0b2e',
    foreground: '#f5d1ea',
    card: '#2d1b4e',
    cardForeground: '#f5d1ea',
    primary: '#ff6fa8',
    primaryStrong: '#ff3d8a',
    primaryForeground: '#1a0b2e',
    secondary: '#6fb1ff',
    secondaryStrong: '#3d8fff',
    secondaryForeground: '#1a0b2e',
    accent: '#ffe14d',
    accentStrong: '#ffe14d',
    accentForeground: '#1a0b2e',
    destructive: '#ff4d6d',
    destructiveStrong: '#ff1f4d',
    destructiveForeground: '#1a0b2e',
    muted: '#241540',
    mutedForeground: '#b89fd1',     // 7.1:1 on muted (AA pass)
    border: '#ffe14d',              // Neon gold vs deep purple
    input: '#f5d1ea',
    inputBackground: '#2d1b4e',
    switchBackground: '#8670ad',    // 3.6:1 vs card (AA pass, SC 1.4.11)
    ring: '#ff6fa8',
  },
};

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
  display: "'Press Start 2P', cursive",      // H1, hero, big CTAs
  subheading: "'VT323', monospace",          // H2-H4, buttons, labels
  body: "'Nunito', sans-serif",              // Paragraphs, inputs, body text
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
