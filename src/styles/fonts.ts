// Self-hosted webfonts for the Pika UI pixel design system.
// Bundled via @fontsource so Storybook, Chromatic and the browser test
// runner never depend on a network request to Google Fonts.
//
//  Press Start 2P  — display: headings, hero copy and buttons (arcade pixel face)
//  VT323           — subheadings, form labels and captions (readable pixel/terminal face)
//  Nunito          — body copy and input text (kept legible for long-form reading)
//
// Only the latin subsets are pulled in to keep the bundle small.
import '@fontsource/press-start-2p/latin-400.css';
import '@fontsource/press-start-2p/latin-ext-400.css';

import '@fontsource/vt323/latin-400.css';
import '@fontsource/vt323/latin-ext-400.css';

import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/nunito/latin-ext-400.css';
