import type { StorybookConfig } from '@storybook/react-vite';

/**
 * Retro lettering for the Storybook manager UI only (sidebar + toolbars).
 * The manager runs in its own bundle and can't see the self-hosted @fontsource
 * copies, so it pulls the three faces from Google Fonts. The preview / docs
 * pages and the browser test-runner keep using the self-hosted copies
 * (src/styles/fonts.ts, imported in preview.tsx) — no network dependency there.
 */
const managerFonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
`;

/**
 * Manager (sidebar + toolbar) polish. Every text pairing below is checked
 * against WCAG 2.2 SC 1.4.6 (AAA, 7:1) and SC 2.4.7 / 2.4.11 (focus visible).
 */
const managerStyles = `
  <style>
    /* Retro brand wordmark */
    .sidebar-header a[title] > div,
    .sidebar-header a[href] span {
      font-family: 'Press Start 2P', monospace !important;
      font-size: 11px !important;
      line-height: 1.7 !important;
      letter-spacing: 0.02em;
    }

    /* Section / component labels — CRT terminal face */
    .sidebar-subheading,
    [data-nodetype="group"] > a,
    [data-nodetype="root"] > button {
      font-family: 'VT323', monospace !important;
      font-size: 16px !important;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* Story rows: a touch larger for comfortable reading */
    .sidebar-item,
    [data-nodetype="story"] a,
    [data-nodetype="document"] a {
      font-size: 14px !important;
      line-height: 1.6 !important;
    }

    /* Selected story — solid arcade fill, white label = 11.4:1 (AAA) */
    .sidebar-item[data-selected="true"],
    [data-selected="true"] {
      background: #5a1878 !important;
      color: #ffffff !important;
      box-shadow: inset 4px 0 0 0 #241026 !important;
      border-radius: 0 !important;
    }
    .sidebar-item[data-selected="true"] svg { color: #ffffff !important; }

    /* Visible focus indicator on every interactive element */
    #storybook-explorer-menu a:focus-visible,
    #storybook-explorer-menu button:focus-visible,
    .sidebar-container button:focus-visible,
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    [tabindex]:focus-visible {
      outline: 3px solid #5a1878 !important;
      outline-offset: 2px !important;
      border-radius: 0 !important;
    }

    /* Hard pixel edges on the search field */
    .search-field input,
    [placeholder*="Find"] {
      border-radius: 0 !important;
      border: 2px solid #241026 !important;
    }
  </style>
`;

/**
 * Preview + docs pages. Keeps long-form docs copy at AAA contrast and gives
 * MDX headings the retro lettering without touching component stories.
 */
const previewStyles = `
  <style>
    .sbdocs.sbdocs-wrapper {
      background: #faf3e3;
      color: #241026;               /* 15.1:1 on cream (AAA) */
    }
    .sbdocs.sbdocs-content {
      max-width: 900px;
      font-size: 16px;
      line-height: 1.65;
    }
    .sbdocs h1, .sbdocs h2 {
      font-family: 'Press Start 2P', monospace;
      line-height: 1.5;
      color: #241026;
    }
    .sbdocs h3, .sbdocs h4 {
      font-family: 'VT323', monospace;
      font-size: 1.6rem;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #241026;
    }
    .sbdocs a { color: #5a1878; text-decoration: underline; }  /* 9.9:1 (AAA) */
    .sbdocs p, .sbdocs li { color: #241026; }
    .sbdocs .sbdocs-preview,
    .sbdocs div[class*="docblock-"] {
      border-radius: 0 !important;
      border-color: #241026 !important;
    }
    .sb-show-main :focus-visible {
      outline: 3px solid #5a1878 !important;
      outline-offset: 2px !important;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
  </style>
`;

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  managerHead: (head) => `${head}${managerFonts}${managerStyles}`,
  previewHead: (head) => `${head}${previewStyles}`,
};

export default config;
